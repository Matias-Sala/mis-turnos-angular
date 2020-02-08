import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { TurnosService } from '../../shared/turnos.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-paciente-select',
  templateUrl: './paciente-select.component.html',
  styleUrls: ['./paciente-select.component.scss', '../turnos.scss']
})
export class PacienteSelectComponent implements OnInit {

  pacienteFormGroup = new FormGroup({
    numeroDocumento: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.min(11),
    ]),
    nombre: new FormControl(null),
    id: new FormControl(null, Validators.required)
  });

  matcher = new MyErrorStateMatcher();

  constructor(private turnoSvc: TurnosService) { }

  ngOnInit() {
  }

  getPaciente(pacienteData) {
    this.turnoSvc.getPaciente(pacienteData.numeroDocumento).subscribe(paciente => {
      if (paciente === undefined) {
        alert('No hay pacientes registrados con ese número de documento, por favor dirijace hasta el hospital para darse de alta.');
        this.pacienteFormGroup.patchValue({
          nombre: null,
          id: null
        });
      } else {
        this.pacienteFormGroup.patchValue({
          nombre: paciente.nombre,
          id: paciente.id
        });
        this.turnoSvc.turnoNuevo.pacienteId = paciente.id;
        this.turnoSvc.turnoNuevo.usuarioId = 1;
        this.turnoSvc.turnoConfirm.paciente = paciente.nombre;
      }
    });
  }
  onSummit() {
  }
}
