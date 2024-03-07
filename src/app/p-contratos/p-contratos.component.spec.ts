import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PContratosComponent } from './p-contratos.component';

describe('PContratosComponent', () => {
  let component: PContratosComponent;
  let fixture: ComponentFixture<PContratosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PContratosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PContratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
