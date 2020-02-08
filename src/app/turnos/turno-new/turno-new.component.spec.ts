import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoNewComponent } from './turno-new.component';

describe('TurnoNewComponent', () => {
  let component: TurnoNewComponent;
  let fixture: ComponentFixture<TurnoNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnoNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
