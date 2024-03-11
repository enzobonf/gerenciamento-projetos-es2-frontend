import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PTimesComponent } from './p-times.component';

describe('PTimesComponent', () => {
  let component: PTimesComponent;
  let fixture: ComponentFixture<PTimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PTimesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
