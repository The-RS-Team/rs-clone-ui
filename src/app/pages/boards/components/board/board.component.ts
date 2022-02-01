import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {BoardsService} from "../../boards.service";
import {ActivatedRoute} from "@angular/router";
import {Board} from "../../../../models/board";
import {WebsocketService} from "../../../../shared/services/socket.service";

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {
    private sub$ = new Subscription();

    public board: Board = new Board('', '', '', false, '', []);

    constructor(private boardsService: BoardsService,
                private socketService: WebsocketService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.boardsService.getBoardById(this.activatedRoute.snapshot.queryParams['id'])
            .subscribe((board) => {
                this.board = board;
                this.board.columns = this.board.columns || [];
            })
    }

    public addNewList(): void {
        // ToDo: create  new list. Change, after implement API
        const newColumnModel = {
            title: '',
            cards: [],
            boardId: this.board.id,
            board: this.board.id,
            position: 0
        };
        this.board.columns.push(newColumnModel);
        this.socketService.newColumn(newColumnModel);
    }

    public deleteList(columnId: string) {
        const listToDelete = this.board.columns.find(column => column.id === columnId)
        if (listToDelete) {
            this.board.columns.splice(this.board.columns.indexOf(listToDelete), 1);
        }
    }

    public ngOnDestroy() {
        this.sub$.unsubscribe();
    }
}
