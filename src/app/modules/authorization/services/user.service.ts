import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BaseResponse } from 'src/app/core/models/base-response';
import { Observable, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly httpClient: HttpClient) { }

  getAll(): Observable<BaseResponse<User[]>> {
    return this.httpClient.get<BaseResponse<User[]>>(`${environment.userServiceUrl}/api/users`).pipe(
      catchError(error => {
        return of(error.error)
      })
    )
  }

  getById(roleId: number): Observable<BaseResponse<User>> {
    return this.httpClient.get<BaseResponse<User>>(`${environment.userServiceUrl}/api/users/${roleId}`).pipe(
      catchError(error => {
        return of(error.error)
      })
    )
  }

  add(user: User): Observable<BaseResponse<User>> {
    return this.httpClient.post<BaseResponse<User>>(`${environment.userServiceUrl}/api/users`, user)
      .pipe(
        catchError((error) => { return of(error.error) })
      )
  }

  update(user: User): Observable<BaseResponse<User>> {
    return this.httpClient.patch<BaseResponse<User>>(`${environment.userServiceUrl}/api/users`, user)
      .pipe(
        catchError((error) => { return of(error.error) })
      )
  }


  delete(userId: number): Observable<BaseResponse<boolean>> {
    return this.httpClient.delete<BaseResponse<boolean>>(`${environment.userServiceUrl}/api/users/${userId}`)
      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      )
  }

  checkExists(username: string): Observable<BaseResponse<boolean>> {
    return this.httpClient.get<BaseResponse<boolean>>(`${environment.userServiceUrl}/api/users/check-exists?username=${username}`)
      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      )
  }
}
