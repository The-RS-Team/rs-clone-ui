import {UserInterface} from '../interfaces/user.interface';

export class User implements UserInterface {
    user_id: string;
    name: string;
    email: string;
    picture: string;
    iss: string;
    aud: string;


    constructor(user_id: string, email: string, name: string, picture: string, iss: string, aud: string) {
        this.user_id = user_id;
        this.name = name;
        this.email = email;
        this.picture = picture;
        this.iss = iss;
        this.aud = aud;
    }
}
