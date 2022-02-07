export interface UserInterface {
    user_id: string;
    email: string;
    name: string;
    picture: string;
    iss: string;
    aud: string;
}

interface UserInfo1 {
    displayName: string | null;
    email: string | null;
    phoneNumber: string | null;
    photoURL: string | null;
    providerId: string;
    uid: string;
}
