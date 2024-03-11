import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CProjetoFormComponent } from './c-projeto-form.component';

describe('CProjetoFormComponent', () => {
  let component: CProjetoFormComponent;
  let fixture: ComponentFixture<CProjetoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CProjetoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CProjetoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
