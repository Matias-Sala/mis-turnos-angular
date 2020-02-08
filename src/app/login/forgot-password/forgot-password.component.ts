import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss', '../login.scss']
})

export class ForgotPasswordComponent implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    private route: Router
  ) { }

  ngOnInit() {
  }

  forgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
        this.route.navigate(['sign-in']);
      }).catch((error) => {
        window.alert(error);
      });
  }

}
