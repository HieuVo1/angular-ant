import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../../models/login-request';
import { Observable, catchError, of, tap } from 'rxjs';
import { BaseResponse } from 'src/app/core/models/base-response';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { TokenData } from '../../models/token-data';
import { TokenService } from 'src/app/core/services/token/token.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { LoginResponse } from '../../models/login-response';
import { buildPermissionString } from 'src/app/core/services/utilities/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private readonly jwtHelperService: JwtHelperService,
    private readonly storageService: StorageService,
    private readonly tokenService: TokenService,
    private permissionService: NgxPermissionsService
  ) { }

  login(request: LoginRequest): Observable<BaseResponse<LoginResponse>> {
    return this.httpClient.post<BaseResponse<LoginResponse>>(`${environment.backendUrl}/api/users/login`, request)
      .pipe(
        tap(result => {
          if (result.isSuccess) {
            const tokenObject = this.jwtHelperService.decodeToken(result.data.token);
            const user = {
              ...tokenObject,
              token: result.data.token
            };

            this.storageService.setObject(environment.tokenKey, user);

            this.permissionService.addPermission(buildPermissionString(result.data.permissions));
          }
        }),
        catchError(error => {
          return of(error.error);
        })
      )
  }

  isAuthenticated(): boolean {
    return this.tokenService.isTokeExpire();
  }
}
