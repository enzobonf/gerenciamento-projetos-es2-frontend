import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { AppService } from '../services/app.service';
import * as moment from 'moment';
import { CChamadoFormComponent } from '../c-chamado-form/c-chamado-form.component';
import { CDialogConfirmComponent } from '../c-dialog-confirm/c-dialog-confirm.component';
import { Chamado } from '../model/chamado.interface';

@Component({
  selector: 'cl-chamados',
  templateUrl: './cl-chamados.component.html',
  styleUrls: ['./cl-chamados.component.scss'],
})
export class ClChamadosComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    private appService: AppService
  ) {}

  @Input() showButtons = true;

  chamados: Chamado[] = [];
  //all_status: StatusVersao[] = [];

  loading = false;
  displayedColumns: string[] = [
    'numero',
    'data',
    'nome_empresa',
    'analista',
    'descricao',
    'tipo',
    'status',
    'editar',
    'excluir',
  ];

  ngOnInit() {
    this.getChamados();
  }

  async getChamados() {
    try {
      const { chamados }: any = await this.apiService.getChamados();
      this.chamados = chamados;
      this.formatDataChamados();
    } catch (err) {
      console.log(err);
    }
  }

  formatDataChamados() {
    let strFormat = 'DD/MM/YYYY';

    this.chamados.forEach(chamado => {
      chamado.data_formatted = moment(chamado.data_abertura).format(strFormat);
    });
  }

  openDialogFormChamado(chamado?: Chamado) {
    const dialogRef = this.dialog.open(CChamadoFormComponent, {
      disableClose: true,
      data: {
        chamado,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        if (chamado) {
          // TODO
        }
      }
    });
  }

  clickExcluir(chamado: Chamado) {
    const dialogRef = this.dialog.open(CDialogConfirmComponent, {
      width: '250px',
      autoFocus: false,
      data: {
        title: `Deseja excluir o chamado ${chamado.nro_ticket}?`,
        content: `Software: ${chamado.software.nome} | Empresa: ${chamado.empresa.nome}`,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      // TODO
      if (result)
        this.chamados = this.chamados.filter(
          x => x.nro_ticket !== chamado.nro_ticket
        );
    });
  }

  setLoading(loading: boolean) {
    this.appService.setLoading(loading);
  }
}
