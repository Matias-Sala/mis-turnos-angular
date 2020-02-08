import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DniVerifyComponent } from './dni-verify.component';

describe('DniVerifyComponent', () => {
  let component: DniVerifyComponent;
  let fixture: ComponentFixture<DniVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DniVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DniVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
