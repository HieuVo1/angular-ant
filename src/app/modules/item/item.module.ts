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
    ScrollingModule,
    NgxPermissionsModule.forChild()
  ]
})
export class ItemModule { }
