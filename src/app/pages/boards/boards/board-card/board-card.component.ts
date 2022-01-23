import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CardInterface} from "../../../../interfaces/card.interface";
import {ListInterface} from "../../../../interfaces/list.interface";
import {List} from "../../../../models/list";

@Component({
    selector: 'app-board-card',
    templateUrl: './board-card.component.html',
    styleUrls: ['./board-card.component.scss']
})
export class BoardCardComponent implements OnInit {

    @Output() OnDeleteCard = new EventEmitter<number>();

    @Input() card: CardInterface | undefined;
    @Input() list: ListInterface = new List(0, [], '', 0);

    constructor() {
    }

    ngOnInit(): void {
    }

    public deleteCard(cardId?: number): void {
        this.OnDeleteCard.emit(cardId);
    }
}
