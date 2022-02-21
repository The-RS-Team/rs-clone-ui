import { Component, OnInit, Input } from '@angular/core';
import {BoardsService} from "../../../boards.service";
import {UsersService} from "../../../users.service";
import {Subscription} from "rxjs";
import {UserInterface} from "../../../../../interfaces/user.interface";
import { WebsocketService } from 'src/app/shared/services/socket.service';
import { Messages } from 'src/app/app.constants';
import { BoardInterface } from './../../../../../interfaces/board.interface';
import { BoardsComponent } from '../../boards/boards.component';

@Component({
    selector: 'app-participants',
    templateUrl: './participants.component.html',
    styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {
    @Input() board: BoardInterface | undefined;
    public sub$ = new Subscription();
    public users: UserInterface[] = [];

    constructor(private usersService: UsersService,
                private socketService: WebsocketService,
                private boardsComp: BoardsComponent
                ) {
                    this.socketService.on(Messages.getUsersToBoards, (users: UserInterface[]) => {this.users = users;
                    console.log(this.users)});
    }

    ngOnInit(): void {
        // this.getUsers();
        this.getTeam()
        this.boardsComp.getBoards();
        console.log(this.boardsComp.boards)
    }

    public getUsers() {
        this.sub$.add(
            this.usersService
                .getUsers()
                .subscribe((users) => {
                    this.users = users;
                    console.log(this.users)
                }));
    }

    private getTeam() {
        this.socketService.emit(Messages.getUsersToBoards, this.board!.id);
    }

    public deletePartisipant(user: UserInterface) {
        console.log(user)
        this.socketService.emit(Messages.deleteUsersToBoards, user.user_id)
    }

    public ngOnDestroy() {
        this.sub$.unsubscribe();
    }
}
