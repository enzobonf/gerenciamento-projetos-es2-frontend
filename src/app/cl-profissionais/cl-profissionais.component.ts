import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { AppService } from '../services/app.service';
import * as moment from 'moment';
import { CDialogConfirmComponent } from '../c-dialog-confirm/c-dialog-confirm.component';
import { Profissional } from '../model/profissional.interface';
import { CProfissionalFormComponent } from '../c-profissional-form/c-profissional-form.component';

@Component({
  selector: 'cl-profissionais',
  templateUrl: './cl-profissionais.component.html',
  styleUrls: ['./cl-profissionais.component.scss'],
})
export class ClProfissionaisComponent implements OnInit {
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

  profissionais: Profissional[] = [];

  loading = false;
  displayedColumns: string[] = [
    'nome',
    'email',
    'especialidade',
    'telefone',
    'endereco',
    'editar',
    'excluir',
  ];

  ngOnInit() {
    this.getProfissionais();
  }

  async getProfissionais() {
    this.setLoading(true);
    try {
      const { profissionais }: any = await this.apiService.obterProfissionais();
      this.profissionais = profissionais;
      this.setLoading(false);
    } catch (err) {
      this.setLoading(false);
      console.log(err);
    }
  }

  openDialogFormProfissional(profissional?: Profissional) {
    const dialogRef = this.dialog.open(CProfissionalFormComponent, {
      width: '950px',
      disableClose: true,
      data: {
        profissional,
      },
    });

    dialogRef.afterClosed().subscribe((result: Profissional) => {
      if (result) {
        if (profissional) {
          const softwareIndex = this.profissionais.findIndex(
            x => x.id === result.id
          );
          this.profissionais[softwareIndex] = {
            ...this.profissionais[softwareIndex],
            ...result,
          };

          this.profissionais = [...this.profissionais];
        } else {
          this.profissionais = [...this.profissionais, result];
        }
      }
    });
  }

  clickExcluir(profissional: Profissional) {
    const dialogRef = this.dialog.open(CDialogConfirmComponent, {
      width: '250px',
      autoFocus: false,
      data: {
        title: `Deseja excluir o profissional ${profissional.nome} ${profissional.sobrenome}?`,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      // TODO
      if (result) this.deleteProfissional(profissional.id);
    });
  }

  async deleteProfissional(id_profissional: number) {
    this.setLoading(true);

    try {
      await this.apiService.removerProfissional(id_profissional);
      this.profissionais = this.profissionais.filter(
        x => x.id !== id_profissional
      );
      this.setLoading(false);
    } catch (err) {
      this.setLoading(false);
      console.log(err);
    }
  }

  /* clickVerVersoes(profissional: Profissional) {
    const dialogRef = this.dialog.open(CSoftwareVersoesComponent, {
      disableClose: false,
      autoFocus: false,
      data: {
        profissional,
      },
    });

    dialogRef.afterClosed().subscribe(novaVersao => {
      if (novaVersao) this.getProfissionais();
    });
  } */

  /* clickVerTecnologias(profissional: Profissional) {
    this.dialog.open(CSoftwareTecnologiasComponent, {
      disableClose: false,
      autoFocus: false,
      data: {
        profissional,
      },
    });
  } */

  setLoading(loading: boolean) {
    this.appService.setLoading(loading);
  }
}
