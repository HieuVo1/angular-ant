import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemListComponent } from './pages/item-list/item-list.component';
import { RouterModule } from '@angular/router';
import { routes } from './item.routing';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsProviderModule } from '../main/icons-provider.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ItemCardComponent } from './pages/item-card/item-card.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzUploadModule } from 'ng-zorro-antd/upload';

@NgModule({
  declarations: [
    ItemListComponent,
    ItemCardComponent
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
    NgxPermissionsModule.forChild()
  ]
})
export class ItemModule { }
