import { Component, OnInit } from '@angular/core';
import {Board} from "../../interfaces/board.interface";

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {
  imgBaseUrl = "http://localhost:4200/assets/images/"
  boards: Board[] = [
    {id: 1, title: 'Board-1', isFavorite: false, background: 'bg-1.jpg'},
    {id: 2, title: 'Board-2', isFavorite: false, background: 'bg-2.jpg'},
    {id: 3, title: 'Board-3', isFavorite: false, background: 'bg-3.jpg'},
    {id: 4, title: 'Board-4', isFavorite: false, background: 'bg-1.jpg'},
  ]
  favorites: Board[] = [];



  constructor() { }

  ngOnInit(): void {
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

}