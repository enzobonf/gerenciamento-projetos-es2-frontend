import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CProfissionalFormComponent } from './c-profissional-form.component';

describe('CProfissionalFormComponent', () => {
  let component: CProfissionalFormComponent;
  let fixture: ComponentFixture<CProfissionalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CProfissionalFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CProfissionalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
