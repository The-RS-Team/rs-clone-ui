import {Component, Input, OnInit} from '@angular/core';
import {CardInterface} from "../../../../interfaces/card.interface";

@Component({
    selector: 'app-board-card',
    templateUrl: './board-card.component.html',
    styleUrls: ['./board-card.component.scss']
})
export class BoardCardComponent implements OnInit {
    @Input() card: CardInterface | undefined;

    constructor() {
    }

    ngOnInit(): void {
        console.log(this.card)
    }

}
