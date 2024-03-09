export interface Endereco {
  tipo_logradouro: string;
  logradouro: string;
  numero: number;
  bairro?: string;
  cidade: string;
  uf: string;
  sigla_uf?: string;
  pais: string;
  cep: string;
}
