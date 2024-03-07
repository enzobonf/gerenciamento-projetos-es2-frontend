import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClChamadosComponent } from './cl-chamados.component';

describe('ClChamadosComponent', () => {
  let component: ClChamadosComponent;
  let fixture: ComponentFixture<ClChamadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClChamadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClChamadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
