import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TurnoListComponent } from './turno-list/turno-list.component';
import { TurnosRoutingModule } from './turnos-routing.module';
import { MaterialModule } from '../shared/material.module';
import { ServiciosDoctoresComponent } from './servicios-doctores/servicios-doctores.component';
import { PacienteSelectComponent } from './paciente-select/paciente-select.component';
import { TurnoNewComponent } from './turno-new/turno-new.component';
import { TurnoSelectComponent } from './turno-select/turno-select.component';
import { TurnoConfirmComponent } from './turno-confirm/turno-confirm.component';
import { TurnoSidenavComponent } from './turno-sidenav/turno-sidenav.component';

@NgModule({
  declarations: [
    TurnoListComponent,
    ServiciosDoctoresComponent,
    PacienteSelectComponent,
    TurnoNewComponent,
    TurnoSelectComponent,
    TurnoConfirmComponent,
    TurnoSidenavComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    TurnosRoutingModule
  ],
  providers: [DatePipe]
})
export class TurnosModule { }
