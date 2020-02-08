import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { TurnosService } from 'src/app/shared/turnos.service';
import { of, from } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss', '../login.scss']
})
export class SignInComponent implements OnInit {

  hide = true;

  constructor(  // Inject Firestore service
    public afAuth: AngularFireAuth,
    private route: Router,
    private turnoSvc: TurnosService
  ) { }

  ngOnInit() { }

  login(email, password) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then((result) => {
      this.turnoSvc.getPacienteByEmail(result.user.email).subscribe(paciente => {
        localStorage.setItem('user', JSON.stringify(paciente));
        this.turnoSvc.user$.next(paciente);
      });
      this.route.navigate(['turnos']);
    }).catch((error) => {
      switch (error.code) {
        case 'auth/user-not-found':
          window.alert(
            'No hay registro del usuario correspondiente a este email. El usuario puede haber sido eliminado.'
          );
          break;

        case 'auth/wrong-password':
          window.alert(
            'La contraseña no es válida.'
          );
          break;
        default:
          window.alert(error.message);
          break;
      }
    });
  }
}
