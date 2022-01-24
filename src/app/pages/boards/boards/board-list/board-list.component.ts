import {
    Component,
    Input,
    OnInit,
    OnDestroy,
    ViewChild,
    ElementRef,
    Output,
    EventEmitter,
    AfterViewInit,
} from '@angular/core';
import {ListInterface} from "../../../../interfaces/list.interface";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Card} from "../../../../models/card";
import {List} from "../../../../models/list";
import {CardInterface} from "../../../../interfaces/card.interface";


@Component({
    selector: 'app-board-list',
    templateUrl: './board-list.component.html',
    styleUrls: ['./board-list.component.scss']
})
export class BoardListComponent implements OnInit, AfterViewInit {
    @Output() OnDeleteList = new EventEmitter<number>();

    @Input() list: ListInterface = new List(0, [], '', 0);
    @ViewChild('listTitleInput') listTitleInput: ElementRef | undefined;

    constructor() {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.listTitleInput?.nativeElement.focus();
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

    public addNewCard(): void {
        this.list.cards.push(new Card('', '', this.list.id, this.list.cards.length + 1));
    }

    public deleteList(listId?: number): void {
        this.OnDeleteList.emit(listId);
    }
}
