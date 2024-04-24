import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DistributorListComponent } from './pages/distributor-list/distributor-list.component';
import { RouterModule } from '@angular/router';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsProviderModule } from '../main/icons-provider.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NgxPermissionsModule } from 'ngx-permissions';
import { routes } from './distributor.routing';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { DistributorCardComponent } from './pages/distributor-card/distributor-card.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { AttachmentModule } from '../attachment/attachment.module';

@NgModule({
  declarations: [
    DistributorListComponent,
    DistributorCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzTableModule,
    NzDropDownModule,
    FormsModule,
    IconsProviderModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzCheckboxModule,
    NzPopconfirmModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzSpinModule,
    NzGridModule,
    NzMessageModule,
    NzCollapseModule,
    NzUploadModule,
    AttachmentModule,
    NgxPermissionsModule.forChild()
  ]
})
export class DistributorModule { }
