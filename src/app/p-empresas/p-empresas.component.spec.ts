import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PEmpresasComponent } from './p-empresas.component';

describe('PEmpresasComponent', () => {
  let component: PEmpresasComponent;
  let fixture: ComponentFixture<PEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PEmpresasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
