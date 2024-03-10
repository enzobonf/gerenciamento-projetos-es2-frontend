import { Profissional } from './profissional.interface';

export interface Time {
  id?: number;
  nome: string;
  profissionais: Profissional[];
}
