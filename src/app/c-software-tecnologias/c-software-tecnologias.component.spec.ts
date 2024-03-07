import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CSoftwareTecnologiasComponent } from './c-software-tecnologias.component';

describe('CSoftwareTecnologiasComponent', () => {
  let component: CSoftwareTecnologiasComponent;
  let fixture: ComponentFixture<CSoftwareTecnologiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CSoftwareTecnologiasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CSoftwareTecnologiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
