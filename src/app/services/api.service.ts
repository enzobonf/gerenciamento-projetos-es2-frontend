import { Injectable } from '@angular/core';
import { statusConfig } from '../config/status.config';
import { Chamado } from '../model/chamado.interface';
import { Contrato } from '../model/contrato.interface';
import { Empresa } from '../model/empresa.interface';
import {
  Analista,
  Software,
  TecnologiaSoftware,
} from '../model/software.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { firstValueFrom, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private api = environment.API_URL;
  constructor(private http: HttpClient) {}

  async obterClientes() {
    return firstValueFrom(
      this.http.get<any>(this.api + '/cliente').pipe(take(1))
    );
  }

  async obterProfissionais() {
    return firstValueFrom(
      this.http.get<any>(this.api + '/profissional').pipe(take(1))
    );
  }

  async cadastrarProfissional(profissional: any) {
    return firstValueFrom(
      this.http
        .post<any>(this.api + '/profissional', profissional)
        .pipe(take(1))
    );
  }

  async editarProfissional(id_profissional: number, profissional: any) {
    return firstValueFrom(
      this.http
        .patch<any>(this.api + `/profissional/${id_profissional}`, profissional)
        .pipe(take(1))
    );
  }

  async removerProfissional(id_profissional: number) {
    return firstValueFrom(
      this.http
        .delete<any>(this.api + `/profissional/${id_profissional}`)
        .pipe(take(1))
    );
  }

  async obterGeneros() {
    return firstValueFrom(
      this.http.get<any>(this.api + '/genero').pipe(take(1))
    );
  }

  async obterEspecialidades() {
    return firstValueFrom(
      this.http.get<any>(this.api + '/especialidade').pipe(take(1))
    );
  }

  async obterRacas() {
    return firstValueFrom(this.http.get<any>(this.api + '/raca').pipe(take(1)));
  }

  async obterEnderecoPorCEP(cep: string) {
    return firstValueFrom(
      this.http.get<any>(this.api + `/endereco/cep/${cep}`).pipe(take(1))
    );
  }

  async obterTimes() {
    return firstValueFrom(this.http.get<any>(this.api + '/time').pipe(take(1)));
  }

  async cadastrarTime(time: any) {
    return firstValueFrom(
      this.http.post<any>(this.api + '/time', time).pipe(take(1))
    );
  }

  async editarTime(id_time: number, time: any) {
    return firstValueFrom(
      this.http.patch<any>(this.api + `/time/${id_time}`, time).pipe(take(1))
    );
  }

  async removerTime(id_time: number) {
    return firstValueFrom(
      this.http.delete<any>(this.api + `/time/${id_time}`).pipe(take(1))
    );
  }

  async obterProjetos() {
    return firstValueFrom(
      this.http.get<any>(this.api + '/projeto').pipe(take(1))
    );
  }

  async cadastrarProjeto(projeto: any) {
    return firstValueFrom(
      this.http.post<any>(this.api + '/projeto', projeto).pipe(take(1))
    );
  }

  async editarProjeto(id_projeto: number, projeto: any) {
    return firstValueFrom(
      this.http
        .patch<any>(this.api + `/projeto/${id_projeto}`, projeto)
        .pipe(take(1))
    );
  }

  async removerProjeto(id_profissional: number) {
    return firstValueFrom(
      this.http
        .delete<any>(this.api + `/projeto/${id_profissional}`)
        .pipe(take(1))
    );
  }

  async getSoftwares() {
    return firstValueFrom(
      this.http.get<any>(this.api + '/softwares').pipe(take(1))
    );
  }

  async postSoftware(software: any) {
    return firstValueFrom(
      this.http.post<any>(this.api + '/softwares', software).pipe(take(1))
    );
  }

  async putSoftware(id_software: number, software: any) {
    return firstValueFrom(
      this.http
        .put<any>(this.api + `/softwares/${id_software}`, software)
        .pipe(take(1))
    );
  }

  async deleteSoftware(id_software: number) {
    return firstValueFrom(
      this.http
        .delete<any>(this.api + `/softwares/${id_software}`)
        .pipe(take(1))
    );
  }

  async postVersao(id_software: number, versao: any) {
    return firstValueFrom(
      this.http
        .post<any>(this.api + `/softwares/${id_software}/versoes`, versao)
        .pipe(take(1))
    );
  }

  async setStatusVersaoSoftware(
    id_software: number,
    id_versao: number,
    id_status_versao: number
  ) {
    return firstValueFrom(
      this.http
        .put<any>(
          this.api + `/softwares/${id_software}/versoes/${id_versao}/status`,
          {
            id_status_versao,
          }
        )
        .pipe(take(1))
    );
  }

  async getTecnologias() {
    return firstValueFrom(
      this.http.get<any>(this.api + '/tecnologias').pipe(take(1))
    );
  }

  async getAnalistas() {
    return firstValueFrom(
      this.http.get<any>(this.api + '/analistas').pipe(take(1))
    );
  }

  async getUsuarioAtual() {
    return firstValueFrom(
      this.http.get<any>(this.api + '/usuario').pipe(take(1))
    );
  }

  async getAllStatusDesenvolvimento() {
    return firstValueFrom(
      this.http.get<any>(this.api + '/softwares/versoes/status').pipe(take(1))
    );
  }

  async getEmpresas() {
    return firstValueFrom(
      this.http.get<any>(this.api + '/empresas').pipe(take(1))
    );
  }

  async getContratos() {
    return firstValueFrom(
      this.http.get<any>(this.api + '/contratos').pipe(take(1))
    );
  }

  async postContrato(contrato: any) {
    return firstValueFrom(
      this.http.post<any>(this.api + `/contratos`, contrato).pipe(take(1))
    );
  }

  async putContrato(nro_contrato: number, contrato: any) {
    return firstValueFrom(
      this.http
        .put<any>(this.api + `/contratos/${nro_contrato}`, contrato)
        .pipe(take(1))
    );
  }

  async deleteContrato(nro_contrato: number) {
    return firstValueFrom(
      this.http
        .delete<any>(this.api + `/contratos/${nro_contrato}`)
        .pipe(take(1))
    );
  }

  async getAllStatusContrato() {
    return firstValueFrom(
      this.http.get<any>(this.api + '/contratos/status').pipe(take(1))
    );
  }

  async getChamados() {
    const chamados: Chamado[] = [
      {
        nro_ticket: 9627,
        data_abertura: '2023-03-07T13:03:53.873Z',
        empresa: {
          id: 8,
          nome: 'Costa, Batista e Macedo',
        },
        software: {
          id: 1,
          nome: 'Photoshop',
          sigla: 'PS',
          versao: {
            data: '2021-08-16',
            versao: '22.5.2',
            analista: {
              id: 1,
              nome: 'Lucas Oliveira',
              email: 'lucas.oliveira@example.com',
            },
            status_versao: {
              id: 2,
              nome: 'Em desenvolvimento',
            },
          },
        },
        descricao: 'Placeat nihil deserunt modi sunt quo placeat deleniti.',
        tipo_manutencao: {
          id: 1,
          nome: 'Erro',
        },
        status: {
          id: 2,
          nome: 'Realizado',
        },
      },
      {
        nro_ticket: 9668,
        data_abertura: '2023-03-08T01:23:34.248Z',
        empresa: {
          id: 1,
          nome: 'Saraiva LTDA',
        },
        software: {
          id: 1,
          nome: 'Photoshop',
          sigla: 'PS',
          versao: {
            data: '2021-08-16',
            versao: '22.5.2',
            analista: {
              id: 1,
              nome: 'Lucas Oliveira',
              email: 'lucas.oliveira@example.com',
            },
            status_versao: {
              id: 2,
              nome: 'Em desenvolvimento',
            },
          },
        },
        descricao: 'Laudantium qui pariatur.',
        tipo_manutencao: {
          id: 1,
          nome: 'Erro',
        },
        status: {
          id: 3,
          nome: 'Cancelado',
        },
      },
      {
        nro_ticket: 7154,
        data_abertura: '2023-03-07T08:37:13.755Z',
        empresa: {
          id: 6,
          nome: 'Batista, Xavier e Macedo',
        },
        software: {
          id: 2,
          nome: 'Microsoft Word',
          sigla: 'MSW',
          versao: {
            data: '2021-10-10',
            versao: '16.42',
            analista: {
              id: 3,
              nome: 'Mariana Silva',
              email: 'mariana.silva@example.com',
            },
            status_versao: {
              id: 2,
              nome: 'Em desenvolvimento',
            },
          },
        },
        descricao: 'Possimus pariatur iure a sunt.',
        tipo_manutencao: {
          id: 2,
          nome: 'Evolução de Funcionalidade',
        },
        status: {
          id: 1,
          nome: 'Em desenvolvimento',
        },
      },
      {
        nro_ticket: 8470,
        data_abertura: '2023-03-07T05:53:43.866Z',
        empresa: {
          id: 9,
          nome: 'Costa e Associados',
        },
        software: {
          id: 3,
          nome: 'Google Chrome',
          sigla: 'GC',
          versao: {
            data: '2021-11-23',
            versao: '96.0.4664.45',
            analista: {
              id: 2,
              nome: 'Fernanda Santos',
              email: 'fernanda.santos@example.com',
            },
            status_versao: {
              id: 1,
              nome: 'Disponível',
            },
          },
        },
        descricao: 'Sit eum ipsum veniam iste.',
        tipo_manutencao: {
          id: 1,
          nome: 'Erro',
        },
        status: {
          id: 3,
          nome: 'Cancelado',
        },
      },
    ];

    return new Promise((resolve, reject) => {
      resolve({ chamados });
    });
  }
}
