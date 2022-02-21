import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {Subscription} from "rxjs";
import {UserInterface} from "../../../../../interfaces/user.interface";
import { WebsocketService } from 'src/app/shared/services/socket.service';
import { Messages } from 'src/app/app.constants';
import { BoardInterface } from './../../../../../interfaces/board.interface';

@Component({
    selector: 'app-participants',
    templateUrl: './participants.component.html',
    styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit, OnDestroy {
    @Input() board: BoardInterface | undefined;
    public sub$ = new Subscription();
    public users: UserInterface[] = [];

    constructor(private socketService: WebsocketService
                ) {
                    this.socketService.on(Messages.getUsersToBoards, (users: UserInterface[]) => this.users = users);
                    this.socketService.on(Messages.deleteUsersToBoards, (_: any) => {})
    }

    ngOnInit(): void {
        this.getTeam()
    }

    private getTeam(): void {
        this.socketService.emit(Messages.getUsersToBoards, this.board!.id);
    }

    public deletePartisipant(user: UserInterface): void {
        this.users = this.users.filter(el => el.user_id != user.user_id);
        if (user.id) {
            this.socketService.emit(Messages.deleteUsersToBoards, user.id)
        }
    }

    public ngOnDestroy(): void {
        this.sub$.unsubscribe();
    }
}
