import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
import { Endereco } from '../model/endereco.interface';

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

  @ViewChild('inputCep') inputCep: ElementRef;
  @ViewChild('inputNumero') inputNumero: ElementRef;

  profissional: Profissional = null;
  endereco: Endereco = null;
  loading = false;
  isNew = true;
  formReadOnly = true;

  generos: Genero[] = [];
  racas: Raca[] = [];
  especialidades: EspecialidadeProfissional[] = [];

  id_genero = -1;
  id_raca = -1;

  public form: FormGroup = this.formBuilder.group({
    nome: [null, [Validators.required]],
    sobrenome: [null, [Validators.required]],
    email: [null, [Validators.required]],
    id_especialidade: [null, [Validators.required]],
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
    }: {
      profissional?: Profissional;
    } = this.data_dialog;

    if (profissional) {
      this.profissional = profissional;
      this.endereco = profissional.endereco;
      this.isNew = false;
    }

    this.initForm();
  }

  get enderecoForm() {
    return this.form.get('endereco');
  }

  async initForm() {
    await Promise.all([
      this.getEspecialidades(),
      this.getRacas(),
      this.getGeneros(),
    ]);

    if (!this.isNew) {
      this.setProfissional();
      this.setEndereco(true);
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

  async buscarCep() {
    this.setLoading(true);
    const { endereco } = this.form.value;
    const cep = endereco.cep;

    try {
      const enderecoApi: Endereco = await this.apiService.obterEnderecoPorCEP(
        cep
      );

      this.endereco = enderecoApi;
      this.setEndereco(false);
      this.setLoading(false);
    } catch (err) {
      this.setLoading(false);
      this.appService.showSnackBar(
        `Não foi possível buscar o CEP.`,
        'Ok',
        'error'
      );
      //this.resetarForm();
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
    this.form.get('id_endereco').setValue(this.profissional.id_endereco);
    this.form.get('ddi_telefone').setValue(this.profissional.ddi_telefone);
    this.form.get('num_telefone').setValue(this.profissional.num_telefone);
    this.id_genero = this.profissional.id_genero;
    this.id_raca = this.profissional.id_raca;
  }

  setEndereco(setEspecifico = false) {
    if (!this.endereco) return;

    if (this.endereco.cep) {
      this.enderecoForm.get('cep').setValue(this.endereco.cep);
    }

    // this.cidades_uf = [{ id: 1, nome: this.endereco.cidade }];
    //this.unidades_federacao = [{ sigla: this.endereco.uf, nome: '' }];

    this.enderecoForm
      .get('logradouro')
      .setValue(`${this.endereco.tipo_logradouro} ${this.endereco.logradouro}`);

    this.enderecoForm.get('bairro').setValue(this.endereco.bairro);
    this.enderecoForm.get('cidade').setValue(this.endereco.cidade);
    this.enderecoForm.get('uf').setValue(this.endereco.uf);

    if (setEspecifico) {
      this.form.get('id_endereco').setValue(this.profissional.id_endereco);

      this.enderecoForm
        .get('complemento')
        .setValue(this.profissional.complemento_endereco);

      this.enderecoForm
        .get('numero')
        .setValue(this.profissional.numero_endereco);
    } else {
      this.form.get('id_endereco').setValue(this.endereco.id);
    }

    this.inputNumero.nativeElement.focus();
  }

  async onSubmit() {
    this.setLoading(true);

    const {
      nome,
      sobrenome,
      email,
      id_especialidade,
      ddi_telefone,
      num_telefone,
      id_endereco,
      endereco,
    } = this.form.value;

    const { numero, complemento } = endereco;

    try {
      const body = {
        nome,
        sobrenome,
        email,
        id_especialidade,
        ddi_telefone,
        num_telefone,
        id_endereco,
        id_genero: this.id_genero,
        id_raca: this.id_raca,
        numero_endereco: +numero,
        complemento_endereco: complemento,
      };

      console.log(body);

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

  changeGenero(id_genero: number) {
    this.id_genero = id_genero;
  }

  changeRaca(id_raca: number) {
    this.id_raca = id_raca;
  }

  close(data?: any) {
    this.dialogRef.close(data);
  }

  setLoading(loading: boolean) {
    this.appService.setLoading(loading);
  }
}
