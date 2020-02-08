import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TurnosService } from '../../shared/turnos.service';
import { TurnoDisponible } from '../models/TurnoDisponible';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Observable, BehaviorSubject } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-turno-select',
  templateUrl: './turno-select.component.html',
  styleUrls: ['./turno-select.component.scss', '../turnos.scss']
})
export class TurnoSelectComponent implements OnInit {

  horasDisponibles: string[];

  turnos: TurnoDisponible[] = [];

  turnoFormGroup = new FormGroup({
    fechas: new FormControl(Date.now, Validators.required),
    horas: new FormControl(null, Validators.required)
  });

  constructor(public turnoSvc: TurnosService, private datePipe: DatePipe) { }

  ngOnInit() {

    this.turnoSvc.turnosDisponibles.subscribe(turnos => {
      this.turnos = turnos;
      this.horasDisponibles = [];
      this.turnoFormGroup.setValue({
        fechas: null,
        horas: null
      });
    });
  }

  myFilter = (d: Date): boolean => {
    const day = d.getDate();
    // Prevent Saturday and Sunday from being selected.
    // return day !== 0 && day !== 6;

    return this.turnos.some(t => new Date(t.fecha).getTime() === d.getTime());
  }

  dateSelected(event: MatDatepickerInputEvent<Date>) {
    this.horasDisponibles = this.turnos.filter(f => new Date(f.fecha).getTime() === event.value.getTime()).map(turno => turno.hora);
  }


  seleccionarTurno(hora: string) {
    const turnoSelect = this.turnos.find(turno =>
      new Date(turno.fecha).getTime() === this.turnoFormGroup.get('fechas').value.getTime() && turno.hora === hora);

    this.turnoSvc.turnoNuevo.turnoId = turnoSelect.id;
    this.turnoSvc.turnoConfirm.doctor = turnoSelect.doctor;
    this.turnoSvc.turnoConfirm.turno = this.datePipe.transform(turnoSelect.fecha, 'dd/MM/yyyy') + ' a las ' + turnoSelect.hora;
  }

  onSubmit() {
    // const turnoSelect = this.turnos.find(turno =>
    //   new Date(turno.fecha).getTime() === this.turnoFormGroup.get('fechas').value.getTime() &&
    //   this.turnoFormGroup.get('horas').value);
    // this.turnoSvc.turnoNuevo.turnoId = turnoSelect.id;

    // this.turnoSvc.turnoConfirm.turno = turnoSelect.fecha.toLocaleString('es-ES') + ' a las ' + turnoSelect.hora;
  }

}
