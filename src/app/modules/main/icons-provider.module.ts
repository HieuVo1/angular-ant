import { NgModule } from '@angular/core';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';

import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  FormOutline,
  DashboardOutline,
  BellOutline,
  InfoCircleOutline,
  BgColorsOutline,
  OrderedListOutline,
  ExpandAltOutline,
  SlackOutline,
  GiftOutline,
  FormatPainterOutline,
  ShoppingCartOutline,
  ShopOutline,
  ExclamationCircleOutline,
  BarChartOutline,
  MessageOutline,
  SendOutline,
  CloseOutline,
  FileTextOutline
} from '@ant-design/icons-angular/icons';

const icons = [MenuFoldOutline,
  MenuUnfoldOutline,
  DashboardOutline,
  FormOutline,
  BellOutline,
  InfoCircleOutline,
  BgColorsOutline,
  OrderedListOutline,
  ExpandAltOutline,
  SlackOutline,
  FormatPainterOutline,
  GiftOutline,
  ShoppingCartOutline,
  ShopOutline,
  ExclamationCircleOutline,
  BarChartOutline,
  MessageOutline,
  SendOutline,
  CloseOutline,
  FileTextOutline];

@NgModule({
  imports: [NzIconModule],
  exports: [NzIconModule],
  providers: [
    { provide: NZ_ICONS, useValue: icons }
  ]
})
export class IconsProviderModule {
}
