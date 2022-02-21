import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {ColumnInterface} from '../../../../interfaces/column.interface';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Card, CardDeleteResult} from '../../../../models/card';
import {Column, ColumnDeleteResult} from '../../../../models/column';
import {WebsocketService} from '../../../../shared/services/socket.service';
import {Messages} from '../../../../app.constants';
import {CardInterface} from '../../../../interfaces/card.interface';
import {FormGroup} from '@angular/forms';
import {FormBuilder} from '@angular/forms';
import {Validators} from '@angular/forms';
import {BoardInterface} from "../../../../interfaces/board.interface";
import {Board} from 'src/app/models/board';

@Component({
    selector: 'app-column',
    templateUrl: './column.component.html',
    styleUrls: ['./column.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ColumnComponent implements OnInit {
    @Output() OnDeleteList = new EventEmitter<string>();
    @Input() board: BoardInterface = new Board('', '', '', false, '', []);
    @Input() column: ColumnInterface = new Column('', '', [], '', 0, '');
    @ViewChild('columnTitleInput') columnTitleInput: ElementRef | undefined;
    @ViewChild('newCardInput') newCardInput: ElementRef | undefined;
    public isNewCard = false;
    public formGroup: FormGroup | any;

    constructor(private readonly socketService: WebsocketService,
                private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.column.cards.sort((a, b) => a.position > b.position ? 1 : -1);
        this.socketService.on(Messages.newCard, this.newCardCallback.bind(this));
        this.socketService.on(Messages.deleteCard, this.deleteCardCallback.bind(this));
        this.socketService.on(Messages.updateCard, this.updateCardCallback.bind(this));
        this.socketService.on(Messages.updateColumn, this.updateColumnCallback.bind(this));

        this.formGroup = this.fb.group({
            title: ['', [Validators.required]],
        });
    }

    private newCardCallback(card: Card): void {
        if (card) {
            if (card.columnId === this.column.id)
                this.column.cards.push(card);
        }
    }

    private deleteCardCallback(deleteResult: CardDeleteResult): void {

        const cardToDelete = this.column.cards.find(card => card.id === deleteResult.raw[0])
        if (this.column.id === cardToDelete?.columnId) {
            if (deleteResult.affected > 0) {
                this.column.cards.splice(
                    this.column.cards.indexOf(
                        <CardInterface>this.column.cards.find(card => card.id === deleteResult.raw[0])
                    ), 1)
            }
        }
    }

    updateCardCallback(card: any): void {
        if (card) {
            if (card.columnId === this.column.id)
                this.column.cards = this.column.cards.map(el => {
                    if (el.id === card.id) return card;
                    else return el;
                })
        }
    }

    updateColumnCallback(column: any) {
        if (!column) return;
         if (this.column.id === column.id) {
            this.column = column;
            this.column.cards.sort((a, b) => a.position > b.position ? 1 : -1);
        }
    }

    drop(event: CdkDragDrop<CardInterface[]>) {
        if (!this.column) return;
        console.log(event)
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
        const card = event.container.data[event.currentIndex];

        if (this.column.id != null) {
            card.columnId = this.column.id;
        }

        const item = {
            id: card.id,
            columnId: card.columnId,
            title: card.title,
            position: card.position,
            description: card.description,
            cover: card.cover
        }

        this.socketService.emit(Messages.updateCard, item);

        this.column.cards = event.container.data.map((el, index) => {
            el.position = index;
            return el;
        });

        this.column.cards.forEach(card => {
            const item = {
                id: card.id,
                columnId: card.columnId,
                title: card.title,
                position: card.position,
                description: card.description,
                cover: card.cover
            }
            this.socketService.emit(Messages.updateCard, item);
        })

        const column = {
            id: this.column.id,
            title: this.column.title,
            boardId: this.column.boardId,
            position: this.column.position,
            description: this.column.description,
        }
        this.socketService.emit(Messages.updateColumn, column);

        let columnPrev = this.board.columns.find(el => el.id === event.previousContainer.element.nativeElement.id);
        const columnPrevious = {
            id: columnPrev?.id,
            title: columnPrev?.title,
            boardId: columnPrev?.boardId,
            position: columnPrev?.position,
            description: columnPrev?.description,
        }
        this.socketService.emit(Messages.updateColumn, columnPrevious);
    }

    public columnsId() {
        return this.board.columns.map(column => column.id);
    }

    public deleteCard(cardId: string) {
        const cardToDelete = this.column.cards.find(card => card.id === cardId)
        if (cardToDelete) {
            this.socketService.emit(Messages.deleteCard, cardId);
        }
    }

    public openAddNewCardForm() {
        this.isNewCard = true;
    }

    public addNewCard(): void {
        if (this.formGroup.invalid) return;

        this.socketService.emit(Messages.newCard, {
            title: this.formGroup.value.title,
            description: '',
            columnId: this.column.id,
            position: this.column.cards.length + 1,
            cardItems: [],
            files: [],
            cover: '',
        } as Card);
        this.isNewCard = false;
        this.formGroup.reset({'title': ''});
    }

    public changeColumnTitle(value: string) {
        const item = {
            id: this.column.id,
            title: value,
            boardId: this.column.boardId,
            position: this.column.position,
            description: '',
        }
        this.socketService.emit(Messages.updateColumn, item);
    }

    public deleteColumn(columnId?: string): void {
        this.OnDeleteList.emit(columnId);
    }

    public cancelNewCard() {
        this.isNewCard = false;
    }

    public ngOnDestroy() {
    }
}
