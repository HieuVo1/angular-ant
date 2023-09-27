import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from '../../layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RouterModule } from '@angular/router';
import { routes } from './auth.routing';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NgxPermissionsModule } from 'ngx-permissions';
import { RegisterComponent } from './pages/register/register.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { IconsProviderModule } from '../main/icons-provider.module';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { NzResultModule } from 'ng-zorro-antd/result';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UnauthorizedComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    ReactiveFormsModule,
    NzTableModule,
    NzDropDownModule,
    FormsModule,
    NzResultModule,
    IconsProviderModule,
    NgxPermissionsModule.forChild()
  ]
})
export class AuthModule { }
