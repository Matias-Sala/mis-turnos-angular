import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosDoctoresComponent } from './servicios-doctores.component';

describe('ServiciosDoctoresComponent', () => {
  let component: ServiciosDoctoresComponent;
  let fixture: ComponentFixture<ServiciosDoctoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiciosDoctoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosDoctoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
