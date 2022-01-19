import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Board} from "../../interfaces/board.interface";

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  boards: Board[] = [
    {id: 1, title: 'Board-1', isFavorite: false, background: 'bg-1.jpg'},
    {id: 2, title: 'Board-2', isFavorite: false, background: 'bg-2.jpg'},
    {id: 3, title: 'Board-3', isFavorite: false, background: 'bg-3.jpg'},
    {id: 4, title: 'Board-4', isFavorite: false, background: 'bg-1.jpg'},
  ]
  favorites: Board[] = []

  constructor() { }

  getBoards(): Observable<Board[]> {
    return of(this.boards);
  }

  addBoard(title: string) {
    let newBoard: Board = {
      id: this.boards.length + 1,
      title: title,
      isFavorite: false,
      background: "bg-1.jpg",
    };
    this.boards.push(newBoard);
  } 

  getFavorites(): void {
    this.favorites = this.boards.filter((el) => el.isFavorite);
  }

  addToFavorites(id: number): void {
    this.boards[id - 1].isFavorite = !this.boards[id - 1].isFavorite;
    this.getFavorites();
  }
}
