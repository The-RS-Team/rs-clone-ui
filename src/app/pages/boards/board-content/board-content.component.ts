import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {List} from "../../../interfaces/list.interface";
import {BoardsService} from "../boards.service";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


@Component({
    selector: 'app-board-content',
    templateUrl: './board-content.component.html',
    styleUrls: ['./board-content.component.scss']
})
export class BoardContentComponent implements OnInit, OnDestroy {
    private sub$ = new Subscription();

    lists: List[] = [];

    constructor( private boardsService: BoardsService) {
    }

    ngOnInit(): void {
        this.getLists();
    }
    getLists(): void {
        this.sub$.add(
            this.boardsService
                .getLists()
                .subscribe((lists) => this.lists = lists));
    }

    drop(event: CdkDragDrop<string[]>) {
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

    public ngOnDestroy() {
        this.sub$.unsubscribe();
    }
}
