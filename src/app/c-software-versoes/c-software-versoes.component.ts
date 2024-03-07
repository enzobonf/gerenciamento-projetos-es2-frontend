import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import * as moment from 'moment';
import { CSoftwareVersoesFormComponent } from '../c-software-versoes-form/c-software-versoes-form.component';
import { Software, VersaoSofware } from '../model/software.interface';

@Component({
  selector: 'app-c-software-versoes',
  templateUrl: './c-software-versoes.component.html',
  styleUrls: ['./c-software-versoes.component.scss'],
})
export class CSoftwareVersoesComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CSoftwareVersoesComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data_dialog: any
  ) {}

  software: Software = null;
  loading = false;
  displayedColumns: string[] = ['versao', 'data', 'analista', 'status'];

  novaVersao = false;

  ngOnInit(): void {
    const {
      software,
    }: {
      software: Software;
    } = this.data_dialog;

    this.software = software;
  }

  clickAddVersao() {
    const dialogRef = this.dialog.open(CSoftwareVersoesFormComponent, {
      disableClose: true,
      data: {
        software: this.software,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const versaoFormatted = this.formatVersao(result);
        this.software.versoes = [...this.software.versoes, versaoFormatted];
        this.novaVersao = true;
      }
    });
  }

  formatVersao(versaoSoftware: VersaoSofware) {
    return {
      ...versaoSoftware,
      data_formatted: moment(versaoSoftware.data).format('DD/MM/YYYY'),
    };
  }
}
