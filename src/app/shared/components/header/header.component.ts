import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {NewBoardComponent} from '../../../pages/boards/new-board/new-board.component';
import {BoardsService} from '../../../pages/boards/boards.service';
import {AuthService} from "../../../auth/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

    constructor(private dialog: MatDialog,
                private boardsService: BoardsService,
                public authService: AuthService,
                private router: Router) {
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

    logOutUser() {
        this.authService.logout();
    }

    goToWelcome() {
        this.router.navigate(['/home']);
    }




}
