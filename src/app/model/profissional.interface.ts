import { Endereco } from './endereco.interface';
import { PessoaFisica } from './pessoa-fisica.interface';

export interface EspecialidadeProfissional {
  id: number;
  nome: string;
}

export interface Profissional extends PessoaFisica {
  id_especialidade: number;
  especialidade: EspecialidadeProfissional;
}
