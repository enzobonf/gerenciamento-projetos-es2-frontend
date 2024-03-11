import { Injectable } from '@angular/core';
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

  async getUsuarioAtual() {
    return firstValueFrom(
      this.http.get<any>(this.api + '/usuario').pipe(take(1))
    );
  }
}
