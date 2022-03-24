import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {BoardsService} from "../../boards.service";
import {BoardInterface} from "../../../../interfaces/board.interface";
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-new-board',
    templateUrl: './new-board.component.html',
    styleUrls: ['./new-board.component.scss']
})
export class NewBoardComponent implements OnInit, OnDestroy {
    public formGroup: FormGroup | any;
    private $sub = new Subscription();

    constructor(private fb: FormBuilder,
                public dialogRef: MatDialogRef<NewBoardComponent>,
                private boardsService: BoardsService,
    ) {
    }

    ngOnInit(): void {
        this.formGroup = this.fb.group({
            title: ['', [Validators.required]],
            description: ['', []]
        });
    }

    create(): void {
        if (this.formGroup.invalid) return;

        const board = {
            "title": this.formGroup.value.title,
            "description": this.formGroup.value.description,
            "isFavorite": false,
            "background": JSON.stringify({
                background: 'url(http://localhost:4200/assets/images/boards/bg-1.jpg) #6d6a6b80',
                backgroundBlendMode: 'multiply',
                backgroundSize: 'cover'
            })
        }
        this.$sub.add(this.boardsService.addBoard(board as BoardInterface)
            .subscribe(
                board => {
                    this.dialogRef.close(board)
                }
            )
        )
    }

    ngOnDestroy() {
        this.$sub.unsubscribe();
    }
}