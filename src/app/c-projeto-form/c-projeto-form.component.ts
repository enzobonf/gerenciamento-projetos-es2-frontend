import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Projeto } from '../model/projeto.interface';
import { ApiService } from '../services/api.service';
import { AppService } from '../services/app.service';
import { Cliente } from '../model/pessoa-fisica.interface';
import { Time } from '../model/time.interface';
import * as moment from 'moment';

@Component({
  selector: 'app-c-projeto-form',
  templateUrl: './c-projeto-form.component.html',
  styleUrls: ['./c-projeto-form.component.scss'],
})
export class CProjetoFormComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private appService: AppService,
    public dialogRef: MatDialogRef<CProjetoFormComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data_dialog: any
  ) {}

  projeto: Projeto = null;
  loading = false;
  isNew = true;

  clientes: Cliente[] = [];
  times: Time[] = [];

  public form: FormGroup = this.formBuilder.group({
    nome: [null, [Validators.required]],
    objetivo: [null, [Validators.required]],
    data_inicio: [null, [Validators.required]],
    data_fim: [null, [Validators.required]],
    id_cliente: [null, [Validators.required]],
    id_time_responsavel: [null, [Validators.required]],
    valor: [, [Validators.required, Validators.min(1)]],
  });

  ngOnInit(): void {
    const {
      projeto,
    }: {
      projeto: Projeto;
    } = this.data_dialog;

    if (projeto) {
      this.projeto = projeto;
      this.isNew = false;
    }

    this.initForm();
  }

  async initForm() {
    await Promise.all([this.getClientes(), this.getTimes()]);
    if (!this.isNew) this.setProjeto();
  }

  async getClientes() {
    this.setLoading(true);
    try {
      const { clientes }: any = await this.apiService.obterClientes();
      this.clientes = clientes;
      this.setLoading(false);
    } catch (err) {
      this.setLoading(false);
      console.log(err);
    }
  }

  async getTimes() {
    this.setLoading(true);
    try {
      const { times }: any = await this.apiService.obterTimes();
      this.times = times;

      this.setLoading(false);
    } catch (err) {
      this.setLoading(false);
      console.log(err);
    }
  }

  setProjeto() {
    this.form.get('nome').setValue(this.projeto.nome);
    this.form.get('objetivo').setValue(this.projeto.objetivo);

    this.form
      .get('data_inicio')
      .setValue(
        new Date(new Date(this.projeto.data_inicio).toISOString().split('T')[0])
      );

    this.form
      .get('data_fim')
      .setValue(moment(this.projeto.data_fim).utc().toISOString());

    this.form.get('id_cliente').setValue(this.projeto.id_cliente);
    this.form
      .get('id_time_responsavel')
      .setValue(this.projeto.id_time_responsavel);

    this.form.get('valor').setValue(this.projeto.valor);
  }

  async onSubmit() {
    this.setLoading(true);
    const {
      nome,
      objetivo,
      data_inicio,
      data_fim,
      id_cliente,
      id_time_responsavel,
      valor,
    } = this.form.value;

    try {
      const body = {
        nome,
        objetivo,
        data_inicio,
        data_fim,
        id_cliente,
        id_time_responsavel,
        valor: +valor,
      };

      let response = null;
      if (this.isNew) {
        response = await this.apiService.cadastrarProjeto(body);
      } else {
        response = await this.apiService.editarProjeto(this.projeto.id, body);
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
