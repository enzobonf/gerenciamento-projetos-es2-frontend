import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { AppService } from '../services/app.service';
import * as moment from 'moment';
import { CContratoFormComponent } from '../c-contrato-form/c-contrato-form.component';
import { CDialogConfirmComponent } from '../c-dialog-confirm/c-dialog-confirm.component';
import { Contrato } from '../model/contrato.interface';

@Component({
  selector: 'cl-contratos',
  templateUrl: './cl-contratos.component.html',
  styleUrls: ['./cl-contratos.component.scss'],
})
export class ClContratosComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    private appService: AppService
  ) {}

  @Input() showButtons = true;

  contratos: Contrato[] = [];
  //all_status: StatusVersao[] = [];

  loading = false;
  displayedColumns: string[] = [
    'nome_empresa',
    'nome_software',
    'numero',
    'data',
    'representante',
    'status',
    'editar',
    'excluir',
  ];

  ngOnInit() {
    this.getContratos();
  }

  async getContratos() {
    try {
      const { contratos }: any = await this.apiService.getContratos();
      this.contratos = contratos;
      this.formatDataContratos();
    } catch (err) {
      console.log(err);
    }
  }

  formatDataContratos() {
    let strFormat = 'DD/MM/YYYY';

    this.contratos.forEach(contrato => {
      contrato.data_formatted = moment(contrato.data_contratacao).format(
        strFormat
      );
    });
  }

  openDialogFormContrato(contrato?: Contrato) {
    const dialogRef = this.dialog.open(CContratoFormComponent, {
      disableClose: true,
      data: {
        contrato,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (contrato) {
          const contratoIndex = this.contratos.findIndex(
            x => x.nro_contrato === result.nro_contrato
          );
          this.contratos[contratoIndex] = {
            ...this.contratos[contratoIndex],
            ...result,
          };

          this.contratos = [...this.contratos];
        } else {
          this.contratos = [...this.contratos, result];
        }

        this.formatDataContratos();
      }
    });
  }

  clickExcluir(contrato: Contrato) {
    const dialogRef = this.dialog.open(CDialogConfirmComponent, {
      width: '250px',
      autoFocus: false,
      data: {
        title: `Deseja excluir o contrato ${contrato.nro_contrato}?`,
        content: `Software: ${contrato.software.nome} | Empresa: ${contrato.empresa.nome}`,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      // TODO
      if (result) this.deleteContrato(contrato.nro_contrato);
    });
  }

  async deleteContrato(nro_contrato: number) {
    this.setLoading(true);

    try {
      await this.apiService.deleteContrato(nro_contrato);
      this.contratos = this.contratos.filter(
        x => x.nro_contrato !== nro_contrato
      );
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
