import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CSoftwareFormComponent } from './c-software-form.component';

describe('CSoftwareFormComponent', () => {
  let component: CSoftwareFormComponent;
  let fixture: ComponentFixture<CSoftwareFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CSoftwareFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CSoftwareFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
