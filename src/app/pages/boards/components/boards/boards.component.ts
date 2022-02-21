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
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from './../../../../shared/services/local-storage.service';
import { UserInterface } from 'src/app/interfaces/user.interface';

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

    public imgBaseUrl = 'http://localhost:4200/assets/images/'
    public boards: BoardInterface[] = [];
    public users: UserInterface[] = [];
    public favorites: BoardInterface[] = [];

    constructor(
        private readonly boardsService: BoardsService,
        private readonly usersService: UsersService,
        private readonly router: Router,
        private readonly dialog: MatDialog,
        public readonly translate: TranslateService,
        private storage: LocalStorageService
    ) {
    }

    ngOnInit(): void {
        let lang = this.storage.getItem('language') ? this.storage.getItem('language') : 'en';
        this.translate.use(lang);

        this.checkInvites();
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

    checkInvites(): void {
        this.boardsService
            .checkInvites()
            .subscribe((invites) => {
                if (invites.length > 0)
                    setTimeout(this.getBoards.bind(this), 1000);
            });
    }

    getBoards(): void {
        this.sub$.add(
            this.boardsService
                .getBoards()
                .subscribe((boards) => {
                    this.boards = boards;
                }));
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

    getFavorites(): void {
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
        if (board.usersToBoards![0].isOwner) {
            this.boardsService.deleteBoard(board.id!)
                .subscribe(
                    _ => {
                        this.boards = this.boards.filter(el => board.id != el.id)
                        this.favorites = this.favorites.filter(el => board.id != el.id)
                    }
                )
        } else {
            alert(this.translate.instant('board-delete-alert'));
        }
    }

    openDialog(): void {
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

    public openBoard(id: string): void {
        this.router.navigate(['board'], {queryParams: {id: id}})
    }

    public ngOnDestroy(): void {
        this.sub$.unsubscribe();
    }
}
