import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  Analista,
  Software,
  StatusVersao,
  TecnologiaSoftware,
} from '../model/software.interface';
import { ApiService } from '../services/api.service';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-c-software-versoes-form',
  templateUrl: './c-software-versoes-form.component.html',
  styleUrls: ['./c-software-versoes-form.component.scss'],
})
export class CSoftwareVersoesFormComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private appService: AppService,
    public dialogRef: MatDialogRef<CSoftwareVersoesFormComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data_dialog: any
  ) {}

  software: Software = null;
  loading = false;
  isNew = true;

  all_status: StatusVersao[] = [];

  displayedColumns: string[] = ['nome', 'objetivo'];

  tecnologias: (TecnologiaSoftware & { selected: boolean })[] = [];
  analistas: Analista[] = [];

  public form: FormGroup = this.formBuilder.group({
    versao: [null, [Validators.required]],
    data: [null, [Validators.required]],
    id_analista: [null, [Validators.required]],
    id_status: [null, [Validators.required]],
  });

  ngOnInit(): void {
    const {
      software,
    }: {
      software: Software;
    } = this.data_dialog;

    this.software = software;

    this.getAllStatus();
    this.getAnalistas();
  }

  async getAnalistas() {
    this.setLoading(true);
    try {
      const { analistas }: any = await this.apiService.getAnalistas();
      this.analistas = analistas;

      this.setVersao();
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

  setVersao() {
    this.form.get('id_analista').setValue(this.analistas[0].id);
  }

  async onSubmit() {
    this.setLoading(true);
    const { versao, data, id_analista, id_status } = this.form.value;

    try {
      const body = {
        versao,
        data,
        id_usuario_analista: id_analista,
        id_status_versao: id_status,
      };

      const response = await this.apiService.postVersao(this.software.id, body);
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
