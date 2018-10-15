import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';


@Injectable()
export class UserService {
    constructor(private _afAuth: AngularFireAuth, private _afDB: AngularFirestore,
        private _router: Router) { }

    public getUsers(): Observable<User[]> {
        return this._afDB.collection<User>('users').valueChanges();
    }

    public getUserById(uid: string): Observable<User> {
        return this._afDB.doc<User>(`users/${uid}`).valueChanges();
    }

    public getUserByIdFriends(uid: string): Observable<User> {
        return this._afDB.doc<User>(`users/${uid}`).valueChanges().pipe(
            switchMap(user => {
                return this._afDB.doc(`users/${user.uid}`).collection(`friends`).valueChanges()
                    .pipe(
                        map(friends => {
                            user.friends = friends;
                            return user;
                        })
                    );
            })
        );
    }

    public addUser(user: User) {
        return this._afDB.doc(`users/${user.uid}`).set({ ...user });
    }

    public editUser(user: User) {
        return this._afDB.doc(`users/${user.uid}`).set({ ...user });
    }

    public setAvatar(avatar: string, userId: string) {
        return this._afDB.doc(`users/${userId}`).set(avatar);
    }

    public addFriend(userUid: string, friendUid: string, ) {
        this._afDB.doc(`users/${userUid}/friends/${friendUid}`).set({ uid: friendUid }).catch(err => {
            Swal('Error', `${err.message}`, 'error');
        });
        return this._afDB.doc(`users/${friendUid}/friends/${userUid}`).set({ uid: userUid });
    }
    public createUser(user: User) {
        this._afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
            .then(res => {
                user.uid = res.user.uid;
                this.addUser(user).then(respnse => {
                    Swal('Felicidades', `usuario ${user.nick} creado`, 'success');
                    this._router.navigate(['home']);
                }).catch(err => Swal('Error create user', err.message, 'error'));
            }).catch(err => Swal('Error create user', err.message, 'error'));
    }


    public signin(user: User) {
        return this._afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    }

    public signOut() {
        return this._afAuth.auth.signOut().then(res => {
            this._router.navigate(['signin']);
        });
    }

    public isAuth() {
        return this._afAuth.authState;
    }

    public facebookSignIn() {
        const provider = new firebase.auth.FacebookAuthProvider();
        return this._afAuth.auth.signInWithPopup(provider);

    }

}
