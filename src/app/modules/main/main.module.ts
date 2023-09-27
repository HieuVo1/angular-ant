import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './main.routing';
import { MainLayoutComponent } from 'src/app/layouts/main-layout/main-layout.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { HttpClientModule } from '@angular/common/http';
import { IconsProviderModule } from './icons-provider.module';
import { FormsModule } from '@angular/forms';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NotificationComponent } from 'src/app/layouts/notification/notification.component';


@NgModule({
  declarations: [
    MainLayoutComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    FormsModule,
    NzDropDownModule,
    NzBadgeModule,
    NzPopconfirmModule,
    NzButtonModule,
    NzBreadCrumbModule,
    NzPageHeaderModule,
    NgxPermissionsModule.forChild()
  ]
})
export class MainModule { }
