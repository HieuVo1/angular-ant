import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { BaseParam } from 'src/app/core/models/base-param';
import { BaseResponse } from 'src/app/core/models/base-response';
import { PaginatedResponse } from 'src/app/core/models/paginated-response';
import { Item } from '../models/item';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private httpClient: HttpClient) { }

  getAll(baseParam: BaseParam): Observable<BaseResponse<PaginatedResponse<Item>>> {
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

    return this.httpClient.get<BaseResponse<PaginatedResponse<Item>>>(`${environment.backendUrl}/api/items`, { params }).pipe(
      catchError((error) => {
        return of(error.error);
      })
    )
  }

  delete(no: string): Observable<BaseResponse<boolean>> {
    return this.httpClient.delete<BaseResponse<boolean>>(`${environment.backendUrl}/api/items/${no}`)
      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      )
  }

  update(item: Item): Observable<BaseResponse<Item>> {
    return this.httpClient.patch<BaseResponse<Item>>(`${environment.backendUrl}/api/items`, item)
      .pipe(
        catchError((error) => { return of(error.error) })
      )
  }

  create(items: Item[]): Observable<BaseResponse<Item[]>> {
    return this.httpClient.post<BaseResponse<Item[]>>(`${environment.backendUrl}/api/items`, items)
      .pipe(
        catchError((error) => { return of(error.error) })
      )
  }

  import(items: Item[]): Observable<BaseResponse<PaginatedResponse<Item>>> {
    return this.httpClient.post<BaseResponse<PaginatedResponse<Item>>>(`${environment.backendUrl}/api/items/import`, items)
      .pipe(
        catchError((error) => { return of(error.error) })
      )
  }
}
