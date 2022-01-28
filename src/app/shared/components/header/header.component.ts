import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {NewBoardComponent} from '../../../pages/boards/components/new-board/new-board.component';
import {BoardsService} from '../../../pages/boards/boards.service';
import {AuthService} from "../../../auth/auth.service";
import {Router} from "@angular/router";
import {BoardsComponent} from "../../../pages/boards/components/boards/boards.component";
import {BoardInterface} from "../../../interfaces/board.interface";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

    constructor(private dialog: MatDialog,
                private boardsService: BoardsService,
                public authService: AuthService,
                private router: Router,
                private boardsArray: BoardsComponent) {
    }

    ngOnInit(): void {
    }

    newBoard() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.autoFocus = true;
        dialogConfig.panelClass = 'popup';

        const dialogRef = this.dialog.open(NewBoardComponent, dialogConfig);

        dialogRef.afterClosed().subscribe((data) => {
            this.boardsArray.boards.push(data as BoardInterface)
        });
    }

    logOutUser() {
        this.authService.logout();
    }

    goToWelcome() {
        this.router.navigate(['/home']);
    }




}
