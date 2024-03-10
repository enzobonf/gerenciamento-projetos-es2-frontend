import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClProfissionaisComponent } from './cl-profissionais.component';

describe('ClProfissionaisComponent', () => {
  let component: ClProfissionaisComponent;
  let fixture: ComponentFixture<ClProfissionaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClProfissionaisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClProfissionaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
