import { Routes } from "@angular/router";
import { ItemListComponent } from "./pages/item-list/item-list.component";
import { ItemCardComponent } from "./pages/item-card/item-card.component";

export const routes: Routes = [
  {
    path: '',
    component: ItemListComponent
  },
  {
    path: 'card',
    data: {
      breadcrumb: 'Add Item',
    },
    component: ItemCardComponent
  }
]
