import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {BoardsService} from "../../boards.service";
import {BoardInterface} from "../../../../interfaces/board.interface";

@Component({
    selector: 'app-new-board',
    templateUrl: './new-board.component.html',
    styleUrls: ['./new-board.component.scss']
})
export class NewBoardComponent implements OnInit {
    public formGroup: FormGroup | any;

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

    create() {
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
        this.boardsService.addBoard(board as BoardInterface)
            .subscribe(
                board => {
                    this.dialogRef.close(board)
                }
            );
    }
}