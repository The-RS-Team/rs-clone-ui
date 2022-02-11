import {Injectable} from '@angular/core';
import {io, Socket} from 'socket.io-client';
import {Messages} from '../../app.constants';
import {environment} from '../../../environments/environment';
import {EventsMap} from 'socket.io/dist/typed-events';

@Injectable()
export class WebsocketService {
    private readonly socket: Socket;

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

    on(eventName: string, listener: any): void {
        this.socket.on(eventName, listener)
    };

    emit(eventName: string, eventObject: EventsMap | string): void {
        if (this.socket.connected) {
            this.socket.emit(eventName, eventObject);
        }
    }

    removeAllListeners(): void {
        if (this.socket.connected) {
            this.socket.removeAllListeners();
        }
    }

    createRoom(roomName: string): void {
        console.log(Messages.createRoom)
        this.socket.emit(Messages.createRoom);
    }

}
