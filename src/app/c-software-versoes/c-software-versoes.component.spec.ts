import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CSoftwareVersoesComponent } from './c-software-versoes.component';

describe('CSoftwareVersoesComponent', () => {
  let component: CSoftwareVersoesComponent;
  let fixture: ComponentFixture<CSoftwareVersoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CSoftwareVersoesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CSoftwareVersoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
