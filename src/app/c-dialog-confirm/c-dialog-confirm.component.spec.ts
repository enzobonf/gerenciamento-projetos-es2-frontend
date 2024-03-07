import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CDialogConfirmComponent } from './c-dialog-confirm.component';

describe('CDialogConfirmComponent', () => {
  let component: CDialogConfirmComponent;
  let fixture: ComponentFixture<CDialogConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CDialogConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CDialogConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
