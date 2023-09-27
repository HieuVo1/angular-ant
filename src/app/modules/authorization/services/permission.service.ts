import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponse } from 'src/app/core/models/base-response';
import { Permission } from '../models/permission';
import { PermissionUpdate } from '../models/permission-update';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private readonly httpClient: HttpClient) { }

  getAll(): Observable<BaseResponse<Permission[]>> {
    return this.httpClient.get<BaseResponse<Permission[]>>(`${environment.userServiceUrl}/api/permissions`).pipe(
      catchError((error) => of(error.error))
    )
  }

  update(permission: PermissionUpdate): Observable<BaseResponse<Permission[]>> {
    return this.httpClient.patch<BaseResponse<Permission[]>>(`${environment.userServiceUrl}/api/permissions`, permission)
      .pipe(
        catchError((error) => { return of(error.error) })
      )
  }

  add(permission: Permission): Observable<BaseResponse<Permission[]>> {
    return this.httpClient.post<BaseResponse<Permission[]>>(`${environment.userServiceUrl}/api/permissions`, permission)
      .pipe(
        catchError((error) => { return of(error.error) })
      )
  }

  delete(roleId: number, permissionObjectId: number): Observable<BaseResponse<boolean>> {
    return this.httpClient.delete<BaseResponse<boolean>>(`${environment.userServiceUrl}/api/permissions?roleId=${roleId}&permissionObjectId=${permissionObjectId}`)
      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      )
  }
}
