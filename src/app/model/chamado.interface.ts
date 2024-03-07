import { VersaoSofware } from './software.interface';

export interface TipoManutencao {
  id: number;
  nome: string;
}

export interface StatusChamado {
  id: number;
  nome: string;
}

export interface Chamado {
  nro_ticket: number;
  data_abertura: string;
  data_formatted?: string;
  empresa: {
    id: number;
    nome: string;
  };
  software: {
    id: number;
    nome: string;
    sigla: string;
    versao: VersaoSofware;
  };
  descricao: string;
  tipo_manutencao: TipoManutencao;
  status: StatusChamado;
}
