import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClSoftwaresComponent } from './cl-softwares.component';

describe('ClSoftwaresComponent', () => {
  let component: ClSoftwaresComponent;
  let fixture: ComponentFixture<ClSoftwaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClSoftwaresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClSoftwaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
