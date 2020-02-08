import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoSidenavComponent } from './turno-sidenav.component';

describe('TurnoSidenavComponent', () => {
  let component: TurnoSidenavComponent;
  let fixture: ComponentFixture<TurnoSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnoSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
