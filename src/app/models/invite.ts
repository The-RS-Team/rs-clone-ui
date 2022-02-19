import {InviteInterface} from '../interfaces/invite.interface';

export class Invite implements InviteInterface {
    id?: string;
    email: string;
    boardId: string;
    expireDate?: Date;
    hostname: string;

    constructor(email: string, boardId: string, hostname: string) {
        this.email = email;
        this.boardId = boardId;
        this.hostname = hostname;
    }
}
