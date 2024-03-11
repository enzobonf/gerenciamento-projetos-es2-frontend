import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CProfissionalSelectItemComponent } from './c-profissional-select-item.component';

describe('CProfissionalSelectItemComponent', () => {
  let component: CProfissionalSelectItemComponent;
  let fixture: ComponentFixture<CProfissionalSelectItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CProfissionalSelectItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CProfissionalSelectItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
