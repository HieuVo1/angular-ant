import { PermissionObjectCreate } from 'src/app/modules/authorization/models/permission-object-create';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { BaseResponse } from 'src/app/core/models/base-response';
import { PermissionObject } from '../models/permission-object';
import { environment } from 'src/environments/environment';
import { ObjectType } from '../enums/object-type';

@Injectable({
  providedIn: 'root'
})
export class PermissionObjectService {

  constructor(private readonly httpClient: HttpClient) { }

  add(permission: PermissionObjectCreate[]): Observable<BaseResponse<PermissionObject[]>> {
    return this.httpClient.post<BaseResponse<PermissionObject[]>>(`${environment.userServiceUrl}/api/permissionobjects`, permission)
      .pipe(
        catchError((error) => { return of(error.error) })
      )
  }

  getAll(types: ObjectType[]): Observable<BaseResponse<PermissionObject[]>> {
    let params = new HttpParams();

    if (types.length > 0) {
      types.forEach(type => {
        params = params.append('type', type);
      });
    }

    return this.httpClient.get<BaseResponse<PermissionObject[]>>(`${environment.userServiceUrl}/api/permissionobjects`, { params }).pipe(
      catchError(error => {
        return of(error.error)
      })
    )
  }
}
