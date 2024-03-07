import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClEmpresasComponent } from './cl-empresas.component';

describe('ClEmpresasComponent', () => {
  let component: ClEmpresasComponent;
  let fixture: ComponentFixture<ClEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClEmpresasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
