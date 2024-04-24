import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Attachment } from '../models/attachment';
import { Observable, catchError, of } from 'rxjs';
import { BaseResponse } from 'src/app/core/models/base-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  constructor(private readonly httpClient: HttpClient) { }

  create(attachment: Attachment): Observable<BaseResponse<Attachment>> {
    return this.httpClient.post<BaseResponse<Attachment>>(`${environment.backendUrl}/api/attachments`, attachment)
      .pipe(
        catchError((err) => of(err))
      )
  }

  getAll(documentRefName: string, documentRefId: number): Observable<BaseResponse<Attachment[]>> {
    return this.httpClient.get<BaseResponse<Attachment[]>>(`${environment.backendUrl}/api/attachments?documentRefName=${documentRefName}&documentRefId=${documentRefId}`)
      .pipe(
        catchError((err) => of(err))
      )
  }

  delete(attachmentId: number): Observable<BaseResponse<boolean>> {
    return this.httpClient.delete<BaseResponse<boolean>>(`${environment.backendUrl}/api/attachments/${attachmentId}`)
      .pipe(
        catchError((err) => of(err))
      )
  }
}
