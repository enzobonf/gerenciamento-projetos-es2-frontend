import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Profissional } from '../model/profissional.interface';
import { AppService } from '../services/app.service';
import { ApiService } from '../services/api.service';

type ProfissionalShow = Profissional & {
  selected: boolean;
};

@Component({
  selector: 'app-cl-profissional-select-modal',
  templateUrl: './cl-profissional-select-modal.component.html',
  styleUrls: ['./cl-profissional-select-modal.component.scss'],
})
export class ClProfissionalSelectModalComponent {
  profissionais: ProfissionalShow[] = [];
  oldProfissionais: Set<number> = new Set();
  qtdSelected = 0;

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    private appService: AppService,
    public dialogRef: MatDialogRef<ClProfissionalSelectModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data_dialog: {
      oldProfissionais: Profissional[];
    } = {
      oldProfissionais: [],
    }
  ) {}

  ngOnInit(): void {
    const { oldProfissionais } = this.data_dialog;
    this.oldProfissionais = new Set(oldProfissionais.map(x => x.id));
    this.qtdSelected = this.oldProfissionais.size;

    this.getProfissionais();
  }

  async getProfissionais() {
    try {
      const { profissionais }: any = await this.apiService.obterProfissionais();
      this.profissionais = profissionais.map(profissional => {
        const aviarioSelected = this.oldProfissionais.has(profissional.id);
        return {
          ...profissional,
          selected: aviarioSelected,
        };
      });
    } catch (err) {
      console.log(err);
    }
  }

  showSnackBar(message: string, action: string, config: any) {
    this.appService.showSnackBar(message, action, config);
  }

  clickProfissional(profissional: ProfissionalShow | null) {
    console.log(profissional);
    if (profissional) {
      profissional.selected = !profissional.selected;
      this.qtdSelected += profissional.selected ? 1 : -1;
    }
  }

  onSave() {
    this.close(this.profissionais.filter(x => x.selected));
  }

  close(response: any) {
    this.dialogRef.close(response);
  }
}
