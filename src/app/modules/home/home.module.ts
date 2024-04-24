import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './home.routing';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { HomeComponent } from './pages/home/home.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    NzStatisticModule,
    NzGridModule,
    NzCardModule,
    NgxChartsModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
