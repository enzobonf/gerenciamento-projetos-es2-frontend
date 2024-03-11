import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CTimeProfissionaisComponent } from './c-time-profissionais.component';

describe('CTimeProfissionaisComponent', () => {
  let component: CTimeProfissionaisComponent;
  let fixture: ComponentFixture<CTimeProfissionaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CTimeProfissionaisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CTimeProfissionaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
