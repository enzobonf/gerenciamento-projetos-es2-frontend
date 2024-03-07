import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PSoftwaresComponent } from './p-softwares.component';

describe('PSoftwaresComponent', () => {
  let component: PSoftwaresComponent;
  let fixture: ComponentFixture<PSoftwaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PSoftwaresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PSoftwaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
