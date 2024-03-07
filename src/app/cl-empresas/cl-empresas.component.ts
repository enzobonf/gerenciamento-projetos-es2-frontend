import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { AppService } from '../services/app.service';
import { CEmpresaFormComponent } from '../c-empresa-form/c-empresa-form.component';
import { CDialogConfirmComponent } from '../c-dialog-confirm/c-dialog-confirm.component';
import { Empresa } from '../model/empresa.interface';

@Component({
  selector: 'cl-empresas',
  templateUrl: './cl-empresas.component.html',
  styleUrls: ['./cl-empresas.component.scss'],
})
export class ClEmpresasComponent implements OnInit {
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

  empresas: Empresa[] = [];
  //all_status: StatusVersao[] = [];

  loading = false;
  displayedColumns: string[] = [
    'nome',
    'cnpj',
    'endereco',
    'editar',
    'excluir',
  ];

  ngOnInit() {
    this.getEmpresas();
  }

  async getEmpresas() {
    try {
      const { empresas }: any = await this.apiService.getEmpresas();
      this.empresas = empresas;
    } catch (err) {
      console.log(err);
    }
  }

  openDialogFormEmpresa(empresa?: Empresa) {
    const dialogRef = this.dialog.open(CEmpresaFormComponent, {
      disableClose: true,
      data: {
        empresa,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        if (empresa) {
          // TODO
        }
      }
    });
  }

  clickExcluir(empresa: Empresa) {
    const dialogRef = this.dialog.open(CDialogConfirmComponent, {
      width: '250px',
      autoFocus: false,
      data: {
        title: `Deseja excluir a empresa ${empresa.nome}?`,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      // TODO
      if (result)
        this.empresas = this.empresas.filter(x => x.id !== empresa.id);
    });
  }

  setLoading(loading: boolean) {
    this.appService.setLoading(loading);
  }
}
