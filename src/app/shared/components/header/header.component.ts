import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {NewBoardComponent} from '../../../pages/boards/components/new-board/new-board.component';
import {BoardsService} from '../../../pages/boards/boards.service';
import {AuthService} from '../../../auth/auth.service';
import {Router} from '@angular/router';
import {BoardsComponent} from '../../../pages/boards/components/boards/boards.component';
import {BoardInterface} from '../../../interfaces/board.interface';
import {AppRoutes} from '../../../app.constants';
import { LocalStorageService } from './../../services/local-storage.service';

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
                private boardsArray: BoardsComponent,
                private storage: LocalStorageService) {
    }

    ngOnInit(): void {
    }

    newBoard() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.autoFocus = true;
        dialogConfig.panelClass = 'popup';

        const dialogRef = this.dialog.open(NewBoardComponent, dialogConfig);

        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                this.boardsArray.boards.push(data as BoardInterface)
            }
        });
    }

    logOutUser() {
        this.authService.logout();
        this.storage.clear();
    }

    goToWelcome() {
        window.location.href = '/boards'
        // if (this.authService.currentUser) {
        //     this.router.navigate([AppRoutes.boards])
        // } else {
            // this.router.navigate([AppRoutes.home]);
        // }
    }

    goToSettings() {
        this.router.navigate([AppRoutes.settings]);
    }
}
