import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject, Subject, Observable } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';
import { Doctor } from '../models/Doctor';
import { Servicio } from '../models/Servicio';
import { TurnosService } from '../../shared/turnos.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-servicios-doctores',
  templateUrl: './servicios-doctores.component.html',
  styleUrls: ['./servicios-doctores.component.scss', '../turnos.scss']
})
export class ServiciosDoctoresComponent implements OnInit, AfterViewInit, OnDestroy {

  servicios: Servicio[];
  serviciosDoctor: Servicio[];

  doctores: Doctor[];
  doctoresServicio: Doctor[];

  formGroup = new FormGroup({
    servicio: new FormControl(null, Validators.required),
    doctor: new FormControl()
  });


  /** control for the MatSelect filter keyword */
  public doctoresFilterCtrl: FormControl = new FormControl();
  public serviciosFilterCtrl: FormControl = new FormControl();

  /** list of doctores filtered by search keyword */
  public filteredDoctores: ReplaySubject<Doctor[]> = new ReplaySubject<Doctor[]>(1);
  public filteredServicios: ReplaySubject<Servicio[]> = new ReplaySubject<Servicio[]>(1);

  @ViewChild('serviciosSelect', { static: true }) serviciosSelect: MatSelect;
  @ViewChild('doctoresSelect', { static: true }) doctoresSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected onDestroy = new Subject<void>();
  protected onDestroy2 = new Subject<void>();
  private servicioId = 0;
  private doctorId = 0;

  constructor(private formBuilder: FormBuilder, private turnoSvc: TurnosService) { }

  ngOnInit() {

    this.turnoSvc.getServicios().subscribe((svc) => {
      this.servicios = svc;
      this.filteredServicios.next(this.servicios.slice());
    });

    this.turnoSvc.getDoctores().subscribe((doc: Doctor[]) => {
      this.doctores = doc;
      // load the initial doctores
      this.filteredDoctores.next(this.doctores.slice());

    });

    // listen for search field value changes
    this.doctoresFilterCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterDoctores();
      });

    this.serviciosFilterCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy2))
      .subscribe(() => {
        this.filterServicios();
      });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();

    this.onDestroy2.next();
    this.onDestroy2.complete();
  }


  servivioChange(servicio: Servicio) {

    if (servicio === undefined) {
      this.resetFilters();
      this.servicioId = 0;
      this.turnoSvc.turnoConfirm.servicio = '';
      this.doctorId = 0;
      this.turnoSvc.turnoConfirm.doctor = '';
      this.formGroup.get('doctor').setValue(null);
    } else {
      this.servicioId = servicio.id;
      this.turnoSvc.turnoConfirm.servicio = servicio.nombre;
      this.turnoSvc.getDoctoresByServicio(servicio.id)
        .subscribe(doc => {
          this.doctoresServicio = doc;
          this.filteredDoctores.next(doc);
          // volvemos a seleccionar el valor que tenia
          if (this.doctorId > 0) {
            this.formGroup.get('doctor').setValue(doc.find(d => d.id === this.doctorId));
          }
        });
    }
    this.getTurnos();
  }

  doctorChange(doctor: Doctor) {

    if (doctor === undefined) {

      // this.resetFilters();
      this.doctorId = 0;
      this.turnoSvc.turnoConfirm.doctor = '';
      // this.formGroup.get('servicio').setValue(null);

    } else {
      this.doctorId = doctor.id;
      this.turnoSvc.getServiciosByDoctor(doctor.id)
        .subscribe(svc => {
          this.serviciosDoctor = svc;
          this.filteredServicios.next(svc);
          // volvemos a seleccionar el valor que tenia
          if (this.servicioId > 0) {
            this.formGroup.get('servicio').setValue(svc.find(s => s.id === this.servicioId));
          }
        });
    }
    this.getTurnos();
  }

  // Sets the initial value after the filteredDoctores are loaded initially
  protected setInitialValue() {
    this.filteredDoctores
      .pipe(take(1), takeUntil(this.onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredDoctores are loaded initially
        // and after the mat-option elements are available
        this.doctoresSelect.compareWith = (a: Doctor, b: Doctor) => a && b && a.id === b.id;
      });

    this.filteredServicios
      .pipe(take(1), takeUntil(this.onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredDoctores are loaded initially
        // and after the mat-option elements are available
        this.serviciosSelect.compareWith = (a: Servicio, b: Servicio) => a && b && a.id === b.id;
      });
  }

  protected filterDoctores() {
    if (!this.doctores) {
      return;
    }
    // get the search keyword
    let search = this.doctoresFilterCtrl.value;
    if (!search) {
      this.filteredDoctores.next(this.doctoresServicio.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the doctores
    this.filteredDoctores.next(
      this.doctoresServicio.filter(doctor => doctor.nombre.toLowerCase().indexOf(search) > -1)
    );
  }

  protected filterServicios() {
    if (!this.servicios) {
      return;
    }
    // get the search keyword
    let search = this.serviciosFilterCtrl.value;
    if (!search) {
      this.filteredServicios.next(this.serviciosDoctor.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the doctores
    this.filteredServicios.next(
      this.serviciosDoctor.filter(servicio => servicio.nombre.toLowerCase().indexOf(search) > -1)
    );
  }

  private resetFilters() {
    this.doctoresServicio = this.doctores.slice();
    this.filteredDoctores.next(this.doctores.slice());
    this.serviciosDoctor = this.servicios.slice();
    this.filteredServicios.next(this.servicios.slice());
  }

  private getTurnos() {

    if (this.doctorId === 0) {
      this.turnoSvc.turnoConfirm.doctor = '';
      this.turnoSvc.getTurnosDisponiblesByServicio(this.servicioId).subscribe(turnos => {
        this.turnoSvc.turnosDisponibles.next(turnos);
      });
    }

    if (this.doctorId > 0) {
      this.turnoSvc.turnoConfirm.doctor = this.formGroup.get('doctor').value.nombre;
      this.turnoSvc.getTurnosDisponiblesByServicioDoctor(this.servicioId, this.doctorId).subscribe(turnos => {
        this.turnoSvc.turnosDisponibles.next(turnos);
      });
    }
  }
}
