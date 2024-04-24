import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { UtilitiesService } from '../utilities/utilities.service';
import { TokenService } from '../token/token.service';
import { Subject } from 'rxjs';
import { Notify } from 'src/app/modules/main/models/notify';
@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private notifyHubConnection!: signalR.HubConnection
  private notifySubject = new Subject<string>();

  notifyEventEmitter$ = this.notifySubject.asObservable();

  constructor(private readonly tokenService: TokenService) { }

  public buildNotifyConnection() {
    this.notifyHubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.backendUrl}/notification`, { accessTokenFactory: () => this.tokenService.getToken() })
      .withAutomaticReconnect()
      .build();
  }

  public startChatConnection() {
    this.notifyHubConnection
      .start()
      .then(() => console.log("Start Chat Connection"))
      .catch((err) => console.log('Error while starting connection: ' + err));
  }


  public addNotifyDataListener = () => {
    this.notifyHubConnection.on('ReceiveMessage', (data) => {
      this.notifySubject.next(data);
    });
  }

}
