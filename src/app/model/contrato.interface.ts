import { Empresa, UsuarioChave } from './empresa.interface';
import { Analista, Software, VersaoSofware } from './software.interface';

export interface StatusContrato {
  id: number;
  nome: string;
}

export interface Contrato {
  nro_contrato: number;
  empresa: {
    id: number;
    nome: string;
    usuario: UsuarioChave;
  };
  data_contratacao: string;
  data_formatted?: string;
  software: {
    id: number;
    nome: string;
    sigla: string;
    versao: VersaoSofware;
  };
  status_contrato: StatusContrato;
}
