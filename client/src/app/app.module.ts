import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { SignupComponent } from './components/users/signup/signup.component';
import { SigninComponent } from './components/users/signin/signin.component';
import { BoardComponent } from './components/users/board/board.component';
import { BoardFormComponent } from './components/users/board-form/board-form.component';
import { NoteFormComponent } from './components/users/note-form/note-form.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminBoardsComponent } from './components/admin/admin-boards/admin-boards.component';
import { AdminNotesComponent } from './components/admin/admin-notes/admin-notes.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { UserFormComponent } from './components/admin/user-form/user-form.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllBoardsComponent } from './components/users/all-boards/all-boards.component';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { NoteEditFormComponent } from './components/users/note-edit-form/note-edit-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProfileComponent,
    SignupComponent,
    SigninComponent,
    BoardComponent,
    BoardFormComponent,
    NoteFormComponent,
    HomeComponent,
    FooterComponent,
    AdminBoardsComponent,
    AdminNotesComponent,
    AdminUsersComponent,
    NavigationComponent,
    UserFormComponent,
    AllBoardsComponent,
    NotFoundComponent,
    NoteEditFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: AdminInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
