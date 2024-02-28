export interface IUser {
    username: string;
    password: string;
    token: string;
    role: string;
    displayName: string;
    googleId?: string;
    image: string | null;
}

export interface IPost {
    title: string;
    description: string;
    image: string | null;
    date: string;
}

export interface UserFields {
    username: string,
    password: string,
    token: string,
}

interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}

type UserModel = Model<UserFields, {}, UserMethods>;