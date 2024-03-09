import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PProfissionaisComponent } from './p-profissionais.component';

describe('PProfissionaisComponent', () => {
  let component: PProfissionaisComponent;
  let fixture: ComponentFixture<PProfissionaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PProfissionaisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PProfissionaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
