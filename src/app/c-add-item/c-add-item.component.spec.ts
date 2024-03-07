import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CAddItemComponent } from './c-add-item.component';

describe('CAddItemComponent', () => {
  let component: CAddItemComponent;
  let fixture: ComponentFixture<CAddItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CAddItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CAddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
