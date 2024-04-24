import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { SignalRService } from 'src/app/core/services/signalR/signal-r.service';
import { Notify } from 'src/app/modules/main/models/notify';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  listNotify: Notify[] = [];
  gridStyle = {
    width: '100%',
    padding: '10px'
  };
  @ViewChild('audioElement', { static: true }) private audioElement: any;

  constructor(private readonly renderer: Renderer2,
    private readonly signalRService: SignalRService) {

  }
  ngOnInit(): void {
    this.signalRService.notifyEventEmitter$.subscribe(data => {

      this.listNotify = [
        {
          type: '',
          content: data,
          created_At: new Date(),
          id: 1,
          isRead: false,
          orderId: 1
        },
        ...this.listNotify
      ]
      this.playNotifySound();
    })

  }
  updateNumUnread() {

  }

  playNotifySound() {
    this.audioElement.nativeElement.insertAdjacentHTML("beforeend", "<audio autoplay><source src='assets/musics/notification.mp3'></audio>")
    setTimeout(() => {
      const childElements = this.audioElement.nativeElement.childNodes;
      for (let child of childElements) {
        this.renderer.removeChild(this.audioElement.nativeElement, child);
      }
    }, 1000)
  }
}
