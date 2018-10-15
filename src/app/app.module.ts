import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Modules
import { AppRouitngModule } from './app-rouitng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule, } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ImageCropperModule } from 'ngx-image-cropper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Component
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ProfileComponent } from './profile/profile.component';
import { MenuComponent } from './menu/menu.component';
import { SearchPipe } from './pipes/search';
import { environment } from 'src/environments/environment';
import { RegisterComponent } from './register/register.component';
import { UserService } from './services/user.service';
import { RequestComponent } from './home/request/request.component';
import {
  MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule, MatInputModule,
  MatButtonModule, MatSelectModule, MatIconModule
} from '@angular/material';
import { RequestModalComponent } from './modals/request/request.component';
import { ContactComponent } from './home/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    HomeComponent,
    ConversationComponent,
    ProfileComponent,
    MenuComponent,
    RegisterComponent,
    RequestComponent,
    ContactComponent,
    RequestModalComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRouitngModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    ImageCropperModule
  ],
  entryComponents: [
    RequestComponent,
    RequestModalComponent
  ],
  providers: [
    UserService,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }],
  bootstrap: [AppComponent]
})
export class AppModule { }
