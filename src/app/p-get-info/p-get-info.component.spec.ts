import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PGetInfoComponent } from './p-get-info.component';

describe('PGetInfoComponent', () => {
  let component: PGetInfoComponent;
  let fixture: ComponentFixture<PGetInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PGetInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PGetInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
