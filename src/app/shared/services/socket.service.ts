import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {io, Socket} from 'socket.io-client';
import {Messages} from '../../app.constants';
import {environment} from '../../../environments/environment';
import {Card} from '../../models/card';
import {ColumnInterface} from '../../interfaces/column.interface';
import {Column} from "../../models/column";
import {CardInterface} from "../../interfaces/card.interface";

@Injectable()
export class WebsocketService {
    public readonly socket: Socket;

    public message$: BehaviorSubject<string> = new BehaviorSubject('');

    constructor() {
        this.socket = io(environment.serverAPI, {
            transports: ['websocket']
        });

        this.socket.on(Messages.connect, (callback) => {
            console.log('connect to Websocket', this.socket.id);
        })

        this.socket.on(Messages.connectError, () => {
            console.log('connect_error to Websocket', this.socket.id);
        })

        this.socket.on(Messages.disconnect, (reason) => {
            console.log('disconnect from Websocket', reason);
            if (reason === 'io server disconnect') {
                this.socket.connect();
            }
        })
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }

    sendMessage(msg: string): void {
        if (this.socket.connected) {
            this.socket.emit(Messages.sendMessage, msg); // this.socket.volatile.emit
        }
    }

    createRoom(): void {
        console.log(Messages.createRoom)
        if (this.socket.connected) {
            this.socket.emit(Messages.createRoom);
            console.log('After emit', Messages.createRoom)
        }
    }

    onNewColumn(): Observable<ColumnInterface> {
        return new Observable(observer => {
            this.socket.on(Messages.newColumn, msg => {
                observer.next(msg);
            });
        });
    }

    newCard(card: Card):any {
        console.log(Messages.newCard, card);
        if (this.socket.connected) {
            this.socket.emit(Messages.newCard, card);
        }
    }

    deleteCard(cardId: string): void {
        console.log(Messages.deleteCard, cardId);
        if (this.socket.connected) {
            this.socket.emit(Messages.deleteCard, cardId);
        }
    }

    newColumn(column: ColumnInterface): void {
        console.log(Messages.newColumn, column);
        if (this.socket.connected) {
            this.socket.emit(Messages.newColumn, column);
        }
    }

    updateColumn(column: ColumnInterface): void {
        console.log(Messages.updateColumn, column);
        if (this.socket.connected) {
            this.socket.emit(Messages.updateColumn, column);
        }
    }

    deleteColumn(columnId: string): void {
        console.log(Messages.deleteColumn, columnId);
        if (this.socket.connected) {
            this.socket.emit(Messages.deleteColumn, columnId);
        }
    }
}
