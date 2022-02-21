import {Injectable} from '@angular/core';
import {io, Socket} from 'socket.io-client';
import {Messages} from '../../app.constants';
import {environment} from '../../../environments/environment';
import {EventsMap} from 'socket.io/dist/typed-events';
import {AuthService} from '../../auth/auth.service';

@Injectable()
export class WebsocketService {
    readonly socket: Socket;

    constructor(private readonly authService: AuthService) {
        this.socket = io(environment.serverAPI, {
            transports: ['websocket']
        });

        this.socket.on(Messages.connect, _ => {
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
            const obj: { [k: string]: any } = {};
            Object.defineProperty(obj,
                'userId', {
                    value: this.authService.currentUser?.user_id,
                    writable: true,
                    enumerable: true
                });
            if (typeof eventObject === 'object' && eventObject !== null) {
                Object.assign(obj, eventObject);
            } else {
                obj['id'] = eventObject;
            }
            // console.log('socket emit:', eventName, obj)
            this.socket.emit(eventName, obj);
        }
    }

    removeAllListeners(): void {
        if (this.socket.connected) {
            this.socket.removeAllListeners();
        }
    }

    removeListener(message:string): void {
        if (this.socket.connected) {
            this.socket.removeListener(message);
        }
    }

    createRoom(roomName: string): void {
        console.log(Messages.createRoom)
        this.socket.emit(Messages.createRoom);
    }
}
