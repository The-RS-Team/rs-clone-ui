import {InviteInterface} from '../interfaces/invite.interface';

export class Invite implements InviteInterface {
    id?: string;
    email: string;
    boardId: string;
    expireDate?: Date;

    constructor(email: string, boardId: string) {
        this.email = email;
        this.boardId = boardId;
    }
}
