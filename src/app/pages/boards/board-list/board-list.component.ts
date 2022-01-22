import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {List} from "../../../interfaces/list.interface";
import {Card} from "../../../interfaces/card.interface";
import {BoardsService} from "../boards.service";
import {Subscription} from "rxjs";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


@Component({
    selector: 'app-board-list',
    templateUrl: './board-list.component.html',
    styleUrls: ['./board-list.component.scss']
})
export class BoardListComponent implements OnInit, OnDestroy {

    @Input() list: List | undefined;
    cards: Card[] = [];

    private sub$ = new Subscription();

    constructor(private boardsService: BoardsService) {
    }

    ngOnInit(): void {
        this.getCards();
    }

    getCards(): void {
        this.sub$.add(
            this.boardsService
                .getCards()
                .subscribe((cards) => this.cards = cards));
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
