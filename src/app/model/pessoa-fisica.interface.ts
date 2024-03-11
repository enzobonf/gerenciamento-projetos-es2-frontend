import { Endereco } from './endereco.interface';

export interface Genero {
  id: number;
  identificacao: string;
}

export interface Raca {
  id: number;
  identificacao: string;
}

export interface PessoaFisica {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  ddi_telefone: string;
  num_telefone: string;
  id_genero: number;
  id_raca: number;
  id_endereco: number;
  numero_endereco: number;
  complemento_endereco: string | null;
  endereco?: Endereco;
  genero: Genero;
  raca: Raca;
}

export type Cliente = PessoaFisica;
