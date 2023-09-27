import { Component } from '@angular/core';
import { Notify } from 'src/app/modules/main/models/notify';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  listNotify: Notify[] = [{
    type: '',
    content: 'Hello',
    created_At: new Date(),
    id: 1,
    isRead: false,
    orderId: 1
  }];

  updateNumUnread() {

  }
}
