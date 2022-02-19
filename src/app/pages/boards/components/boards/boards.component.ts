import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {BoardsService} from '../../boards.service';
import {NewBoardComponent} from '../new-board/new-board.component';
import {BoardInterface} from '../../../../interfaces/board.interface';
import {Router} from '@angular/router';
import {UsersService} from '../../users.service';
import {AuthService} from '../../../../auth/auth.service';
import {WebsocketService} from '../../../../shared/services/socket.service';
import {Messages} from '../../../../app.constants';
import {Invite} from '../../../../models/invite';

@Injectable({
    providedIn: 'root'
})

@Component({
    selector: 'app-boards',
    templateUrl: './boards.component.html',
    styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit, OnDestroy {
    private sub$ = new Subscription();

    imgBaseUrl = 'http://localhost:4200/assets/images/'
    boards: BoardInterface[] = [];
    users: any[] = [];
    public favorites: BoardInterface[] = [];

    constructor(
        private readonly boardsService: BoardsService,
        private readonly usersService: UsersService,
        private readonly router: Router,
        private readonly authService: AuthService,
        private readonly dialog: MatDialog,
        private readonly socketService: WebsocketService,
    ) {
    }

    ngOnInit(): void {
        this.socketService.on(Messages.checkInvitesByEmail, this.checkInvitesByEmail.bind(this));
        this.socketService.on(Messages.connect, () => {
            if (this.authService.currentUser?.email) {
                this.socketService.emit(Messages.checkInvitesByEmail, this.authService.currentUser.email);
            }
        });

        this.getBoards();
        this.getFavorites();
        this.getUsers();
    }

    getUsers(): void {
        this.sub$.add(
            this.usersService
                .getUsers()
                .subscribe((users) => this.users = users));
    }

    checkInvitesByEmail(invites: Invite[]): void {
        console.log('checkInvitesByEmail', invites);
        if (invites.length > 0)
            this.getBoards();
    }

    getBoards(): void {
        this.sub$.add(
            this.boardsService
                .getBoards()
                .subscribe((boards) => this.boards = boards));
    }

    getBg(board: BoardInterface) {
        return JSON.parse(board.background)
    }

    getStar(isFav: boolean) {
        let star = isFav ? 'star-solid.svg' : 'star-line.svg';
        return {
            background: `url('${this.imgBaseUrl}svg/${star}')`,
        }
    }

    getFavorites() {
        this.sub$.add(
            this.boardsService
                .getFavorites()
                .subscribe(fav => this.favorites = fav)
        )
    }

    addToFavorites(board: BoardInterface): void {
        board.isFavorite = !board.isFavorite;
        this.boardsService.updateBoard(board as BoardInterface)
            .subscribe(
                _ => {
                    if (board.isFavorite) {
                        this.favorites.push(board)
                    } else {
                        this.favorites = this.favorites.filter(el => el.isFavorite)
                    }
                }
            )
    }

    deleteBoard(board: BoardInterface): void {
        this.boardsService.deleteBoard(board.id!)
            .subscribe(
                _ => {
                    this.boards = this.boards.filter(el => board.id != el.id)
                    this.favorites = this.favorites.filter(el => board.id != el.id)
                }
            )
    }

    openDialog() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.autoFocus = true;
        dialogConfig.width = '80vw';

        const dialogRef = this.dialog.open(NewBoardComponent, dialogConfig);

        this.sub$.add(
            dialogRef.afterClosed().subscribe(board => {
                if (board) {
                    this.boards.push(board);
                }
            })
        )
    }

    public openBoard(id: string) {
        this.router.navigate(['board'], {queryParams: {id: id}})
    }

    public ngOnDestroy() {
        this.sub$.unsubscribe();
    }


}
