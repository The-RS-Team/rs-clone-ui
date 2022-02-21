import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import {BoardInterface} from "../../../../../interfaces/board.interface";
import {BoardsService} from "../../../boards.service";
import {UserInterface} from "../../../../../interfaces/user.interface";
import {FormControl} from "@angular/forms";
import {Subscription} from "rxjs";
import { WebsocketService } from 'src/app/shared/services/socket.service';
import { Messages } from 'src/app/app.constants';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {

    @Input() board: BoardInterface | undefined;
    private sub$ = new Subscription();
    public user: UserInterface | undefined;
    public boardOwner: UserInterface | undefined;
    public boardDescriptionInput = new FormControl();

    constructor(private boardService: BoardsService,
                private socketService: WebsocketService) {
    }

    ngOnInit(): void {
        this.getBoard();
        this.getUsers();
        this.sub$.add(
            this.boardDescriptionInput?.valueChanges.subscribe((changes) => {
                this.changeBoardDescription(changes);
            })
        )
        this.socketService.on(Messages.getUsersToBoards, this.getBoardOwnerCallback.bind(this));
    }

    getBoardOwnerCallback(users: UserInterface[]): void {
        this.boardOwner = users.filter(user => user.isOwner === true)[0];
    }

    private getUsers(): void {
        this.socketService.emit(Messages.getUsersToBoards, this.board!.id);
    }

    public getBoard(): void {
        if (this.board) {
            this.boardService.getBoardById(this.board.id).subscribe(board => {
                this.board = board
                this.boardDescriptionInput.setValue(board?.description)
            });
        }
    }

    public changeBoardDescription(value: string): void {
        if (this.board) {
            const item = {
                id: this.board.id,
                description: value,
            }
            this.boardService.updateBoard(item as BoardInterface).subscribe(item => {
            })
        }
    }

    ngOnDestroy(): void {
        this.socketService.removeAllListeners();
    }
}
