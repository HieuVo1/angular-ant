import { Routes } from "@angular/router";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { adminGuard } from "./core/guards/admin/admin.guard";

export const routes: Routes = [
  {
    path: 'admin',
    data: {
      breadcrumb: 'Home'
    },
    canActivate: [adminGuard],
    loadChildren: () =>
      import('./modules/main/main.module').then((m) => m.MainModule),
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/admin',
  },
  { path: '**', redirectTo: '/auth/login', pathMatch: 'full' }
]
