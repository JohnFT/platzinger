import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { RequestsService } from './services/requests.service';
import { User } from './interfaces/user';
import { Request } from './interfaces/request';
import { switchMap, takeUntil, filter, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { RequestModalComponent } from './modals/request/request.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public user: User;
  public requests: Request[] = [];
  public requestShow: Request[] = [];
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private _userService: UserService,
    public router: Router,
    private _requestService: RequestsService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this._userService.isAuth().pipe(
      takeUntil(this.destroy$),
      filter(auth => !!auth),
      switchMap(auth => {
        return this._userService.getUserById(auth.uid);
      })
    ).pipe(
      takeUntil(this.destroy$),
      switchMap(user => {
        this.user = user;
        return this._requestService.getRequestForEmail(this.user.email);
      })
    ).pipe(
      takeUntil(this.destroy$),
      map((requests: Request[]) => {
        return requests.filter(request => request.status === 'pending');
      }),
      map((requests: Request[]) => {
        return requests.filter(request => !this.requestShow.find(req => req.sender === request.sender));
      })
    ).subscribe((request: Request[]) => {
      this.requests = request;
      this.requests.forEach(req => {
        const dialogRef = this.dialog.open(RequestModalComponent, {
          height: 'auto',
          width: '600px',
          hasBackdrop: true,
          autoFocus: true,
          data: { request: req, user: this.user }
        });
      });
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
