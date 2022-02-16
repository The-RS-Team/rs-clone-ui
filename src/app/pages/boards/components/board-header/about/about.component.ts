import {Component, Input, OnInit} from '@angular/core';
import {BoardInterface} from "../../../../../interfaces/board.interface";
import {BoardsService} from "../../../boards.service";
import {UserInterface} from "../../../../../interfaces/user.interface";
import {FormControl} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

    @Input() board: BoardInterface | undefined;
    private sub$ = new Subscription();
    public user: UserInterface | undefined;
    public boardDescriptionInput = new FormControl();


    constructor(private boardService: BoardsService) {
    }

    ngOnInit(): void {
        this.sub$.add(
            this.boardDescriptionInput?.valueChanges.subscribe((changes) => {
                this.changeBoardDescription(changes);
            })
        )
    }

    public changeBoardDescription(value: string) {
        if (this.board) {
            const item = {
                id: this.board.id,
                description: value,
            }
            this.boardService.updateBoard(item as BoardInterface).subscribe(item => {})
        }
    }
}
