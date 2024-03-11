import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClProfissionalSelectModalComponent } from './cl-profissional-select-modal.component';

describe('ClProfissionalSelectModalComponent', () => {
  let component: ClProfissionalSelectModalComponent;
  let fixture: ComponentFixture<ClProfissionalSelectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClProfissionalSelectModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClProfissionalSelectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
