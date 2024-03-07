import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CContratoFormComponent } from './c-contrato-form.component';

describe('CContratoFormComponent', () => {
  let component: CContratoFormComponent;
  let fixture: ComponentFixture<CContratoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CContratoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CContratoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
