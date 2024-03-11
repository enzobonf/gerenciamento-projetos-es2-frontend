import { ComponentFixture, TestBed } from '@angular/core/testing';

import { COpenFilterButtonComponent } from './c-open-filter-button.component';

describe('COpenFilterButtonComponent', () => {
  let component: COpenFilterButtonComponent;
  let fixture: ComponentFixture<COpenFilterButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ COpenFilterButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(COpenFilterButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
