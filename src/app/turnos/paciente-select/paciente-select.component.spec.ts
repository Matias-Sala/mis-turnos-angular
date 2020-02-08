import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteSelectComponent } from './paciente-select.component';

describe('PacienteSelectComponent', () => {
  let component: PacienteSelectComponent;
  let fixture: ComponentFixture<PacienteSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
