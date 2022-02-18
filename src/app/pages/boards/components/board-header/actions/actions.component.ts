import {Component, Input, OnInit} from '@angular/core';
import {BoardInterface} from "../../../../../interfaces/board.interface";
import {WebsocketService} from "../../../../../shared/services/socket.service";
import {Messages} from "../../../../../app.constants";
import {AuthService} from "../../../../../auth/auth.service";
import {User} from "../../../../../models/user";

@Component({
    selector: 'app-actions',
    templateUrl: './actions.component.html',
    styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
    @Input() board: BoardInterface | undefined;
    public boardActivity: any;
    private currentUser = new User('', null, null, null);

    constructor(private socketService: WebsocketService,
                private authService: AuthService) {
        this.authService.currentUserSubject.subscribe(user => this.currentUser = user)
        this.socketService.on(Messages.getAtivityByBoard, (res: any) => this.getActivityByBoardCallback(res));
    }

    ngOnInit(): void {
        this.getActivity();
    }

    public getActivityByBoardCallback(activity?: any) {
        console.log(activity)
        this.boardActivity = activity;
    }

    public getActivity() {

        if (this.board) {
            this.socketService.emit(Messages.getAtivityByBoard, this.board.id);
        }
    }
}
