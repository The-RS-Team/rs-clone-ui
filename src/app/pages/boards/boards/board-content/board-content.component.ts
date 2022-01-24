import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {ListInterface} from "../../../../interfaces/list.interface";
import {BoardsService} from "../../boards.service";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {ActivatedRoute} from "@angular/router";
import {Board} from "../../../../models/board";

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

    public deleteList(listId: number){
        const listToDelete = this.board.lists.find(list => list.id === listId)
        if (listToDelete) {
            this.board.lists.splice(this.board.lists.indexOf(listToDelete), 1);
        }
    }

    public ngOnDestroy() {
        this.sub$.unsubscribe();
    }
}
