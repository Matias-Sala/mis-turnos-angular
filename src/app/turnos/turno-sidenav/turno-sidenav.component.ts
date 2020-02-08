import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Paciente } from '../models/Paciente';
import { TurnosService } from 'src/app/shared/turnos.service';

@Component({
  selector: 'app-turno-sidenav',
  templateUrl: './turno-sidenav.component.html',
  styleUrls: ['./turno-sidenav.component.scss']
})
export class TurnoSidenavComponent implements OnInit {

  isSmallScreen: boolean;
  user = new Paciente(0, '', '');

  constructor(
    public turnoSvc: TurnosService,
    public afAuth: AngularFireAuth,
    private breakpointObserver: BreakpointObserver,
    private router: Router) { }

  ngOnInit() {

    this.turnoSvc.user$.subscribe(user => this.user = user);

    this.breakpointObserver
      .observe([
        Breakpoints.XSmall
      ]).subscribe(result => {
        if (result.matches) {
          this.isSmallScreen = true;
        } else {
          this.isSmallScreen = false;
        }
      });
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      localStorage.clear();
      this.router.navigate(['sign-in']);
    });
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
