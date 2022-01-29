import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild,} from '@angular/core';
import {ColumnInterface} from '../../../../interfaces/column.interface';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Card} from '../../../../models/card';
import {Column} from '../../../../models/column';
import {WebsocketService} from '../../../../shared/services/socket.service';
import {Messages} from '../../../../app.constants';


@Component({
    selector: 'app-column',
    templateUrl: './column.component.html',
    styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit, AfterViewInit {
    @Output() OnDeleteList = new EventEmitter<number>();

    @Input() column: ColumnInterface = new Column(0, [], '', 0, 0, '');
    @ViewChild('listTitleInput') listTitleInput: ElementRef | undefined;

    constructor(private readonly socketService: WebsocketService) {
    }

    ngOnInit(): void {
        this.socketService.socket.on(Messages.newCard, msg => {
            console.log(Messages.newCard, msg)
            if (msg) {
                console.log(Messages.newCard, msg)
                this.column.cards.push(msg as Card);
            }
        });
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
        const card = new Card('', this.column.id,this.column.cards.length + 1);
        console.log(card)
        this.socketService.newCard(card);
    }

    public deleteList(columnId?: number): void {
        this.OnDeleteList.emit(columnId);
    }
}
