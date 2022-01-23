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

    constructor() {
    }

    ngOnInit(): void {

    }

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

    public deleteCard(cardId: number) {
        const cardToDelete = this.list.cards.find(card => card.id === cardId)
        if (cardToDelete) {
            this.list.cards.splice(this.list.cards.indexOf(cardToDelete), 1);
        }
    }

// Первый параметр new Card() пока что сделан таким, чтобы карточки отличались друг от друга на данном этапе
    public addNewCard(): void {
        this.list.cards.push(new Card((this.list.cards.length + 1).toString(), this.list.id, this.list.cards.length + 1))
    }

    public ngOnDestroy() {
    }
}
