import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  public tag_tokenAuth = 'token_auth';

  recuperarInformacao(key: string) {
    return window.localStorage.getItem(key);
  }

  cadastrarInformacao(key: string, info: string) {
    window.localStorage.setItem(key, info);
  }
}
