import { Routes } from "@angular/router";
import { NgxPermissionsGuard } from "ngx-permissions";
import { MainLayoutComponent } from "src/app/layouts/main-layout/main-layout.component";
import { Buttons, Pages } from "src/permissions/permission-schema";
const permissionSchema = {
  all: Pages.All,
  distributor: Buttons.Read + Pages.Distributor,
  item: Buttons.Read + Pages.Item,
}
export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'item',
        data: {
          breadcrumb: 'Item',
          permissions: {
            only: [permissionSchema.all, permissionSchema.item],
            redirectTo: 'auth/unauthorized'
          }
        },
        canLoad: [NgxPermissionsGuard],
        loadChildren: () =>
          import('../item/item.module').then((m) => m.ItemModule),
      },
      {
        path: 'distributor',
        data: {
          breadcrumb: 'Distributor',
          permissions: {
            only: [permissionSchema.all, permissionSchema.distributor],
            redirectTo: 'auth/unauthorized'
          }
        },
        canLoad: [NgxPermissionsGuard],
        loadChildren: () =>
          import('../distributor/distributor.module').then((m) => m.DistributorModule),
      },
      {
        path: 'authorization',
        data: {
          permissions: {
            only: [permissionSchema.all],
            redirectTo: 'auth/unauthorized'
          }
        },
        canLoad: [NgxPermissionsGuard],
        loadChildren: () =>
          import('../authorization/authorization.module').then((m) => m.AuthorizationModule),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('../user/user.module').then((m) => m.UserModule),
      }
    ]

  }
]
