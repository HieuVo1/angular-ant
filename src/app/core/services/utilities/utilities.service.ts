import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { TokenService } from '../token/token.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { Observable, of, tap } from 'rxjs';
import { PermissionService } from 'src/app/modules/authorization/services/permission.service';
import { RoleService } from 'src/app/modules/authorization/services/role.service';
import { BaseResponse } from '../../models/base-response';
import { Role } from 'src/app/modules/authorization/models/role';
import { Permission } from 'src/app/modules/authorization/models/permission';
import { ObjectType } from 'src/app/modules/authorization/enums/object-type';
import { PermissionObjectCreate } from 'src/app/modules/authorization/models/permission-object-create';
import { Buttons } from 'src/permissions/permission-schema';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(private readonly httpClient: HttpClient) { }

}

export function jwtOptionsFactory(tokenService: TokenService) {
  return {
    tokenGetter: () => {
      return tokenService.getToken();
    },
    authScheme: "Bearer ",
    allowedDomains: environment.backendDomains,
    disallowedRoutes: [], // not token in header
  }
}

export function initializeAppFactory(tokenService: TokenService, roleService: RoleService, ps: NgxPermissionsService): () => Observable<BaseResponse<Role>> {
  const roleId = tokenService.getRoleId();
  console.log(roleId);

  return () => roleService.getById(roleId)
    .pipe(
      tap(res => {
        if (res.isSuccess) {
          ps.loadPermissions(buildPermissionString(res.data.permissions));
        }
      })
    )
}

export function buildPermissionString(permissionObjs: Permission[]): string[] {
  let permissionStr: string[] = [];

  permissionObjs.map(p => {
    if (p.type == ObjectType.All) {
      if (p.viewPermission) {
        permissionStr.push(p.name);
      }
    }

    if (p.type == ObjectType.Page) {
      if (p.viewPermission) {
        permissionStr.push(Buttons.Read + p.name);
      }
    }

    if (p.type == ObjectType.Button) {
      const parentIndex = permissionObjs.findIndex(pa => pa.permissionObjectId === p.parentPermissionObjId);

      if (parentIndex != -1 && p.viewPermission) {
        permissionStr.push(p.name + permissionObjs[parentIndex].name)
      }
    }
  });

  return permissionStr;
}
