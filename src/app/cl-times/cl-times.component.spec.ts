import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClTimesComponent } from './cl-times.component';

describe('ClTimesComponent', () => {
  let component: ClTimesComponent;
  let fixture: ComponentFixture<ClTimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClTimesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
