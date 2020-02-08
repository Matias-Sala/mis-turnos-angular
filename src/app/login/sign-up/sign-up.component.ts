import { Component, OnInit } from '@angular/core';
import { TurnosService } from 'src/app/shared/turnos.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss', '../login.scss']
})
export class SignUpComponent implements OnInit {

  success: boolean;
  error: string;
  submitted = false;
  hide = true;
  matcher = new MyErrorStateMatcher();

  formGrp: FormGroup;

  constructor(
    public afAuth: AngularFireAuth,
    private turnoSvc: TurnosService,
    private route: Router,
    private formBuilder: FormBuilder
  ) {

    if (turnoSvc.nuevoDni === '') {
      route.navigate(['verify-user']);
    }

    this.formGrp = formBuilder.group(
      {
        email: new FormControl('', [
          Validators.email,
          Validators.required
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$')
        ]),
        confirmPassword: new FormControl('', Validators.required)
      },
      { validators: this.checkPasswords });
  }

  ngOnInit() {
  }

  signUp() {
    this.afAuth.auth.createUserWithEmailAndPassword(
      this.formGrp.controls.email.value,
      this.formGrp.controls.password.value
    ).then((result) => {
      this.turnoSvc.postEmailDNI(
        this.turnoSvc.nuevoDni,
        this.formGrp.controls.email.value
      ).subscribe(() => {
        this.turnoSvc.getPacienteByEmail(result.user.email).subscribe(paciente => {
          this.turnoSvc.user$.next(paciente);
        });
      });
      this.route.navigate(['turnos']);
    }).catch((error) => {
      switch (error.code) {
        case 'auth/email-already-in-use':
          window.alert('La dirección de correo electrónico ya está en uso por otra cuenta.');
          break;

        default:
          window.alert(error.message);
          break;
      }
    });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}
