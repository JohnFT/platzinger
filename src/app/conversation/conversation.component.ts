import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';
import { Subscription } from 'rxjs';
import { ConversationService } from '../services/conversation.service';
import Swal from 'sweetalert2';
import { Message } from '../interfaces/message';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit, OnDestroy {

  public friend: User;
  public user: User;
  public textMessage: string;
  public messages: Message[] = [];
  public shake = false;
  private friendId: string;
  private conversationId: string;
  private _subscribe: Subscription = new Subscription();
  constructor(private _activatedRouter: ActivatedRoute,
    private _consversationService: ConversationService,
    private _userService: UserService) {

    this.friendId = this._activatedRouter.snapshot.params['id'];

  }

  ngOnInit() {

    this._userService.isAuth().subscribe(status => {

      this._userService.getUserById(status.uid).subscribe(user => {

        this.user = user;

        this._subscribe = this._userService.getUserById(this.friendId).subscribe(response => {

          this.friend = response;
          const ids = [this.friend.uid, this.user.uid].sort();
          this.conversationId = ids.join('|');
          this.getConversation(this.conversationId);
        });

      });

    });
  }

  private getConversation(uid: string) {
    this._consversationService.getConversation(uid).subscribe((messages: any[]) => {
      this.messages = messages || [];
      this.messages.forEach(message => {
        if (message.seen) {
          return;
        }
        message.seen = true;
        this._consversationService.editConversation(message);

        if (message.type === 'text') {
          const audio = new Audio('assets/sound/new_message.m4a');
          audio.play();
          return;
        }

        this.doZumbido();

      });
    });
  }

  public sendMessage() {

    const message: Message = {
      uid: this.conversationId,
      timestamp: Date.now().toString(),
      text: this.textMessage,
      sender: this.user.uid,
      reciver: this.friend.uid,
      seen: false,
      type: 'text'
    };

    this._consversationService.createConversation(message)
      .then(res => {
        this.textMessage = '';
      })
      .catch(err => Swal('Error', 'Error Send Message', 'error'));
  }


  public sendZumbido() {

    const message: Message = {
      uid: this.conversationId,
      timestamp: Date.now().toString(),
      text: null,
      sender: this.user.uid,
      reciver: this.friend.uid,
      seen: false,
      type: 'zumbido'
    };

    this._consversationService.createConversation(message)
      .then(res => { })
      .catch(err => Swal('Error', 'Error Send Message', 'error'));

    this.doZumbido();
  }

  private doZumbido() {
    const audio = new Audio('assets/sound/zumbido.m4a');
    audio.play();
    this.shake = true;

    window.setTimeout(() => {
      this.shake = false;
    }, 1000);
  }

  getNickName(uid) {
    return this.user.uid === uid ? this.user.nick : this.friend.nick;
  }

  ngOnDestroy() {
    this._subscribe.unsubscribe();
  }
}
