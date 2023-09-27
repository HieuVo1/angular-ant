import { Routes } from "@angular/router";
import { DistributorListComponent } from "./pages/distributor-list/distributor-list.component";
import { DistributorCardComponent } from "./pages/distributor-card/distributor-card.component";

export const routes: Routes = [
  {
    path: '',
    component: DistributorListComponent
  },
  {
    path: 'card',
    data: {
      breadcrumb: 'Add Distributor',
    },
    component: DistributorCardComponent
  }
]
