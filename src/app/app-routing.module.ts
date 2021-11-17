import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { AuthGuard } from "./guards/auth.guard";
import { TodosListComponent } from "./pages/todos-list/todos-list.component";
import { CreateTodoComponent } from "./pages/create-todo/create-todo.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'user',
    component: UserDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'todos',
    component: TodosListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'todo/:id',
    component: TodosListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create',
    component: CreateTodoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'page-not-found',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
