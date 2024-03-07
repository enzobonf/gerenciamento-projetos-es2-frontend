import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PNavComponent } from './p-nav.component';

describe('PNavComponent', () => {
  let component: PNavComponent;
  let fixture: ComponentFixture<PNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
