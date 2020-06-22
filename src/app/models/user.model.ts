export interface User {
    id?: string;
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    content?: string[];
    following?: string[];
    followers?: string[];
    hasChannel?: boolean;
    isVerified?: boolean;
}
