import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoSelectComponent } from './turno-select.component';

describe('TurnoSelectComponent', () => {
  let component: TurnoSelectComponent;
  let fixture: ComponentFixture<TurnoSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnoSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
