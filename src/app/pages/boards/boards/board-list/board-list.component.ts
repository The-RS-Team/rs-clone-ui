import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {ListInterface} from "../../../../interfaces/list.interface";
import {CardInterface} from "../../../../interfaces/card.interface";
import {BoardsService} from "../../boards.service";
import {Subscription} from "rxjs";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Card} from "../../../../models/card";
import {List} from "../../../../models/list";


@Component({
    selector: 'app-board-list',
    templateUrl: './board-list.component.html',
    styleUrls: ['./board-list.component.scss']
})
export class BoardListComponent implements OnInit, OnDestroy {

    @Input() list: ListInterface = new List(0, [], '', 0);

    private sub$ = new Subscription();

    constructor(private boardsService: BoardsService) {
    }

    ngOnInit(): void {
        // this.getCards();
    }

    // getCards(): void {
    //     this.sub$.add(
    //         this.boardsService
    //             .getCards()
    //             .subscribe((cards) => this.cards = cards));
    // }

    drop(event: CdkDragDrop<Card[]>) {
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

    public addNewCard(): void {
        console.log(this.list)
        this.list.cards.push(new Card('', this.list.id, this.list.cards.length + 1))
        console.log(this.list)

    }

    public ngOnDestroy() {
        this.sub$.unsubscribe();
    }
}
