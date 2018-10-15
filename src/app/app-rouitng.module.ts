import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ConversationComponent } from './conversation/conversation.component';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth/auth-guard.ts.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'conversation/:id', component: ConversationComponent, canActivate: [AuthGuard] },
  { path: 'signin', component: SigninComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'signin' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRouitngModule { }
