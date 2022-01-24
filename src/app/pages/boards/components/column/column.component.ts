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
import {ColumnInterface} from "../../../../interfaces/column.interface";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Card} from "../../../../models/card";
import {Column} from "../../../../models/column";
import {CardInterface} from "../../../../interfaces/card.interface";


@Component({
    selector: 'app-board-list',
    templateUrl: './column.component.html',
    styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit, AfterViewInit {
    @Output() OnDeleteList = new EventEmitter<number>();

    @Input() column: ColumnInterface = new Column(0, [], '', 0, 0);
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
        const cardToDelete = this.column.cards.find(card => card.id === cardId)
        if (cardToDelete) {
            this.column.cards.splice(this.column.cards.indexOf(cardToDelete), 1);
        }
    }

    public addNewCard(): void {
        this.column.cards.push(new Card(this.column.cards.length + 1, '', '', this.column.id,0));
    }

    public deleteList(columnId?: number): void {
        this.OnDeleteList.emit(columnId);
    }
}
