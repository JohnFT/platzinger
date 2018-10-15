export type userStatus = 'online' | 'offline' | 'desconected';

export interface User {
    nick: string;
    age?: number;
    active: boolean;
    status: userStatus;
    email: string;
    uid?: any;
    password: string;
    avatar?: string;
    friends?: any;
}
