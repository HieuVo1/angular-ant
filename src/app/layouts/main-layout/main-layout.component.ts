import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { PermissionPage } from 'src/app/core/models/permission-page';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { TokenService } from 'src/app/core/services/token/token.service';
import { Notify } from 'src/app/modules/main/models/notify';
import { environment } from 'src/environments/environment';
import { Buttons, Pages } from 'src/permissions/permission-schema';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit, PermissionPage {
  permissionSchema: any;
  isCollapsed = false;
  userImageUrl!: string;
  userName!: string;

  constructor(
    private readonly router: Router,
    private readonly storageService: StorageService,
    private readonly tokenService: TokenService,
    private readonly permissionService: NgxPermissionsService) { }

  initPermissionSchema(): void {
    this.permissionSchema = {
      all: Pages.All,
      distributor: Buttons.Read + Pages.Distributor,
      item: Buttons.Read + Pages.Item,
    }
  }

  ngOnInit(): void {
    this.userName = this.tokenService.getUserName();
    this.initPermissionSchema();
  }

  logout() {
    this.storageService.remove(environment.tokenKey);
    this.router.navigate(['/auth/login'])
  }

}
