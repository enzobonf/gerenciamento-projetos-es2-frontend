import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CChamadoFormComponent } from './c-chamado-form.component';

describe('CChamadoFormComponent', () => {
  let component: CChamadoFormComponent;
  let fixture: ComponentFixture<CChamadoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CChamadoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CChamadoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
