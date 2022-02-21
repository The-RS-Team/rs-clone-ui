import {Component, Input, OnInit, AfterViewInit} from '@angular/core';
import {BoardInterface} from "../../../../../interfaces/board.interface";
import {BoardsService} from "../../../boards.service";
import {UserInterface} from "../../../../../interfaces/user.interface";
import {FormControl} from "@angular/forms";
import {Subscription} from "rxjs";
import {AuthService} from "../../../../../auth/auth.service";
import {User} from "../../../../../models/user";

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

    @Input() board: BoardInterface | undefined;
    private sub$ = new Subscription();
    public user: UserInterface | undefined;
    public boardDescriptionInput = new FormControl();
    public currentUser = new User('', null, null, null);


    constructor(private boardService: BoardsService,
                public authService: AuthService) {
        this.authService.currentUserSubject.subscribe(user => this.currentUser = user)
    }

    ngOnInit(): void {
        this.getBoard();
        this.sub$.add(
            this.boardDescriptionInput?.valueChanges.subscribe((changes) => {
                this.changeBoardDescription(changes);
            })
        )
    }

    public getBoard() {
        if (this.board) {
            this.boardService.getBoardById(this.board.id).subscribe(board => {
                this.board = board
                this.boardDescriptionInput.setValue(board?.description)
            });
        }
    }

    public changeBoardDescription(value: string) {
        if (this.board) {
            const item = {
                id: this.board.id,
                description: value,
            }
            this.boardService.updateBoard(item as BoardInterface).subscribe(item => {
            })
        }
    }
}
