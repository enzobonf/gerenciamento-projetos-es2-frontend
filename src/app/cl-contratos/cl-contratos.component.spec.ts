import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClContratosComponent } from './cl-contratos.component';

describe('ClContratosComponent', () => {
  let component: ClContratosComponent;
  let fixture: ComponentFixture<ClContratosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClContratosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClContratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
