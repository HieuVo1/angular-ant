import { read } from 'xlsx';
import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { PermissionPage } from 'src/app/core/models/permission-page';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { TokenService } from 'src/app/core/services/token/token.service';
import { Notify } from 'src/app/modules/main/models/notify';
import { environment } from 'src/environments/environment';
import { Buttons, Pages } from 'src/permissions/permission-schema';
import { UserService } from 'src/app/modules/authorization/services/user.service';
import { SignalRService } from 'src/app/core/services/signalR/signal-r.service';

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
    private readonly userService: UserService,

  ) { }

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

    this.userImageUrl = this.tokenService.getImageUrl();

    if (this.userImageUrl == '') {
      this.userImageUrl = `${environment.avatarFakeUrl}?name=${this.userName}`
    }

    this.userService.imageUrlEventEmitter$.subscribe((newImageUrl) => {

      if (newImageUrl == '') {
        this.userImageUrl = `${environment.avatarFakeUrl}?name=${this.userName}`
      }
      else {
        this.userImageUrl = newImageUrl;
      }

      var user = this.storageService.getObject(environment.tokenKey);
      user.imageUrl = newImageUrl;
      this.storageService.setObject(environment.tokenKey, user);
    })

  }


  logout() {
    this.storageService.remove(environment.tokenKey);
    this.router.navigate(['/auth/login'])
  }

}
