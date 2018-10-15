import { User, userStatus } from '../interfaces/user';

export class UserModel implements User {
    public active: boolean;
    public age?: number;
    public email: string;
    public nick: string;
    public password: string;
    public status: userStatus;
    public uid: string;
    public avatar: string;
    public friends: any;

    constructor(active: boolean = true,
        age?: number,
        email: string = null,
        nick: string = null,
        password: string = null,
        status: userStatus = 'online',
        avatar?: null,
        uid: string = null,
        friends?: any) {

        this.active = active;
        this.age = age;
        this.email = email;
        this.nick = nick;
        this.password = password;
        this.status = status;
        this.uid = uid;
        this.avatar = avatar;
        this.friends = friends || [];
    }
}
