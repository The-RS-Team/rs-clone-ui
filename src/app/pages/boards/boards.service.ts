import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Board} from "../../interfaces/board.interface";
import {List} from "../../interfaces/list.interface";
import {Card} from "../../interfaces/card.interface";

@Injectable({
    providedIn: 'root'
})
export class BoardsService {
    boards: Board[] = [
        {id: 1, title: 'Board-1', isFavorite: false, background: 'bg-1.jpg'},
        {id: 2, title: 'Board-2', isFavorite: false, background: 'bg-2.jpg'},
        {id: 3, title: 'Board-3', isFavorite: false, background: 'bg-3.jpg'},
        {id: 4, title: 'Board-4', isFavorite: false, background: 'bg-1.jpg'},
    ];

    lists: List[] = [
        {id: 1, title: 'List-1', boardId: 1},
        {id: 2, title: 'List-2', boardId: 1},
        {id: 3, title: 'List-3', boardId: 1},
        {id: 1, title: 'List-4', boardId: 2},
        {id: 1, title: 'List-5', boardId: 3},
    ]

    cards: Card[] = [
        {id: 1, description: 'Task1', listId: 1},
        {id: 2, description: 'Task2', listId: 1},
        {id: 3, description: 'Task3 Task3 Task3', listId: 1},
        {id: 1, description: 'Task4 Task4 Task4 Task4 Task4 Task4', listId: 2},
    ]

    favorites: Board[] = []

    constructor() {
    }


    getBoards(): Observable<Board[]> {
        return of(this.boards);
    }

    getLists(): Observable<List[]> {
        return of(this.lists);
    }

    getCards(): Observable<Card[]> {
        return of(this.cards);
    }

    addCard(description: string) {
        let newCard: Card = {
            id: this.cards.length + 1,
            description: description
        };
        this.cards.push(newCard);
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
