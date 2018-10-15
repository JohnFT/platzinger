import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';
import { Request } from '../interfaces/request';
import { MatDialog } from '@angular/material';
import { RequestComponent } from './request/request.component';
import { Subject } from 'rxjs';
import { RequestsService } from '../services/requests.service';
import { switchMap, takeUntil, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public user: User;
  public search = '';
  private destroy$ = new Subject();

  constructor(private _userService: UserService,
    private dialog: MatDialog,
    private _requestService: RequestsService) {
    this.user = new UserModel();
  }

  ngOnInit() {

    this._userService.isAuth().pipe(
      takeUntil(this.destroy$),
      switchMap(data => {
        return data ? this._userService.getUserByIdFriends(data.uid) : null;
      }),
    ).subscribe((user: User) => {
      this.user = user;
    });
  }

  public openRequest() {

    const dialogRef = this.dialog.open(RequestComponent, {
      height: 'auto',
      width: '600px',
      hasBackdrop: true,
      autoFocus: true
    });

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(result => {
        const reques: Request = {
          reciver_email: result,
          sender: this.user.uid,
          status: 'pending',
          timestamp: Date.now()
        };
        this._requestService.createRequest(reques)
          .then(res => {
            Swal('Congratulation', 'sended user request', 'success');
          })
          .catch(res => Swal('Error', 'sended user request', 'error'));
      });
  }

  public signOut() {
    this._userService.signOut();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
