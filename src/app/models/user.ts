import {UserInterface} from '../interfaces/user.interface';

export class User implements UserInterface {
    user_id: string;
    name: string | null;
    email: string | null;
    picture: string | null;

    constructor(user_id: string, email: string | null, name: string | null, picture: string | null) {
        this.user_id = user_id;
        this.name = name;
        this.email = email;
        this.picture = picture;
    }
}
