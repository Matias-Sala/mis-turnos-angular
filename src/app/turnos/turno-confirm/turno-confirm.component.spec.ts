import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoConfirmComponent } from './turno-confirm.component';

describe('TurnoResumeComponent', () => {
  let component: TurnoConfirmComponent;
  let fixture: ComponentFixture<TurnoConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnoConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
