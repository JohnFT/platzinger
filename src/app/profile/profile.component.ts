import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { UserModel } from '../models/user.model';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { ImageCroppedEvent } from 'ngx-image-cropper/src/image-cropper.component';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public user: User;
  private _subsrcibe: Subscription = new Subscription();

  public imageChangedEvent: any = '';
  public croppedImage: any = '';
  public picture: any;

  constructor(private _userService: UserService,
    private _afStorage: AngularFireStorage) {
    this.user = new UserModel();
  }

  ngOnInit() {
    this._subsrcibe = this._userService.isAuth().subscribe(status => {
      this._userService.getUserById(status.uid).subscribe(user => {
        this.user = user;
      });
    });
  }

  public fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  public imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  public imageLoaded() {
    // show cropper
  }
  public loadImageFailed() {
    // show message
  }

  public onEditing() {
    if (!this.croppedImage) {

      this._userService.editUser(this.user).then(res => {

        Swal('Felicidades', 'se actualizo el usuario', 'success');

      }).catch(err => Swal('Error', 'no hemos podido actualizar el usuario intente luego', 'error'));

      return;
    }

    const pictureId = Date.now();
    const picture = this._afStorage.ref(`pictures/${pictureId}.jpg`)
      .putString(this.croppedImage, 'data_url');

    picture.then(res => {

      this.picture = this._afStorage.ref(`pictures/${pictureId}.jpg`).getDownloadURL();
      this.picture.subscribe(url => {
        this.user.avatar = url;
        this._userService.editUser(this.user)
          .then(response => {
            Swal('Felicidades', 'se actualizo el usuario', 'success');
          }).catch(err => {
            Swal('Error', 'no hemos podido actualizar el usuario intente luego', 'error');
          });

      });
    }).catch(err => Swal('Error', 'no hemos podido actualizar la imagen de usuario intente luego', 'error'));

  }

  ngOnDestroy() {
    this._subsrcibe.unsubscribe();

  }

}
