import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CSoftwareVersoesFormComponent } from './c-software-versoes-form.component';

describe('CSoftwareVersoesFormComponent', () => {
  let component: CSoftwareVersoesFormComponent;
  let fixture: ComponentFixture<CSoftwareVersoesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CSoftwareVersoesFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CSoftwareVersoesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
