import { Injectable } from '@angular/core';
import { Observable, defer, BehaviorSubject, throwError } from 'rxjs';
import { of } from 'rxjs';

import { TurnosModule } from '../turnos/turnos.module';
import { TurnoDisponible } from '../turnos/models/TurnoDisponible';
import { TurnoDto } from '../turnos/models/TurnoDto';
import { Doctor } from '../turnos/models/Doctor';
import { Servicio } from '../turnos/models/Servicio';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, reduce, find, catchError } from 'rxjs/operators';
import { Paciente } from '../turnos/models/Paciente';
import { TurnoConfirm } from '../turnos/models/TurnoConfirm';
import { Turno } from '../turnos/models/Turno';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  user$ = new BehaviorSubject<Paciente>(new Paciente(0, '', ''));

  nuevoDni = '';

  turnoNuevo = new TurnoDto(0, 0, 0, 0);

  turnoId = 0;

  // servicioId = 0;

  // doctorId = 0;

  turnoConfirm = new TurnoConfirm('', '', '', '');

  turnosDisponibles = new BehaviorSubject<TurnoDisponible[]>([]);

  constructor(private http: HttpClient) {
    const user: Paciente = JSON.parse(localStorage.getItem('user'));

    if (user !== null) {
      this.user$.next(user);
    }
  }

  getTurnos(): Observable<Turno[]> {
    return this.http.get<Turno[]>(environment.turnosUrl + 'asignados');
  }

  getTurnosDisponiblesByServicio(servicioId: number): Observable<TurnoDisponible[]> {
    return this.http.get<TurnoDisponible[]>(environment.turnosUrl + 'disponibles/servicios/' + servicioId);
  }

  getTurnosDisponiblesByServicioDoctor(servicioId: number, doctorId: number): Observable<TurnoDisponible[]> {
    return this.http.get<TurnoDisponible[]>(environment.turnosUrl + 'disponibles/servicios/' + servicioId + '/doctores/' + doctorId);
  }

  getDoctores(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(environment.turnosUrl + 'doctores');
  }

  getDoctoresByServicio(servicioId: number): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(environment.turnosUrl + 'servicios/' + servicioId + '/doctores');
  }

  getServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(environment.turnosUrl + 'servicios');
  }

  getServiciosByDoctor(doctorId: number): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(environment.turnosUrl + 'doctores/' + doctorId + '/servicios');
  }

  getPaciente(numeroDocumento: string): Observable<Paciente> {
    return this.http.get<Paciente>(environment.turnosUrl + 'pacientes?dni=' + numeroDocumento);
  }

  getPacienteByEmail(email: string): Observable<Paciente> {
    return this.http.get<Paciente>(environment.turnosUrl + 'pacientes?email=' + email);
  }

  putTurno(turnoNuevo: TurnoDto) {
    return this.http.put(environment.turnosUrl + turnoNuevo.turnoId, turnoNuevo)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  deleteTurno(turnoId: number) {
    return this.http.delete(environment.turnosUrl + turnoId);
  }

  existRelacionDocumento(numero: string): Observable<boolean> {
    return this.http.get<boolean>(environment.loginUrl + 'relacion-documento?numero=' + numero).pipe(
      map(result => {
        return result;
      }));
  }

  existPaciente(dni: string): Observable<boolean> {
    return this.http.get<boolean>(environment.loginUrl + 'pacientes?dni=' + dni).pipe(
      map(result => {
        return result;
      }));
  }

  postEmailDNI(numberDocumento: string, email: string) {
    return this.http.post(environment.loginUrl + 'nuevo-usuario', { dni: numberDocumento, email });
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(error.error);
  }
}

