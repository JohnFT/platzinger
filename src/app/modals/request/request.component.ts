import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from 'src/app/interfaces/user';
import { statusRequest, Request } from 'src/app/interfaces/request';
import { RequestsService } from 'src/app/services/requests.service';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserModel } from 'src/app/models/user.model';

@Component({
    selector: 'app-request-modal',
    templateUrl: './request.component.pug',
    styleUrls: ['./request.component.pug']
})
export class RequestModalComponent implements OnInit, OnDestroy {
    public user: User;
    public friend: User;
    public data: any;
    private destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private dialogRef: MatDialogRef<RequestModalComponent>,
        @Inject(MAT_DIALOG_DATA) data: any,
        private _requestService: RequestsService,
        private _userService: UserService) {
        this.data = data;
        this.user = data.user;
        this.friend = new UserModel();
    }

    ngOnInit() {
        if (this.data) {
            this._userService.getUserById(this.data.request.sender).pipe(
                takeUntil(this.destroy$)
            ).subscribe(user => {
                this.friend = user;
            });
        }
    }

    close(status: statusRequest) {
        this.data.request.status = status;
        this._requestService.editUser(this.data.request).then((res) => {
            this._userService.addFriend(this.user.uid, this.friend.uid).then(resp => {
                Swal('Congratulation', `the user ${this.friend.nick} is ${status}`, 'success');
                this.dialogRef.close();
            }).catch(err => Swal('Error', `error on the request ${err}`, 'error'));
        }).catch(err => Swal('Error', `error on the request ${err}`, 'error'));
    }

    ngOnDestroy() {
        this.destroy$.next(true);
    }
}
