import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CTimeFormComponent } from './c-time-form.component';

describe('CTimeFormComponent', () => {
  let component: CTimeFormComponent;
  let fixture: ComponentFixture<CTimeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CTimeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CTimeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
