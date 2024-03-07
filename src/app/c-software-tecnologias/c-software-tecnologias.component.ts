import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Software } from '../model/software.interface';

@Component({
  selector: 'app-c-software-tecnologias',
  templateUrl: './c-software-tecnologias.component.html',
  styleUrls: ['./c-software-tecnologias.component.scss'],
})
export class CSoftwareTecnologiasComponent {
  constructor(
    public dialogRef: MatDialogRef<CSoftwareTecnologiasComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data_dialog: any
  ) {}

  software: Software = null;
  loading = false;
  displayedColumns: string[] = ['nome', 'objetivo'];

  ngOnInit(): void {
    const {
      software,
    }: {
      software: Software;
    } = this.data_dialog;

    this.software = software;
  }
}
