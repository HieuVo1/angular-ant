import { Routes } from '@angular/router';
import { RoleListComponent } from './pages/role-list/role-list.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { PermissionListComponent } from './pages/permission-list/permission-list.component';
import { PermissionObjectListComponent } from './pages/permission-object-list/permission-object-list.component';
export const routes: Routes = [
  {
    path: 'role',
    data: {
      breadcrumb: 'Role',
    },
    component: RoleListComponent
  },
  {
    path: 'permission/:roleId',
    data: {
      breadcrumb: 'Permission',
    },
    component: PermissionListComponent
  },
  {
    path: 'user',
    data: {
      breadcrumb: 'User',
    },
    component: UserListComponent
  },
  {
    path: 'permission-object',
    data: {
      breadcrumb: 'Permission Object',
    },
    component: PermissionObjectListComponent
  }
]
