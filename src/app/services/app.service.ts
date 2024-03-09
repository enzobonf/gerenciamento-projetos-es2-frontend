import { EventEmitter, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { snackBarConfig } from 'src/app/config/snack-bar.config';
import { Role } from '../config/role.enum';
import { SnackBarConfig } from '../model/snack-bar.interface';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(
    private snackBar: MatSnackBar,
    private _router: Router,
    private memory: LocalstorageService
  ) {}

  private auth: {
    id_usuario: number;
    id_tipo_usuario: number;

    isLogged: boolean;
    token_auth: string;

    usuario: firebase.default.User | undefined;
  } = {
    id_usuario: -1,
    id_tipo_usuario: -1,

    isLogged: false,
    token_auth: '',

    usuario: undefined,
  };

  loading = 0;
  loadingEventEmitter: EventEmitter<boolean> = new EventEmitter();
  alteracaoLogin = new EventEmitter<boolean>();
  addEventEmitter: EventEmitter<any> = new EventEmitter();

  setLogin(token_auth: string) {
    this.memory.cadastrarInformacao(this.memory.tag_tokenAuth, token_auth);

    this.auth = {
      id_usuario: -1,
      id_tipo_usuario: -1,

      isLogged: false,
      token_auth,
      usuario: undefined,
    };

    return true;
  }

  setLoginInfo(usuario: any) {
    this.auth = {
      isLogged: true,
      id_usuario: usuario.id,
      id_tipo_usuario: usuario.id_tipo_usuario,
      token_auth: this.auth.token_auth,
      usuario,
    };
  }

  logout() {
    console.log(this.auth);
    if (this.auth.token_auth) {
      this.memory.cadastrarInformacao(this.memory.tag_tokenAuth, 'null');

      this.auth = {
        id_usuario: -1,
        id_tipo_usuario: -1,
        isLogged: false,
        token_auth: '',
        usuario: undefined,
      };

      this.alteracaoLogin.emit(this.auth.isLogged);
      this._router.navigate(['/login']);
    }
  }

  getAuthToken() {
    return this.auth.token_auth;
  }

  getNomeUsuario() {
    return this.auth.usuario?.email || '';
  }

  getIdTipoUsuario() {
    return this.auth.id_tipo_usuario;
  }

  isAuthorized() {
    return this.auth.isLogged;
  }

  setLoading(loading: boolean) {
    if (loading) this.loading++;
    else if (this.loading > 0) this.loading--;
    this.loadingEventEmitter.emit(this.loading > 0);
  }

  showSnackBar(message: string, action: string, type: 'success' | 'error') {
    const config: any =
      type === 'success' ? snackBarConfig.success : snackBarConfig.error;

    if (config) {
      const verticalPosition: any = config.verticalPosition || 'bottom';
      const horizontalPosition: any = config.horizontalPosition || 'start';
      this.snackBar.open(message, action, {
        verticalPosition,
        horizontalPosition,
        panelClass: config.panelClass,
        duration: config?.duration ?? 5000,
      });
    } else {
      this.snackBar.open(message, action);
    }
  }
}
