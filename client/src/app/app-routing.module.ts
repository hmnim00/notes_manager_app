import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminBoardsComponent } from './components/admin/admin-boards/admin-boards.component';
import { AdminNotesComponent } from './components/admin/admin-notes/admin-notes.component';
import { AdminSigninComponent } from './components/admin/admin-signin/admin-signin.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { UserFormComponent } from './components/admin/user-form/user-form.component';
import { BoardsComponent } from './components/boards/boards.component';
import { HomeComponent } from './components/home/home.component';
import { BoardFormComponent } from './components/users/board-form/board-form.component';
import { BoardComponent } from './components/users/board/board.component';
import { NoteFormComponent } from './components/users/note-form/note-form.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { SigninComponent } from './components/users/signin/signin.component';
import { SignupComponent } from './components/users/signup/signup.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  // users
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'boards', component: BoardsComponent },
  { path: 'board/:slug', component: BoardComponent },
  { path: 'new-board', component: BoardFormComponent },
  { path: 'edit-board/:id', component: BoardFormComponent },
  { path: 'new-note', component: NoteFormComponent },
  { path: 'edit-note/:id', component: NoteFormComponent },
  // admin
  { path: 'admin', component: AdminSigninComponent },
  { path: 'admin/dashboard', component: DashboardComponent },
  { path: 'admin/boards', component: AdminBoardsComponent },
  { path: 'admin/users', component: AdminUsersComponent },
  { path: 'admin/notes', component: AdminNotesComponent },
  { path: 'admin/edit-user/:id', component: UserFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
