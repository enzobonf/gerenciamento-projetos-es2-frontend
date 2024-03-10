import { Endereco } from './endereco.interface';

export interface Telefone {
  id: number;
  numero: string;
}

export interface Email {
  id: number;
  endereco: string;
}

export interface UsuarioChave {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  fones: Telefone[];
  id_tipo_usuario: number;
}

export interface Empresa {
  id: number;
  nome: string;
  cnpj: string;
  endereco: Endereco;
  fones: Telefone[];
  emails: Email[];
  usuario_chave: UsuarioChave;
  usuario?: UsuarioChave;
}
