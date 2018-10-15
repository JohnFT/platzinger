import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public forma: FormGroup;
  constructor(private _userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.forma = this.formBuilder.group({
      email: ['', Validators.required],
      nick: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit() {

    if (this.forma.invalid) {
      return;
    }

    const user: User = { ...this.forma.value, status: 'online', active: true };
    this._userService.createUser(user);
    this.forma.reset();
  }

}
