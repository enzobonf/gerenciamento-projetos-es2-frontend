import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { AppService } from '../services/app.service';
import * as moment from 'moment';
import { CProjetoFormComponent } from '../c-projeto-form/c-projeto-form.component';
import { CDialogConfirmComponent } from '../c-dialog-confirm/c-dialog-confirm.component';
import { Projeto } from '../model/projeto.interface';

@Component({
  selector: 'cl-projetos',
  templateUrl: './cl-projetos.component.html',
  styleUrls: ['./cl-projetos.component.scss'],
})
export class ClProjetosComponent {
  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    private appService: AppService
  ) {}

  @Input() showButtons = true;

  projetos: Projeto[] = [];
  //all_status: StatusVersao[] = [];

  loading = false;
  displayedColumns: string[] = [
    'nome',
    'nome_cliente',
    'objetivo',
    'data_inicio',
    'data_fim',
    'valor',
    'time',
    'editar',
    'excluir',
  ];

  ngOnInit() {
    this.getProjetos();
  }

  async getProjetos() {
    try {
      const { projetos }: any = await this.apiService.obterProjetos();
      this.projetos = projetos;
      this.formatDataProjetos();
    } catch (err) {
      console.log(err);
    }
  }

  formatDataProjetos() {
    let strFormat = 'DD/MM/YYYY';

    this.projetos.forEach(projeto => {
      projeto.data_inicio_str = moment(projeto.data_inicio)
        .utc()
        .format(strFormat);
      projeto.data_fim_str = moment(projeto.data_fim).utc().format(strFormat);
    });
  }

  openDialogFormProjeto(projeto?: Projeto) {
    const dialogRef = this.dialog.open(CProjetoFormComponent, {
      disableClose: true,
      data: {
        projeto,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (projeto) {
          const projetoIndex = this.projetos.findIndex(x => x.id === result.id);
          this.projetos[projetoIndex] = {
            ...this.projetos[projetoIndex],
            ...result,
          };

          this.projetos = [...this.projetos];
        } else {
          this.projetos = [...this.projetos, result];
        }

        this.formatDataProjetos();
      }
    });
  }

  clickExcluir(projeto: Projeto) {
    const dialogRef = this.dialog.open(CDialogConfirmComponent, {
      width: '250px',
      autoFocus: false,
      data: {
        title: `Deseja excluir o projeto ${projeto.nome}?`,
        content: `Time responsável: ${projeto.time.nome}`,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      // TODO
      if (result) this.deleteProjeto(projeto.id);
    });
  }

  async deleteProjeto(id_projeto: number) {
    this.setLoading(true);

    try {
      await this.apiService.removerProjeto(id_projeto);
      this.projetos = this.projetos.filter(x => x.id !== id_projeto);
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
