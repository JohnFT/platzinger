import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { User } from '../interfaces/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public forma: FormGroup;

  constructor(private _userService: UserService,
    private _formBuild: FormBuilder,
    private _router: Router) { }

  ngOnInit() {
    this.forma = this._formBuild.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public onSubmit() {
    if (this.forma.invalid) {
      return;
    }
    const user: User = { ...this.forma.value, nick: null };
    this._userService.signin(user)
      .then(res => {
        this._userService.getUserById(res.user.uid).subscribe(reponse => {
          this._router.navigate(['/home']);
        });
      }).catch(err => Swal('Error SignIn User', err.message, 'error'));
  }

  public signInFacebook() {
    this._userService.facebookSignIn()
      .then(res => {
        if (!res.additionalUserInfo.isNewUser) {
          this._router.navigate(['/home']);
          return;
        }
        const user: User = {
          uid: res.user.uid,
          email: res.user.email,
          status: 'online',
          active: true,
          nick: res.user.displayName,
          password: '134567'
        };
        this._userService.addUser(user).then(respnse => {
          Swal('Felicidades', `usuario ${user.nick} creado`, 'success');
          this._router.navigate(['home']);
        }).catch(err => Swal('Error create user', err.message, 'error'));

      }).catch(err => Swal('Error SignIn  Facebook', err.message, 'error'));
  }

}
