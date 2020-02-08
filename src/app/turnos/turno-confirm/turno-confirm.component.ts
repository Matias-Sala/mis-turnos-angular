import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TurnosService } from '../../shared/turnos.service';
import { TurnoConfirm } from '../models/TurnoConfirm';
import { Router } from '@angular/router';

@Component({
  selector: 'app-turno-confirm',
  templateUrl: './turno-confirm.component.html',
  styleUrls: ['./turno-confirm.component.scss']
})
export class TurnoConfirmComponent implements OnInit {

  turnoConfirm: TurnoConfirm;

  @Output() errorEvent = new EventEmitter();

  constructor(private turnoSvc: TurnosService, private route: Router) { }

  ngOnInit() {
    this.turnoConfirm = this.turnoSvc.turnoConfirm;
  }

  confirmarTurno() {
    this.turnoSvc.putTurno(this.turnoSvc.turnoNuevo).subscribe(
      result => {
        this.route.navigate(['turnos']);
      },
      error => {
        alert(error);
        this.errorEvent.emit();
      }
    );
  }
}
