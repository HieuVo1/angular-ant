import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleListComponent } from './pages/role-list/role-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IconsProviderModule } from '../main/icons-provider.module';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { RouterModule } from '@angular/router';
import { routes } from './authorization.routing';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { RoleModalComponent } from './pages/role-modal/role-modal.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { PermissionModalComponent } from './pages/permission-modal/permission-modal.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserModalComponent } from './pages/user-modal/user-modal.component';
import { PermissionListComponent } from './pages/permission-list/permission-list.component';
import { PermissionObjectListComponent } from './pages/permission-object-list/permission-object-list.component';

@NgModule({
  declarations: [
    RoleListComponent,
    RoleModalComponent,
    PermissionModalComponent,
    UserListComponent,
    UserModalComponent,
    PermissionListComponent,
    PermissionObjectListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzCheckboxModule,
    NzDropDownModule,
    NzButtonModule,
    IconsProviderModule,
    NzMessageModule,
    NzSelectModule,
    NzFormModule,
    ReactiveFormsModule,
    NzSpinModule,
    NzInputModule,
    NzPopconfirmModule,
    NzModalModule,
    NzDividerModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthorizationModule { }
