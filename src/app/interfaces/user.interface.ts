export interface UserInterface {
    user_id: string;
    email: string | null;
    name: string | null;
    picture: string | null;
    nickname: string | null;
    lang: string | null;
    isOwner?: boolean;
}
