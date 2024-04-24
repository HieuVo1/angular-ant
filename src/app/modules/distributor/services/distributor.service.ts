import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Distributor } from '../models/distributor';
import { environment } from 'src/environments/environment';
import { BaseResponse } from 'src/app/core/models/base-response';
import { BaseParam } from 'src/app/core/models/base-param';
import { PaginatedResponse } from 'src/app/core/models/paginated-response';

@Injectable({
  providedIn: 'root'
})
export class DistributorService {

  constructor(private httpClient: HttpClient) { }

  getAll(baseParam: BaseParam): Observable<BaseResponse<PaginatedResponse<Distributor>>> {
    let params = new HttpParams()
      .append('pageIndex', `${baseParam.pageIndex - 1}`)
      .append('pageSize', `${baseParam.pageSize}`)

    if (baseParam.sortField != null) {
      params = params.append('sortField', `${baseParam.sortField}`)
        .append('sortOrder', `${baseParam.sortOrder}`);
    }

    if (baseParam.filters.length > 0) {
      baseParam.filters.forEach(filter => {
        params = params.append(filter.key, filter.value);
      });
    }

    return this.httpClient.get<BaseResponse<PaginatedResponse<Distributor>>>(`${environment.backendUrl}/api/distributors`, { params }).pipe(
      catchError((error) => {
        return of(error.error);
      })
    )
  }

  delete(code: string): Observable<BaseResponse<boolean>> {
    return this.httpClient.delete<BaseResponse<boolean>>(`${environment.backendUrl}/api/distributors/${code}`)
      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      )
  }

  update(distributor: Distributor): Observable<BaseResponse<Distributor>> {
    return this.httpClient.patch<BaseResponse<Distributor>>(`${environment.backendUrl}/api/distributors`, distributor)
      .pipe(
        catchError((error) => { return of(error.error) })
      )
  }

  create(distributor: Distributor[]): Observable<BaseResponse<Distributor[]>> {
    return this.httpClient.post<BaseResponse<Distributor[]>>(`${environment.backendUrl}/api/distributors`, distributor)
      .pipe(
        catchError((error) => { return of(error.error) })
      )
  }

  import(distributor: Distributor[]): Observable<BaseResponse<PaginatedResponse<Distributor>>> {
    return this.httpClient.post<BaseResponse<PaginatedResponse<Distributor>>>(`${environment.backendUrl}/api/distributors/import`, distributor)
      .pipe(
        catchError((error) => { return of(error.error) })
      )
  }
}
