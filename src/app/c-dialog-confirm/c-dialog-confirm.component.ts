import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'dialog-confirm',
  templateUrl: './c-dialog-confirm.component.html',
  styleUrls: ['./c-dialog-confirm.component.scss'],
})
export class CDialogConfirmComponent {
  constructor(
    public dialogRef: MatDialogRef<CDialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
