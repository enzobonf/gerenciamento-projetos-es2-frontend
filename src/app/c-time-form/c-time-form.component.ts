import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Time } from '../model/time.interface';
import { ApiService } from '../services/api.service';
import { AppService } from '../services/app.service';
import { Profissional } from '../model/profissional.interface';
import { ClProfissionalSelectModalComponent } from '../cl-profissional-select-modal/cl-profissional-select-modal.component';

@Component({
  selector: 'app-c-time-form',
  templateUrl: './c-time-form.component.html',
  styleUrls: ['./c-time-form.component.scss'],
})
export class CTimeFormComponent {
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private appService: AppService,
    public dialogRef: MatDialogRef<CTimeFormComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data_dialog: any
  ) {}

  time: Time = null;
  profissionais: Profissional[] = [];
  profissionais_str: string | null = null;

  loading = false;
  isNew = true;

  public form: FormGroup = this.formBuilder.group({
    nome: [null, [Validators.required]],
  });

  ngOnInit(): void {
    const {
      time,
    }: {
      time?: Time;
    } = this.data_dialog;

    if (time) {
      this.time = time;
      this.isNew = false;
      this.setTime();
    }
  }

  setTime() {
    this.form.get('nome').setValue(this.time.nome);
    this.profissionais = this.time.profissionais;
    this.changeProfissionaisStr();
  }

  async onSubmit() {
    this.setLoading(true);

    const { nome } = this.form.value;

    try {
      const ids_profissionais = this.profissionais.map(x => x.id);

      const body = {
        nome,
        ids_profissionais,
      };

      let response: any;
      if (this.isNew) {
        response = await this.apiService.cadastrarTime(body);
      } else {
        response = await this.apiService.editarTime(this.time.id, body);
      }

      this.setLoading(false);
      this.showSnackBar('Salvo com sucesso!', 'OK', {
        verticalPosition: 'bottom',
        horizontalPosition: 'start',
        panelClass: ['snack-bar-success'],
        duration: 2000,
      });

      this.close({
        ...response,
      });
    } catch (err) {
      this.setLoading(false);
      console.log(err);
    }
  }

  openDialogSelectProfissionais() {
    const dialogRef = this.dialog.open(ClProfissionalSelectModalComponent, {
      disableClose: true,
      data: {
        oldProfissionais: this.profissionais,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.profissionais = result;
        this.changeProfissionaisStr();
      }
    });
  }

  changeProfissionaisStr() {
    this.profissionais_str = this.profissionais.length
      ? this.profissionais.map(x => `${x.nome} ${x.sobrenome}`).join(', ')
      : null;
  }

  close(data?: any) {
    this.dialogRef.close(data);
  }

  setLoading(loading: boolean) {
    this.appService.setLoading(loading);
  }

  showSnackBar(message: string, action: string, config: any) {
    this.appService.showSnackBar(message, action, config);
  }
}
