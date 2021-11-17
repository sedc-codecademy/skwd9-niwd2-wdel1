import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthInterceptor } from "./services/interceptors/auth.interceptor";
import { TodosListComponent } from './pages/todos-list/todos-list.component';
import { SingleTodoComponent } from './pages/single-todo/single-todo.component';
import { CreateTodoComponent } from './pages/create-todo/create-todo.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SkeletonLoaderComponent } from './components/skeleton-loader/skeleton-loader.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NotifierModule } from 'angular-notifier';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UserDetailsComponent,
    NavbarComponent,
    TodosListComponent,
    SingleTodoComponent,
    CreateTodoComponent,
    PageTitleComponent,
    SkeletonLoaderComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    NgxSkeletonLoaderModule,
    MatProgressSpinnerModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'middle'
        }
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
