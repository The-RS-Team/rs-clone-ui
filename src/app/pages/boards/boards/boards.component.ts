import {Component, OnDestroy, OnInit} from '@angular/core';
import {Board} from '../../../interfaces/board.interface';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {BoardsService} from '../boards.service';
import {NewBoardComponent} from '../new-board/new-board.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit, OnDestroy {
  private sub$ = new Subscription();

  imgBaseUrl = "http://localhost:4200/assets/images/"
  boards: Board[] = [];
  favorites: Board[] = [];

  constructor(
      private boardsService: BoardsService,
      private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getBoards();
  }

  getBoards(): void {
    this.sub$.add(
    this.boardsService
        .getBoards()
        .subscribe((boards) => this.boards = boards));
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
      background: `url('${this.imgBaseUrl}svg/${star}')`,
    }
  }

  getFavorites() {
    this.favorites = this.boards.filter( el => el.isFavorite);
  }

  addToFavorites(id: number) {
    this.boards[id - 1].isFavorite = !this.boards[id - 1].isFavorite;
    this.getFavorites();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '80vw';

    const dialogRef = this.dialog.open(NewBoardComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (!data) return;
      let title = data.title.trim();
      this.boardsService.addBoard(title);
    });
  }

  public ngOnDestroy() {
    this.sub$.unsubscribe();
  }

}
