import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { UserModel } from 'src/app/models/user.model';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.pug',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    @Input() uid: string;
    public contact: User;
    constructor(private _userService: UserService) {
        this.contact = new UserModel();
    }

    ngOnInit() {
        this._userService.getUserById(this.uid).subscribe(user => {
            this.contact = user;
        });
    }
}
