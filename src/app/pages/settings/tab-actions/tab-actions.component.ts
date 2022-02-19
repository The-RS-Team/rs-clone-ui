import { Component, OnInit, OnDestroy } from '@angular/core';
import { Messages } from 'src/app/app.constants';
import { WebsocketService } from './../../../shared/services/socket.service';
import { UsersService } from './../../boards/users.service';
import { AuthService } from './../../../auth/auth.service';
import { LocalStorageService } from './../../../shared/services/local-storage.service';
import { UserInterface } from './../../../interfaces/user.interface';

@Component({
  selector: 'app-tab-actions',
  templateUrl: './tab-actions.component.html',
  styleUrls: ['./tab-actions.component.scss']
})
export class TabActionsComponent implements OnInit, OnDestroy {
  public userActivity: any;

  constructor(private socketService: WebsocketService,
              private authService: AuthService) {
                this.socketService.on(Messages.getAtivityByUser, (res: any) => this.getActivityByUserCallback.bind(this));
               }

  ngOnInit() {
    console.log(this.authService.currentUser)
    this.getActivity(this.authService.currentUser!.user_id);
  }

  public getActivityByUserCallback(activity?: any) {
    this.userActivity = activity;
    console.log(this.userActivity)
  }

public getActivity(id: string) {
    this.socketService.emit(Messages.getAtivityByUser, id);
}

ngOnDestroy(): void {
    this.socketService.removeAllListeners()
}
}
