import { Component, OnInit } from '@angular/core';
import { TurnosService } from 'src/app/shared/turnos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dni-verify',
  templateUrl: './dni-verify.component.html',
  styleUrls: ['./dni-verify.component.scss', '../login.scss']
})
export class DniVerifyComponent implements OnInit {

  constructor(private turnoSvc: TurnosService, private route: Router) { }

  ngOnInit() {
  }

  confirmarDni(numero: string) {

    this.turnoSvc.existPaciente(numero).subscribe(exist => {
      if (!exist) {
        window.alert('El numero de documento no es válido, por favor dirijase hasta el hospital para validarlo.');
        return;
      }

      this.turnoSvc.existRelacionDocumento(numero).subscribe(existDni => {
        if (existDni) {
          window.alert('Ya existe una cuenta asociada a ese documento.');
          return;
        } else {
          this.turnoSvc.nuevoDni = numero;
          this.route.navigate(['register-user']);
        }
      });
    });
  }

}
