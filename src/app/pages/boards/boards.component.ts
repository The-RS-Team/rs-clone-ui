import {Component, OnDestroy, OnInit} from '@angular/core';
import {Board} from '../../interfaces/board.interface';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {BoardsService} from './boards.service';
import {NewBoardComponent} from './new-board/new-board.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit, OnDestroy {
  private sub$ = new Subscription();

  imgBaseUrl = "http://localhost:4200/assets/images/"
  boards: Board[] = []
  favorites: Board[] = [];

  constructor(
      private boardsService: BoardsService,
      private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getBoards();
    this.getFavorites();
  }

  getBoards(): void {
    this.sub$.add(
    this.boardsService
        .getBoards()
        .subscribe(boards => this.boards = boards));
  }

  getBg(pic: string) {
    return {
      background: `url('${this.imgBaseUrl}boards/${pic}') #6d6a6b80`,
      backgroundBlendMode: 'multiply',
      backgroundSize: 'cover'
    }
  }
  getStar(isFav: boolean) {
    let star = isFav ? 'star-solid.svg' : 'star-line.svg';
    return {
      background: `url('${this.imgBaseUrl}svg/${star}') no-repeat`,
    }
  }

  getFavorites() {
    this.sub$.add(
    this.boardsService
        .getFavorites()
        .subscribe( fav => this.favorites = fav)
    )
  }

  addToFavorites(board: Board): void {
    board.isFavorite = !board.isFavorite;
    this.boardsService.updateBoard(board as Board)
        .subscribe(
            _ => {
              if (board.isFavorite) {
              this.favorites.push(board)
              } else {
                this.favorites = this.favorites.filter( el => el.isFavorite)
              }
            }
        )
  }

  deleteBoard(board: Board): void {
    this.boardsService.deleteBoard(board.id!)
        .subscribe(
            _ => {
              this.boards = this.boards.filter( el => board.id != el.id)
              this.favorites = this.favorites.filter( el => board.id != el.id)
            }
        )
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '80vw';

    const dialogRef = this.dialog.open(NewBoardComponent, dialogConfig);

   dialogRef.afterClosed().subscribe(board => {
      this.boards.push(board)
    });
  }

  public ngOnDestroy() {
    this.sub$.unsubscribe();
  }

}
