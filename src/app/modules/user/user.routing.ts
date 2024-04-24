import { Routes } from "@angular/router";
import { ChangePasswordComponent } from "./pages/change-password/change-password.component";
import { ProfileComponent } from "./pages/profile/profile.component";

export const routes: Routes = [
  {
    data: {
      breadcrumb: 'Change Password'
    },
    path: 'change-password',
    component: ChangePasswordComponent
  },
  {
    data: {
      breadcrumb: 'Profile'
    },
    path: 'profile',
    component: ProfileComponent
  }
]
