import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CardInterface} from '../../../../interfaces/card.interface';
import {ColumnInterface} from '../../../../interfaces/column.interface';
import {Column} from '../../../../models/column';
import {MatDialog} from '@angular/material/dialog';
import {CardPopUpInfoComponent} from '../card-pop-up-info/card-pop-up-info.component';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, AfterViewInit {

    @Output() OnDeleteCard = new EventEmitter<string>();

    @Input() card!: CardInterface;
    @Input() list: ColumnInterface = new Column('', '', [], '', '', 0, '');

    @ViewChild('cardTitleInput') cardTitleInput: ElementRef | undefined;


    constructor(public dialog: MatDialog) {
    }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        this.cardTitleInput?.nativeElement.focus();
    }

    openDialog(event: Event) {
        // @ts-ignore
        const classList = event.target?.classList;
        if (classList.contains('card__edit-icon') || classList.contains('card__edit-icon')) return;

        const dialogRef = this.dialog.open(CardPopUpInfoComponent, {data: this.card});

        dialogRef.afterClosed().subscribe(result => {
        });
    }

    public deleteCard(cardId?: string): void {
        this.OnDeleteCard.emit(cardId);
    }
}
