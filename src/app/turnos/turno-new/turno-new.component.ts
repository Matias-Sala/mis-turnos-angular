import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-turno-new',
  templateUrl: './turno-new.component.html',
  styleUrls: ['./turno-new.component.scss']
})
export class TurnoNewComponent implements OnInit, OnDestroy {

  isLinear = true;
  mobileQuery: MediaQueryList;
  secondFormGroup: FormGroup;

  private mobileQueryListener: () => void;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher) { }

  ngOnInit() {

    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }
}
