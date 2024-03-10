import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CSoftwareVersoesComponent } from '../c-software-versoes/c-software-versoes.component';
import { ApiService } from '../services/api.service';
import { Software, StatusVersao } from '../model/software.interface';
import { AppService } from '../services/app.service';
import * as moment from 'moment';
import { CSoftwareTecnologiasComponent } from '../c-software-tecnologias/c-software-tecnologias.component';
import { CSoftwareFormComponent } from '../c-software-form/c-software-form.component';
import { CDialogConfirmComponent } from '../c-dialog-confirm/c-dialog-confirm.component';
import { Time } from '../model/time.interface';
import { CTimeFormComponent } from '../c-time-form/c-time-form.component';

@Component({
  selector: 'cl-times',
  templateUrl: './cl-times.component.html',
  styleUrls: ['./cl-times.component.scss'],
})
export class ClTimesComponent {
  public filter: FormGroup = this.formBuilder.group({
    nome: [''],
  });

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private appService: AppService
  ) {}

  @Input() showButtons = true;

  times: Time[] = [];

  loading = false;
  displayedColumns: string[] = [
    'nome',
    'verProfissionais',
    'editar',
    'excluir',
  ];

  ngOnInit() {
    this.getTimes();
  }

  async getTimes() {
    try {
      const { times }: any = await this.apiService.obterTimes();
      this.times = times;
    } catch (err) {
      console.log(err);
    }
  }

  clickVerProfissionais(time: Time) {}

  openDialogFormTime(time?: Time) {
    const dialogRef = this.dialog.open(CTimeFormComponent, {
      width: '550px',
      disableClose: true,
      data: {
        time,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (time) {
          const timeIndex = this.times.findIndex(x => x.id === result.id);
          this.times[timeIndex] = {
            ...this.times[timeIndex],
            ...result,
          };

          this.times = [...this.times];
        } else {
          this.times = [...this.times, result];
        }
      }
    });
  }

  clickExcluir(time: Time) {
    const dialogRef = this.dialog.open(CDialogConfirmComponent, {
      width: '250px',
      autoFocus: false,
      data: {
        title: `Deseja excluir a time ${time.nome}?`,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.deleteTime(time.id);
    });
  }

  async deleteTime(id_time: number) {
    this.setLoading(true);

    try {
      await this.apiService.removerTime(id_time);
      this.times = this.times.filter(x => x.id !== id_time);
      this.setLoading(false);
    } catch (err) {
      this.setLoading(false);
      console.log(err);
    }
  }

  setLoading(loading: boolean) {
    this.appService.setLoading(loading);
  }
}
