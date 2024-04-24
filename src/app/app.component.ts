import { Component, OnInit } from '@angular/core';
import { SignalRService } from './core/services/signalR/signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private readonly signalRService: SignalRService) { }
  ngOnInit(): void {
    this.signalRService.buildNotifyConnection();
    this.signalRService.startChatConnection();
    this.signalRService.addNotifyDataListener();
  }

}
