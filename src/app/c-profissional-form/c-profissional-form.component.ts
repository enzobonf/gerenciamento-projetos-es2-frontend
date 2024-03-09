import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  EspecialidadeProfissional,
  Profissional,
} from '../model/profissional.interface';
import { ApiService } from '../services/api.service';
import { AppService } from '../services/app.service';
import { Genero, Raca } from '../model/pessoa-fisica.interface';

@Component({
  selector: 'app-c-profissional-form',
  templateUrl: './c-profissional-form.component.html',
  styleUrls: ['./c-profissional-form.component.scss'],
})
export class CProfissionalFormComponent {
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private appService: AppService,
    public dialogRef: MatDialogRef<CProfissionalFormComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data_dialog: any
  ) {}

  profissional: Profissional = null;
  loading = false;
  isNew = true;

  generos: Genero[] = [];
  racas: Raca[] = [];
  especialidades: EspecialidadeProfissional[] = [];

  public form: FormGroup = this.formBuilder.group({
    nome: [null, [Validators.required]],
    sobrenome: [null, [Validators.required]],
    email: [null, [Validators.required]],
    id_especialidade: [null, [Validators.required]],
    id_genero: [null, [Validators.required]],
    id_raca: [null, [Validators.required]],
    id_endereco: [null, [Validators.required]],
    ddi_telefone: [null, [Validators.required]],
    num_telefone: [null, [Validators.required]],
    endereco: this.formBuilder.group({
      cep: ['', Validators.required],
      logradouro: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      uf: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
    }),

    /*     versao_atual: this.formBuilder.group({
      versao: [null],
      data: [null],
      id_analista: [null],
      id_status: [null],
    }), */
  });

  ngOnInit(): void {
    const {
      profissional,
    }: //all_status,
    {
      profissional?: Profissional;
      //all_status: StatusVersao[];
    } = this.data_dialog;

    // this.all_status = all_status;

    if (profissional) {
      this.profissional = profissional;
      this.isNew = false;
      this.setProfissional;
    }

    this.initForm();
  }

  async initForm() {
    await Promise.all([
      this.getEspecialidades(),
      this.getRacas(),
      this.getGeneros(),
    ]);

    if (!this.isNew) {
      this.setProfissional();
    }
  }

  async getGeneros() {
    try {
      const { generos }: any = await this.apiService.obterGeneros();
      this.generos = generos;
    } catch (err) {
      console.log(err);
    }
  }

  async getRacas() {
    try {
      const { racas }: any = await this.apiService.obterRacas();
      this.racas = racas;
    } catch (err) {
      console.log(err);
    }
  }

  async getEspecialidades() {
    try {
      const { especialidades }: any =
        await this.apiService.obterEspecialidades();

      this.especialidades = especialidades;
    } catch (err) {
      console.log(err);
    }
  }

  async setProfissional() {
    this.form.get('nome').setValue(this.profissional.nome);
    this.form.get('sobrenome').setValue(this.profissional.sobrenome);
    this.form.get('email').setValue(this.profissional.email);
    this.form
      .get('id_especialidade')
      .setValue(this.profissional.id_especialidade);
    this.form.get('id_genero').setValue(this.profissional.id_genero);
    this.form.get('id_raca').setValue(this.profissional.id_raca);
    this.form.get('id_endereco').setValue(this.profissional.id_endereco);
    this.form.get('ddi_telefone').setValue(this.profissional.ddi_telefone);
    this.form.get('num_telefone').setValue(this.profissional.num_telefone);
  }

  clickAddTecnologia() {}

  async onSubmit() {
    this.setLoading(true);

    const { nome, sigla } = this.form.value;

    try {
      const body = {
        nome,
        sigla,
      };

      let response: any;
      if (this.isNew) {
        response = await this.apiService.cadastrarProfissional(body);
      } else {
        response = await this.apiService.editarProfissional(
          this.profissional.id,
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
