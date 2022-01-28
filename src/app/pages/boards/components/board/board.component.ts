import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {BoardsService} from "../../boards.service";
import {ActivatedRoute} from "@angular/router";
import {Board} from "../../../../models/board";

@Component({
    selector: 'app-board-content',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {
    private sub$ = new Subscription();

    public board: Board = new Board(0, '', '',false, '', []);

    constructor(private boardsService: BoardsService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.boardsService.getBoardById(this.activatedRoute.snapshot.queryParams['id'])
            .subscribe((board) => {
                this.board = board;
                console.log(this.board)
                this.board.columns = this.board.columns || [];
            })
    }

    public addNewList(): void {
        // ToDo: create  new list. Change, after implement API
        this.board.columns.push({
            id: this.board.columns.length,
            title: '',
            cards: [],
            boardId: this.board.id,
            position: 0
        });
    }

    public deleteList(columnId: number){
        const listToDelete = this.board.columns.find(column => column.id === columnId)
        if (listToDelete) {
            this.board.columns.splice(this.board.columns.indexOf(listToDelete), 1);
        }
    }

    public ngOnDestroy() {
        this.sub$.unsubscribe();
    }
}
