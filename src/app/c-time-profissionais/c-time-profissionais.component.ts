import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import * as moment from 'moment';
import { Time } from '../model/time.interface';
import { ClProfissionalSelectModalComponent } from '../cl-profissional-select-modal/cl-profissional-select-modal.component';
import { Profissional } from '../model/profissional.interface';

@Component({
  selector: 'app-c-time-profissionais',
  templateUrl: './c-time-profissionais.component.html',
  styleUrls: ['./c-time-profissionais.component.scss'],
})
export class CTimeProfissionaisComponent {
  constructor(
    public dialogRef: MatDialogRef<CTimeProfissionaisComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data_dialog: any
  ) {}

  time: Time = null;
  loading = false;
  displayedColumns: string[] = ['nome', 'email', 'especialidade'];

  ngOnInit(): void {
    const {
      time,
    }: {
      time: Time;
    } = this.data_dialog;

    this.time = time;
  }

  clickAddProfissional() {
    const dialogRef = this.dialog.open(ClProfissionalSelectModalComponent, {
      disableClose: true,
      data: {
        oldProfissionais: this.time.profissionais,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //const versaoFormatted = this.formatVersao(result);
        this.time.profissionais = [...this.time.profissionais, result];
        //this.novaVersao = true;
      }
    });
  }

  /* formatProfissional(profissional: Profissional) {
    return {
      ...profissional,
      data_formatted: moment(profissional.data).format('DD/MM/YYYY'),
    };
  } */
}
