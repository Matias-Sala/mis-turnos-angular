import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';

import { SignInComponent } from './login/sign-in/sign-in.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { DniVerifyComponent } from './login/dni-verify/dni-verify.component';

const redirectLoggedInToTurnos = () => redirectLoggedInTo(['turnos']);

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  {
    path: 'sign-in', component: SignInComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToTurnos }
  },
  {
    path: 'register-user', component: SignUpComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToTurnos }
  },
  // { path: 'dashboard', component: DashboardComponent },
  {
    path: 'forgot-password', component: ForgotPasswordComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToTurnos }
  },
  {
    path: 'verify-user', component: DniVerifyComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToTurnos }
  },
  {
    path: 'turnos',
    loadChildren: () => import('./turnos/turnos.module').then(mod => mod.TurnosModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
