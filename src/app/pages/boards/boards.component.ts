import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Board } from "../../modules/board.interface";
import { BoardsService } from "./boards.service";
import { NewBoardComponent } from "./../new-board/new-board.component";

@Component({
  selector: "app-boards",
  templateUrl: "./boards.component.html",
  styleUrls: ["./boards.component.scss"],
})
export class BoardsComponent implements OnInit {
  imgBaseUrl = "http://localhost:4200/assets/images/";
  boards: Board[] = [];
  favorites: Board[] = [];

  constructor(
    private boardsService: BoardsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getBoards();
  }

  getBoards(): void {
    this.boardsService
      .getBoards()
      .subscribe((boards) => (this.boards = boards));
  }

  getBg(pic: string) {
    return {
      background: `url('${this.imgBaseUrl}boards/${pic}') #6d6a6b80`,
      backgroundBlendMode: "multiply",
      backgroundSize: "cover",
    };
  }
  getStar(isFav: boolean) {
    let star = isFav ? "star-solid.svg" : "star-line.svg";
    return {
      background: `url('${this.imgBaseUrl}svg/${star}')`,
    };
  }

  addToFavorites(id: number): void {
    this.boardsService.addToFavorites(id);
    this.getFavorites()
  }

  getFavorites(): void {
    this.favorites = this.boardsService.favorites;
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(NewBoardComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (!data) return;
      let title = data.title.trim();
      this.boardsService.addBoard(title);
    });
  }
}
