import {Component, ElementRef, Injectable, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
    public bg = {};
    public boardWrapper: HTMLElement | undefined;
    public board: Board = new Board('', '', '', false, '', []);

    constructor(private boardsService: BoardsService,
                private socketService:WebsocketService,
                private activatedRoute: ActivatedRoute,
               ) {
    }

    @ViewChild('boardWrapper') boardWrap: ElementRef | undefined;

    ngAfterViewInit() {
        this.boardWrapper = this.boardWrap?.nativeElement;
    }
    ngOnInit(): void {
        this.boardsService.getBoardById(this.activatedRoute.snapshot.queryParams['id'])
            .subscribe((board) => {
                this.board = board;
                this.bg = JSON.parse(board.background)
                this.board.columns = this.board.columns || [];
            })
    }

    public addNewList(): void {
        // ToDo: create  new list. Change, after implement API
        const newCardModel = {
            id: this.board.columns.length.toString(),
            title: '',
            cards: [],
            boardId: this.board.id,
            position: 0
        };
        this.board.columns.push(newCardModel);
        this.socketService.newColumn(newCardModel);
    }

    public deleteList(columnId: string){
        const listToDelete = this.board.columns.find(column => column.id === columnId)
        if (listToDelete) {
            this.board.columns.splice(this.board.columns.indexOf(listToDelete), 1);
        }
    }

    public ngOnDestroy() {
        this.sub$.unsubscribe();
    }
}
