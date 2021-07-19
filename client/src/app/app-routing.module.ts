import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminBoardsComponent } from './components/admin/admin-boards/admin-boards.component';
import { AdminNotesComponent } from './components/admin/admin-notes/admin-notes.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { UserFormComponent } from './components/admin/user-form/user-form.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AllBoardsComponent } from './components/users/all-boards/all-boards.component';
import { BoardFormComponent } from './components/users/board-form/board-form.component';
import { BoardComponent } from './components/users/board/board.component';
import { NoteEditFormComponent } from './components/users/note-edit-form/note-edit-form.component';
import { NoteFormComponent } from './components/users/note-form/note-form.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { SigninComponent } from './components/users/signin/signin.component';
import { SignupComponent } from './components/users/signup/signup.component';
import { AdminGuard } from './guards/admin.guard';
import { SignGuard } from './guards/sign.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    canActivate: [SignGuard],
  },
  // users
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [SignGuard],
  },
  { path: 'boards', component: AllBoardsComponent, canActivate: [SignGuard] },
  {
    path: 'board/:slug',
    component: BoardComponent,
    canActivate: [SignGuard],
  },
  {
    path: 'new-board',
    component: BoardFormComponent,
    canActivate: [SignGuard],
  },
  {
    path: 'edit-board/:id',
    component: BoardFormComponent,
    canActivate: [SignGuard],
  },
  {
    path: 'new-note/:id',
    component: NoteFormComponent,
    canActivate: [SignGuard],
  },
  {
    path: 'edit-note/:id',
    component: NoteEditFormComponent,
    canActivate: [SignGuard],
  },
  // admin
  {
    path: 'admin/dashboard',
    component: DashboardComponent,
    canActivate: [SignGuard, AdminGuard],
  },
  {
    path: 'admin/boards',
    component: AdminBoardsComponent,
    canActivate: [SignGuard, AdminGuard],
  },
  {
    path: 'admin/users',
    component: AdminUsersComponent,
    canActivate: [SignGuard, AdminGuard],
  },
  {
    path: 'admin/notes',
    component: AdminNotesComponent,
    canActivate: [SignGuard, AdminGuard],
  },
  {
    path: 'admin/edit-user/:id',
    component: UserFormComponent,
    canActivate: [SignGuard, AdminGuard],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
