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

@Component({
  selector: 'cl-softwares',
  templateUrl: './cl-softwares.component.html',
  styleUrls: ['./cl-softwares.component.scss'],
})
export class ClSoftwaresComponent implements OnInit {
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

  softwares: Software[] = [];
  all_status: StatusVersao[] = [];

  loading = false;
  displayedColumns: string[] = [
    'nome',
    'sigla',
    'versao_atual',
    'editarStatus',
    'verVersoes',
    'verTecnologias',
    'editar',
    'excluir',
  ];

  ngOnInit() {
    this.getSoftwares();
    this.getAllStatus();
  }

  async getSoftwares() {
    this.setLoading(true);
    try {
      const { softwares }: any = await this.apiService.getSoftwares();
      this.softwares = softwares;

      this.formatSoftwares();
      this.setLoading(false);
    } catch (err) {
      this.setLoading(false);
      console.log(err);
    }
  }

  async getAllStatus() {
    try {
      const { status }: any =
        await this.apiService.getAllStatusDesenvolvimento();
      this.all_status = status;
    } catch (err) {
      console.log(err);
    }
  }

  formatSoftwares() {
    let strFormat = 'DD/MM/YYYY';

    this.softwares.forEach(software => {
      if (software.versao_atual) {
        software.versao_atual.data_formatted = moment(
          software.versao_atual.data
        ).format(strFormat);
        const { versao, data_formatted, analista } = software.versao_atual;

        software.versao_atual_str = `${versao} - ${data_formatted} - ${analista.nome}`;
      } else {
        software.versao_atual_str = '--';
      }

      software.versoes = software.versoes.map(versao => {
        return {
          ...versao,
          data_formatted: moment(versao.data).format(strFormat),
        };
      });
    });
  }

  openDialogFormSoftware(software?: Software) {
    const dialogRef = this.dialog.open(CSoftwareFormComponent, {
      disableClose: true,
      data: {
        software,
        all_status: this.all_status,
      },
    });

    dialogRef.afterClosed().subscribe((result: Software) => {
      if (result) {
        if (software) {
          const softwareIndex = this.softwares.findIndex(
            x => x.id === result.id
          );
          this.softwares[softwareIndex] = {
            ...this.softwares[softwareIndex],
            ...result,
          };

          this.softwares = [...this.softwares];
        } else {
          this.softwares = [...this.softwares, result];
        }

        this.formatSoftwares();
      }
    });
  }

  clickExcluir(software: Software) {
    const dialogRef = this.dialog.open(CDialogConfirmComponent, {
      width: '250px',
      autoFocus: false,
      data: {
        title: `Deseja excluir o software ${software.nome}?`,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      // TODO
      if (result) this.deleteSoftware(software.id);
    });
  }

  async deleteSoftware(id_software: number) {
    this.setLoading(true);

    try {
      await this.apiService.deleteSoftware(id_software);
      this.softwares = this.softwares.filter(x => x.id !== id_software);
      this.setLoading(false);
    } catch (err) {
      this.setLoading(false);
      console.log(err);
    }
  }

  async setStatusVersaoAtual(
    id_software: number,
    id_versao: number,
    id_status_versao: number
  ) {
    this.setLoading(true);

    try {
      await this.apiService.setStatusVersaoSoftware(
        id_software,
        id_versao,
        id_status_versao
      );

      this.setLoading(false);
    } catch (err) {
      this.setLoading(false);
      console.log(err);
    }
  }

  clickVerVersoes(software: Software) {
    const dialogRef = this.dialog.open(CSoftwareVersoesComponent, {
      disableClose: false,
      autoFocus: false,
      data: {
        software,
      },
    });

    dialogRef.afterClosed().subscribe(novaVersao => {
      if (novaVersao) this.getSoftwares();
    });
  }

  clickVerTecnologias(software: Software) {
    this.dialog.open(CSoftwareTecnologiasComponent, {
      disableClose: false,
      autoFocus: false,
      data: {
        software,
      },
    });
  }

  async onChangeStatus(event: any, software: Software) {
    const id_versao = event.value;

    await this.setStatusVersaoAtual(
      software.id,
      software.versao_atual.id,
      id_versao
    );
  }

  setLoading(loading: boolean) {
    this.appService.setLoading(loading);
  }
}
