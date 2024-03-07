import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CSelectItemComponent } from './c-select-item.component';

describe('CSelectItemComponent', () => {
  let component: CSelectItemComponent;
  let fixture: ComponentFixture<CSelectItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CSelectItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CSelectItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
