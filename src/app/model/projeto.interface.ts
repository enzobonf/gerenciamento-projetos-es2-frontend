import { Cliente } from './pessoa-fisica.interface';
import { Time } from './time.interface';

export interface Projeto {
  id: number;
  nome: string;
  objetivo: string;
  id_cliente: number;
  id_time_responsavel: number;
  data_inicio: Date;
  data_fim: Date;
  data_inicio_str?: string;
  data_fim_str?: string;
  valor: number;
  cliente: Cliente;
  time: Time;
  valor_str: string;
}
