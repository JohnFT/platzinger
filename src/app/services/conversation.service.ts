import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Message } from '../interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private _afDB: AngularFirestore) { }

  public createConversation(conversation: Message) {
    return this._afDB.doc(`conversations/${conversation.uid}/messages/${conversation.timestamp}`)
      .set({ ...conversation });
  }

  public editConversation(conversation: Message) {
    return this._afDB.doc(`conversations/${conversation.uid}/messages/${conversation.timestamp}`)
      .set({ ...conversation });
  }

  public getConversation(uid: string) {
    return this._afDB.collection(`conversations/${uid}/messages`).valueChanges();
  }
}
