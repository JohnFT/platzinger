import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _userService: UserService, private _router: Router) { }

  canActivate(next) {
    return this._userService.isAuth().pipe(
      map(auth => {
        if (!auth) {
          this._router.navigate(['signin']);
        }
        return !!auth;
      })
    );
  }

}
