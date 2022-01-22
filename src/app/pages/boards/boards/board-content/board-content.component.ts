import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ListInterface} from "../../../../interfaces/list.interface";
import {BoardsService} from "../../boards.service";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {ActivatedRoute} from "@angular/router";
import {BoardInterface} from "../../../../interfaces/board.interface";
import {Board} from "../../../../models/board";
import {Card} from "../../../../models/card";
import {List} from "../../../../models/list";


@Component({
    selector: 'app-board-content',
    templateUrl: './board-content.component.html',
    styleUrls: ['./board-content.component.scss']
})
export class BoardContentComponent implements OnInit, OnDestroy {
    private sub$ = new Subscription();

    public board: Board = new Board(0, '', false, [], '');

    constructor(private boardsService: BoardsService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.boardsService.getBoardById(this.activatedRoute.snapshot.queryParams['id'])
            .subscribe((board) => {
                this.board = board;
                this.board.lists = this.board.lists || [];
            })
    }

    // getLists(): void {
    //     this.sub$.add(
    //         this.boardsService
    //             .getLists()
    //             .subscribe((lists) => this.lists = lists));
    // }

    drop(event: CdkDragDrop<ListInterface[], any>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );
        }
    }

    public addNewList(): void {
        // ToDo: create  new list. Change, after implement API
        this.board.lists.push({
            id: this.board.lists.length,
            title: '',
            cards: [],
            boardId: this.board.id
        });
    }

    public ngOnDestroy() {
        this.sub$.unsubscribe();
    }
}
