import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachmentListComponent } from './pages/attachment-list/attachment-list.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IconsProviderModule } from '../main/icons-provider.module';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';



@NgModule({
  declarations: [
    AttachmentListComponent
  ],
  imports: [
    CommonModule,
    NzModalModule,
    NzTableModule,
    NzUploadModule,
    NzButtonModule,
    NzPopconfirmModule,
    IconsProviderModule
  ],
  exports: [
    AttachmentListComponent
  ]
})
export class AttachmentModule { }
