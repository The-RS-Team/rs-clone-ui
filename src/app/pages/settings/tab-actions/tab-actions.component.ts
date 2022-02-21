import { Component, OnInit, OnDestroy } from '@angular/core';
import { Messages } from 'src/app/app.constants';
import { WebsocketService } from './../../../shared/services/socket.service';
import { AuthService } from './../../../auth/auth.service';

@Component({
  selector: 'app-tab-actions',
  templateUrl: './tab-actions.component.html',
  styleUrls: ['./tab-actions.component.scss']
})
export class TabActionsComponent implements OnInit, OnDestroy {
  public userActivity: any;

  constructor(private socketService: WebsocketService,
              private authService: AuthService) {
                this.socketService.on(Messages.getAtivityByUser, this.getActivityByUserCallback.bind(this));
               }

  ngOnInit(): void {
    this.getActivity(this.authService.currentUser!.user_id);
  }

  public getActivityByUserCallback(activity?: any): void {
    this.userActivity = activity;
  }

public getActivity(id: string): void {
    this.socketService.emit(Messages.getAtivityByUser, id);
}

ngOnDestroy(): void {
    this.socketService.removeAllListeners()
}

htmlToText(val: string): string {
  const tmp = document.createElement('DIV');
    tmp.innerHTML = val;
    return tmp.textContent || tmp.innerText || '';
}
}
