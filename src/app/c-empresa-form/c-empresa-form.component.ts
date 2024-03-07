import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Empresa } from '../model/empresa.interface';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-c-empresa-form',
  templateUrl: './c-empresa-form.component.html',
  styleUrls: ['./c-empresa-form.component.scss'],
})
export class CEmpresaFormComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<CEmpresaFormComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data_dialog: any
  ) {}

  empresa: Empresa = null;
  loading = false;
  isNew = true;

  displayedColumns: string[] = ['nome', 'cnpj'];

  public form: FormGroup = this.formBuilder.group({
    nome: [null, [Validators.required]],
    cnpj: [null, [Validators.required]],
  });

  ngOnInit(): void {
    const {
      empresa,
    }: {
      empresa?: Empresa;
    } = this.data_dialog;

    if (empresa) {
      this.empresa = empresa;
      this.isNew = false;
    }
  }

  setEmpresa() {}

  clickAddTecnologia() {}

  onSubmit() {
    this.close({});
  }

  close(data?: any) {
    this.dialogRef.close(data);
  }
}
