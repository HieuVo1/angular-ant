import { Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { UnauthorizedComponent } from "./pages/unauthorized/unauthorized.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: "full"
  },
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'unauthorized',
        component: UnauthorizedComponent
      }
    ]
  }
]
