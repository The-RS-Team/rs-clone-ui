import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild,} from '@angular/core';
import {ColumnInterface} from '../../../../interfaces/column.interface';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Card} from '../../../../models/card';
import {Column} from '../../../../models/column';
import {WebsocketService} from '../../../../shared/services/socket.service';
import {Messages} from '../../../../app.constants';


@Component({
    selector: 'app-board-list',
    templateUrl: './column.component.html',
    styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit, AfterViewInit {
    @Output() OnDeleteList = new EventEmitter<string>();

    @Input() column: ColumnInterface = new Column('', [], '', '', 0);
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

    public deleteCard(cardId: string) {
        const cardToDelete = this.column.cards.find(card => card.id === cardId)
        if (cardToDelete) {
            this.column.cards.splice(this.column.cards.indexOf(cardToDelete), 1);
        }
    }

    public addNewCard(): void {
        // const card = new Card('', '', '', this.column.id, 0);
        this.socketService.newCard(
            {
                title: 'newCard',
                description: '',
                columnId: this.column.id,
                position: this.column.cards.length + 1,
            } as Card);
    }

    public deleteList(columnId?: string): void {
        this.OnDeleteList.emit(columnId);
    }
}
