import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {NewBoardComponent} from '../../../pages/boards/components/new-board/new-board.component';
import {BoardsService} from '../../../pages/boards/boards.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

    constructor(private dialog: MatDialog,
                private boardsService: BoardsService) {

    }

    ngOnInit(): void {
    }

    newBoard() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.autoFocus = true;
        dialogConfig.panelClass = 'popup';

        const dialogRef = this.dialog.open(NewBoardComponent, dialogConfig);

        dialogRef.afterClosed().subscribe((data) => {
            if (!data) return;
            let title = data.title.trim();
            this.boardsService.addBoard(title);
        });
    }

}
