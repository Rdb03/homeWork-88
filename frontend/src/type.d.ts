export interface IUser {
    _id: string;
    username: string;
    password: string;
    token: string;
}

export interface RegisterResponse {
    user: User;
    message: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _message: string;
}

export interface RegisterMutation {
    username: string;
    password: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface GlobalError {
    error: string;
}

export interface IPost {
    _id: string;
    description: string;
    image: string | null;
    title: string;
    date: string;
    user: {
        _id: string;
        username: string
    }
}

export interface IInfo {
    title: string;
    description: string;
    date: string;
    user: {
        _id: string;
        username: string
    }
}

export interface IComment {
    title: string;
    user: {
        _id: string;
        username: string;
    };
    post: string;
}

export interface CommentMutation {
    title: string;
    post: string;
}

export interface PostMutation {
    title: string;
    description: string;
    image: File | null;
}
