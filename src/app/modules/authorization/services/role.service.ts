import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { BaseResponse } from 'src/app/core/models/base-response';
import { Role } from '../models/role';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private readonly httpClient: HttpClient) { }

  getAll(): Observable<BaseResponse<Role[]>> {
    return this.httpClient.get<BaseResponse<Role[]>>(`${environment.backendUrl}/api/roles`).pipe(
      catchError(error => {
        return of(error.error)
      })
    )
  }

  getById(roleId: number): Observable<BaseResponse<Role>> {
    return this.httpClient.get<BaseResponse<Role>>(`${environment.backendUrl}/api/roles/${roleId}`).pipe(
      catchError(error => {
        return of(error.error)
      })
    )
  }

  add(role: Role): Observable<BaseResponse<Role>> {
    return this.httpClient.post<BaseResponse<Role>>(`${environment.backendUrl}/api/roles`, role)
      .pipe(
        catchError((error) => { return of(error.error) })
      )
  }

  update(role: Role): Observable<BaseResponse<Role>> {
    return this.httpClient.patch<BaseResponse<Role>>(`${environment.backendUrl}/api/roles`, role)
      .pipe(
        catchError((error) => { return of(error.error) })
      )
  }


  delete(roleId: number): Observable<BaseResponse<boolean>> {
    return this.httpClient.delete<BaseResponse<boolean>>(`${environment.backendUrl}/api/roles/${roleId}`)
      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      )
  }
}
