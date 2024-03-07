import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Contrato, StatusContrato } from '../model/contrato.interface';
import { Empresa } from '../model/empresa.interface';
import { Software } from '../model/software.interface';
import { ApiService } from '../services/api.service';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-c-contrato-form',
  templateUrl: './c-contrato-form.component.html',
  styleUrls: ['./c-contrato-form.component.scss'],
})
export class CContratoFormComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private appService: AppService,
    public dialogRef: MatDialogRef<CContratoFormComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data_dialog: any
  ) {}

  contrato: Contrato = null;
  loading = false;
  isNew = true;

  empresas: Empresa[] = [];
  softwares: Software[] = [];
  all_status: StatusContrato[] = [];

  displayedColumns: string[] = ['nome', 'objetivo'];

  public form: FormGroup = this.formBuilder.group({
    id_empresa: [null, [Validators.required]],
    id_software: [null, [Validators.required]],
    data_contratacao: [null, [Validators.required]],
    id_status_contrato: [null, [Validators.required]],
  });

  ngOnInit(): void {
    const {
      contrato,
    }: {
      contrato: Contrato;
    } = this.data_dialog;

    if (contrato) {
      this.contrato = contrato;
      this.isNew = false;
    }

    this.getEmpresas();
    this.getSoftwares();
    this.getAllStatus();
  }

  async getEmpresas() {
    this.setLoading(true);
    try {
      const { empresas }: any = await this.apiService.getEmpresas();
      this.empresas = empresas;

      this.setLoading(false);
    } catch (err) {
      this.setLoading(false);
      console.log(err);
    }
  }

  async getSoftwares() {
    this.setLoading(true);
    try {
      const { softwares }: any = await this.apiService.getSoftwares();
      this.softwares = softwares;

      this.setLoading(false);
    } catch (err) {
      this.setLoading(false);
      console.log(err);
    }
  }

  async getAllStatus() {
    this.setLoading(true);
    try {
      const { status }: any = await this.apiService.getAllStatusContrato();
      this.all_status = status;

      if (this.contrato) {
        this.setContrato();
      }

      this.setLoading(false);
    } catch (err) {
      this.setLoading(false);
      console.log(err);
    }
  }

  setContrato() {
    this.form.get('id_empresa').setValue(this.contrato.empresa.id);
    this.form.get('id_empresa').disable();
    this.form.get('id_software').setValue(this.contrato.software.id);
    this.form.get('id_software').disable();
    this.form.get('data_contratacao').setValue(this.contrato.data_contratacao);
    this.form.get('data_contratacao').disable();
    this.form
      .get('id_status_contrato')
      .setValue(this.contrato.status_contrato.id);
  }

  async onSubmit() {
    this.setLoading(true);
    const { id_empresa, id_software, data_contratacao, id_status_contrato } =
      this.form.value;

    try {
      const body = {
        id_empresa,
        id_software,
        data_contratacao,
        id_status_contrato,
      };

      let response = null;
      if (this.isNew) {
        response = await this.apiService.postContrato(body);
      } else {
        response = await this.apiService.putContrato(
          this.contrato.nro_contrato,
          body
        );
      }

      this.close({
        ...response,
      });

      this.setLoading(false);
    } catch (err) {
      this.setLoading(false);
      console.log(err);
    }
  }

  close(data?: any) {
    this.dialogRef.close(data);
  }

  setLoading(loading: boolean) {
    this.appService.setLoading(loading);
  }
}
