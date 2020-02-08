import { Component, OnInit } from '@angular/core';
import { Turno } from '../models/Turno';
import { Router } from '@angular/router';
import { TurnosService } from '../../shared/turnos.service';

@Component({
  selector: 'app-turno-list',
  templateUrl: './turno-list.component.html',
  styleUrls: ['./turno-list.component.scss']
})
export class TurnoListComponent implements OnInit {

  turnos: Turno[] = [];

  constructor(private turnoSvc: TurnosService, private router: Router) { }

  ngOnInit() {
    this.turnoSvc.getTurnos().subscribe(turnos => this.turnos = turnos);
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  cancelarTurno(turnoId: number) {
    this.turnoSvc.deleteTurno(turnoId);
  }
}

