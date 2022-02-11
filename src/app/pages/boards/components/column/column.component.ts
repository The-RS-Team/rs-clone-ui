import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild,} from '@angular/core';
import {ColumnInterface} from '../../../../interfaces/column.interface';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Card, CardDeleteResult} from '../../../../models/card';
import {Column, ColumnDeleteResult} from '../../../../models/column';
import {WebsocketService} from '../../../../shared/services/socket.service';
import {Messages} from '../../../../app.constants';
import {CardInterface} from '../../../../interfaces/card.interface';

@Component({
    selector: 'app-column',
    templateUrl: './column.component.html',
    styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit, AfterViewInit {
    @Output() OnDeleteList = new EventEmitter<string>();

    @Input() column: ColumnInterface = new Column('', '', [], '', 0);
    @ViewChild('listTitleInput') listTitleInput: ElementRef | undefined;

    constructor(private readonly socketService: WebsocketService) {
    }

    ngOnInit(): void {
        this.socketService.on(Messages.newCard, this.newCardCallback.bind(this));
        this.socketService.on(Messages.deleteCard, this.deleteCardCallback.bind(this));
        this.socketService.on(Messages.updateCard, this.updateCardCallback.bind(this));
    }

    private newCardCallback(card: Card): void {
        if (card) {
            console.log(card, 'card')
            if (card.columnId === this.column.id)
                this.column.cards.push(card);
        }
    }

    deleteCardCallback(deleteResult: CardDeleteResult): void {
        console.log('deleteCardCallback', deleteResult)
        if (deleteResult.affected > 0) {
            deleteResult.raw.forEach((id: any) => {
                this.column.cards.splice(
                this.column.cards.indexOf(
                    <CardInterface>this.column.cards.find(card => card.id === id)
                ), 1)}
            )
        }
}

    updateCardCallback(update: any): void {
        console.log('newCardCallback', update)
    }


ngAfterViewInit(): void {
    this.listTitleInput?.nativeElement.focus();
}

drop(event: CdkDragDrop<CardInterface[]>) {
        console.log(event, 'event')
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
    // console.log(event.container.data)
    // console.log(this.column.id)

    const card = event.container.data[event.currentIndex];
    card.position = event.currentIndex;

    if (this.column.id != null) {
        card.columnId = this.column.id;
    }
    console.log(card);
    this.socketService.emit(Messages.updateCard, card);
}

public deleteCard(cardId: string) {
    const cardToDelete = this.column.cards.find(card => card.id === cardId)
    if (cardToDelete) {
        this.socketService.emit(Messages.deleteCard, cardId);
    }
}

public addNewCard(): void {
    this.socketService.emit(Messages.newCard, {
            title: '',
            description: '',
            columnId: this.column.id,
            position: this.column.cards.length + 1,
            column: this.column.id,
            cardItems: []
        } as Card);
}

    public deleteList(columnId ?: string): void {
        this.OnDeleteList.emit(columnId);
    }
}
