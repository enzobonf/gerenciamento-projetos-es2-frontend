import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CEmpresaFormComponent } from './c-empresa-form.component';

describe('CEmpresaFormComponent', () => {
  let component: CEmpresaFormComponent;
  let fixture: ComponentFixture<CEmpresaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CEmpresaFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CEmpresaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
