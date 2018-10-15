import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Request } from '../interfaces/request';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private _afDb: AngularFirestore) { }

  public createRequest(request: Request) {
    const cleanEmail = request.reciver_email.replace('.', ',');
    return this._afDb.doc(`request/friends/${cleanEmail}/${request.sender}`).set(request);
  }

  public editUser(request: Request) {
    const cleanEmail = request.reciver_email.replace('.', ',');
    return this._afDb.doc(`request/friends/${cleanEmail}/${request.sender}`).set(request);
  }


  public getRequestForEmail(email: string): Observable<Request[]> {
    const cleanEmail = email.replace('.', ',');
    return this._afDb.collection<Request>(`request/friends/${cleanEmail}`).valueChanges();
  }
}
