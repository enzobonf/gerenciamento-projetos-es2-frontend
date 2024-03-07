const { faker } = require('@faker-js/faker');
const fs = require('fs');

faker.setLocale('pt_BR');

const statusConfig = {
  disponivel: {
    id: 1,
    nome: 'Disponível',
  },
  desenvolvimento: {
    id: 2,
    nome: 'Em desenvolvimento',
  },
  fora: {
    id: 3,
    nome: 'Fora de uso',
  },
};

const statusContratoConfig = [
  {
    id: 1,
    nome: 'Ativo',
  },
  {
    id: 1,
    nome: 'Cancelado',
  },
  {
    id: 1,
    nome: 'Não vigente',
  },
  {
    id: 1,
    nome: 'Em contratação',
  },
];

const statusChamadoConfig = [
  {
    id: 1,
    nome: 'Em desenvolvimento',
  },
  {
    id: 2,
    nome: 'Realizado',
  },
  {
    id: 3,
    nome: 'Cancelado',
  }
]

const tipoManutencaoChamado = [
  {
    id: 1,
    nome: 'Erro',
  },
  {
    id: 2,
    nome: 'Evolução de Funcionalidade',
  },
  {
    id: 3,
    nome: 'Adaptativa',
  }
]

const analistas = [
  {
    id: 1,
    nome: 'Lucas Oliveira',
    email: 'lucas.oliveira@example.com',
  },
  {
    id: 2,
    nome: 'Fernanda Santos',
    email: 'fernanda.santos@example.com',
  },
  {
    id: 3,
    nome: 'Mariana Silva',
    email: 'mariana.silva@example.com',
  },
  {
    id: 4,
    nome: 'João Santos',
    email: 'joao.santos@example.com',
  },
  {
    id: 5,
    nome: 'Pedro Oliveira',
    email: 'pedro.oliveira@example.com',
  },
];


const softwares = [
  {
    id: 1,
    nome: 'Photoshop',
    sigla: 'PS',
    objetivo: 'Edição de imagens',
    versao_atual: {
      data: '2021-08-16',
      versao: '22.5.2',
      analista: analistas[0],
      status: statusConfig.desenvolvimento,
    },
  },
  {
    id: 2,
    nome: 'Microsoft Word',
    sigla: 'MSW',
    objetivo: 'Processamento de texto',
    versao_atual: {
      data: '2021-10-10',
      versao: '16.42',
      analista: analistas[2],
      status: statusConfig.desenvolvimento,
    },
  },
  {
    id: 3,
    nome: 'Google Chrome',
    sigla: 'GC',
    objetivo: 'Navegação na web',
    versao_atual: {
      data: '2021-11-23',
      versao: '96.0.4664.45',
      analista: analistas[1],
      status: statusConfig.disponivel,
    },
  },
  {
    id: 4,
    nome: 'Visual Studio Code',
    sigla: 'VSC',
    objetivo: 'Desenvolvimento de software',
    versao_atual: {
      data: '2021-11-15',
      versao: '1.61.2',
      analista: analistas[3],
      status: statusConfig.desenvolvimento,
    },
  },
];

// Função para gerar um endereço aleatório
function generateEndereco() {
  return {
    rua: faker.address.street(),
    numero: Math.floor(Math.random() * 9999) + 1,
    cidade: faker.address.city(),
    uf: faker.address.stateAbbr(),
    pais: 'Brasil',
    cep: faker.address.zipCode(),
  };
}

// Função para gerar um telefone
function generateTelefone() {
  return {
    id: +faker.random.numeric(),
    numero: faker.phone.number(),
  };
}

// Função para gerar um email
function generateEmail(){
  return {
    id: +faker.random.numeric(),
    endereco: faker.internet.email(),
  };
}

// Função para gerar um usuário chave
function generateUsuarioChave() {
  return {
    id: +faker.random.numeric(),
    nome: faker.name.fullName(),
    cpf: '000.000.000-00',
    email: faker.internet.email(),
    fones: [generateTelefone(1), generateTelefone(2)],
  };
}

// Função para gerar uma empresa
function generateEmpresa() {
  return {
    id: +faker.random.numeric(),
    nome: faker.company.name(),
    cnpj: '000000000',
    endereco: generateEndereco(),
    fones: [generateTelefone(1), generateTelefone(2)],
    emails: [generateEmail(1), generateEmail(2)],
    usuario_chave: generateUsuarioChave(1),
  };
}

function gerarNumeroAleatorio(min, max){
  return Math.floor(Math.random() * max) + min;
}

function generateContrato(empresa){

  const software = softwares[gerarNumeroAleatorio(0, 4)];

  return {
    nro_contrato: +faker.random.numeric(5),
    empresa: {
      id: empresa.id,
      nome: empresa.nome,
      usuario_chave: empresa.usuario_chave,
    },
    data_contratacao: faker.date.recent(),
    software: {
      id: software.id,
      nome: software.nome,
      sigla: software.sigla,
      versao: software.versao_atual
    },
    status: statusContratoConfig[gerarNumeroAleatorio(0, 4)],
  }

}

function generateChamado(contrato){

  const software = softwares[gerarNumeroAleatorio(0, 4)];

  return {
    nro_ticket:  +faker.random.numeric(4),
    data_abertura: faker.date.recent(),
    empresa: {
      id: contrato.empresa.id,
      nome: contrato.empresa.nome,
    },
    software: {
      id: contrato.software.id,
      nome: contrato.software.nome,
      sigla: contrato.software.sigla,
      versao: contrato.software.versao,
    },
    descricao: faker.lorem.lines(1),
    tipo_manutencao: tipoManutencaoChamado[gerarNumeroAleatorio(0, 3)],
    status: statusChamadoConfig[gerarNumeroAleatorio(0, 3)],
  }

}

// Gerando 10 endereços aleatórios
const empresas = [
  {
    "id": 8,
    "nome": "Costa, Batista e Macedo",
    "cnpj": "000000000",
    "endereco": {
      "rua": "Costa Avenida",
      "numero": 4171,
      "cidade": "Costa do Norte",
      "uf": "ES",
      "pais": "Brasil",
      "cep": "91123-227"
    },
    "fones": [
      {
        "id": 7,
        "numero": "+55 (92) 4970-6295"
      },
      {
        "id": 4,
        "numero": "(78) 12155-1787"
      }
    ],
    "emails": [
      {
        "id": 4,
        "endereco": "Meire_Martins33@live.com"
      },
      {
        "id": 6,
        "endereco": "Fabrcio.Costa4@live.com"
      }
    ],
    "usuario_chave": {
      "id": 4,
      "nome": "Benício Barros",
      "cpf": "000.000.000-00",
      "email": "Mait.Saraiva94@live.com",
      "fones": [
        {
          "id": 8,
          "numero": "(91) 89096-0559"
        },
        {
          "id": 9,
          "numero": "(61) 4479-2180"
        }
      ]
    }
  },
  {
    "id": 1,
    "nome": "Saraiva LTDA",
    "cnpj": "000000000",
    "endereco": {
      "rua": "Xavier Rodovia",
      "numero": 8623,
      "cidade": "Xavier de Nossa Senhora",
      "uf": "MS",
      "pais": "Brasil",
      "cep": "12353-712"
    },
    "fones": [
      {
        "id": 2,
        "numero": "(45) 67013-5199"
      },
      {
        "id": 9,
        "numero": "(35) 57014-0005"
      }
    ],
    "emails": [
      {
        "id": 6,
        "endereco": "Rebeca_Moreira@live.com"
      },
      {
        "id": 4,
        "endereco": "Clia_Saraiva@gmail.com"
      }
    ],
    "usuario_chave": {
      "id": 6,
      "nome": "Murilo Melo",
      "cpf": "000.000.000-00",
      "email": "Roberta.Silva53@hotmail.com",
      "fones": [
        {
          "id": 1,
          "numero": "(73) 3678-4934"
        },
        {
          "id": 1,
          "numero": "(26) 82894-5737"
        }
      ]
    }
  },
  {
    "id": 6,
    "nome": "Batista, Xavier e Macedo",
    "cnpj": "000000000",
    "endereco": {
      "rua": "Pedro Henrique Alameda",
      "numero": 2171,
      "cidade": "undefined Gúbio do Norte",
      "uf": "BA",
      "pais": "Brasil",
      "cep": "59135-800"
    },
    "fones": [
      {
        "id": 9,
        "numero": "(01) 13583-5391"
      },
      {
        "id": 9,
        "numero": "(59) 7036-9740"
      }
    ],
    "emails": [
      {
        "id": 9,
        "endereco": "Pietro33@hotmail.com"
      },
      {
        "id": 7,
        "endereco": "Marcela15@hotmail.com"
      }
    ],
    "usuario_chave": {
      "id": 2,
      "nome": "Bruna Pereira Neto",
      "cpf": "000.000.000-00",
      "email": "Rafaela_Souza@bol.com.br",
      "fones": [
        {
          "id": 7,
          "numero": "(82) 1823-4863"
        },
        {
          "id": 6,
          "numero": "(33) 0306-9878"
        }
      ]
    }
  },
  {
    "id": 9,
    "nome": "Costa e Associados",
    "cnpj": "000000000",
    "endereco": {
      "rua": "Kléber Marginal",
      "numero": 5742,
      "cidade": "undefined Lorenzo de Nossa Senhora",
      "uf": "MG",
      "pais": "Brasil",
      "cep": "89404-072"
    },
    "fones": [
      {
        "id": 5,
        "numero": "+55 (17) 3974-1030"
      },
      {
        "id": 5,
        "numero": "+55 (75) 3813-5797"
      }
    ],
    "emails": [
      {
        "id": 6,
        "endereco": "Melissa.Xavier@live.com"
      },
      {
        "id": 6,
        "endereco": "Daniel31@bol.com.br"
      }
    ],
    "usuario_chave": {
      "id": 2,
      "nome": "Dr. Alessandra Martins",
      "cpf": "000.000.000-00",
      "email": "Gustavo69@hotmail.com",
      "fones": [
        {
          "id": 5,
          "numero": "+55 (17) 2553-6840"
        },
        {
          "id": 4,
          "numero": "+55 (17) 1696-3461"
        }
      ]
    }
  }
];

const contratos = [
  {
    "nro_contrato": 23050,
    "empresa": {
      "id": 8,
      "nome": "Costa, Batista e Macedo",
      "usuario_chave": {
        "id": 4,
        "nome": "Benício Barros",
        "cpf": "000.000.000-00",
        "email": "Mait.Saraiva94@live.com",
        "fones": [
          {
            "id": 8,
            "numero": "(91) 89096-0559"
          },
          {
            "id": 9,
            "numero": "(61) 4479-2180"
          }
        ]
      }
    },
    "data_contratacao": "2023-03-07T03:29:15.852Z",
    "software": {
      "id": 1,
      "nome": "Photoshop",
      "sigla": "PS",
      "versao": {
        "data": "2021-08-16",
        "versao": "22.5.2",
        "analista": {
          "id": 1,
          "nome": "Lucas Oliveira",
          "email": "lucas.oliveira@example.com"
        },
        "status": {
          "id": 2,
          "nome": "Em desenvolvimento"
        }
      }
    },
    "status": {
      "id": 1,
      "nome": "Não vigente"
    }
  },
  {
    "nro_contrato": 63264,
    "empresa": {
      "id": 1,
      "nome": "Saraiva LTDA",
      "usuario_chave": {
        "id": 6,
        "nome": "Murilo Melo",
        "cpf": "000.000.000-00",
        "email": "Roberta.Silva53@hotmail.com",
        "fones": [
          {
            "id": 1,
            "numero": "(73) 3678-4934"
          },
          {
            "id": 1,
            "numero": "(26) 82894-5737"
          }
        ]
      }
    },
    "data_contratacao": "2023-03-07T04:41:57.183Z",
    "software": {
      "id": 1,
      "nome": "Photoshop",
      "sigla": "PS",
      "versao": {
        "data": "2021-08-16",
        "versao": "22.5.2",
        "analista": {
          "id": 1,
          "nome": "Lucas Oliveira",
          "email": "lucas.oliveira@example.com"
        },
        "status": {
          "id": 2,
          "nome": "Em desenvolvimento"
        }
      }
    },
    "status": {
      "id": 1,
      "nome": "Não vigente"
    }
  },
  {
    "nro_contrato": 77120,
    "empresa": {
      "id": 6,
      "nome": "Batista, Xavier e Macedo",
      "usuario_chave": {
        "id": 2,
        "nome": "Bruna Pereira Neto",
        "cpf": "000.000.000-00",
        "email": "Rafaela_Souza@bol.com.br",
        "fones": [
          {
            "id": 7,
            "numero": "(82) 1823-4863"
          },
          {
            "id": 6,
            "numero": "(33) 0306-9878"
          }
        ]
      }
    },
    "data_contratacao": "2023-03-07T15:56:09.970Z",
    "software": {
      "id": 2,
      "nome": "Microsoft Word",
      "sigla": "MSW",
      "versao": {
        "data": "2021-10-10",
        "versao": "16.42",
        "analista": {
          "id": 3,
          "nome": "Mariana Silva",
          "email": "mariana.silva@example.com"
        },
        "status": {
          "id": 2,
          "nome": "Em desenvolvimento"
        }
      }
    },
    "status": {
      "id": 1,
      "nome": "Ativo"
    }
  },
  {
    "nro_contrato": 95419,
    "empresa": {
      "id": 9,
      "nome": "Costa e Associados",
      "usuario_chave": {
        "id": 2,
        "nome": "Dr. Alessandra Martins",
        "cpf": "000.000.000-00",
        "email": "Gustavo69@hotmail.com",
        "fones": [
          {
            "id": 5,
            "numero": "+55 (17) 2553-6840"
          },
          {
            "id": 4,
            "numero": "+55 (17) 1696-3461"
          }
        ]
      }
    },
    "data_contratacao": "2023-03-08T02:02:57.203Z",
    "software": {
      "id": 3,
      "nome": "Google Chrome",
      "sigla": "GC",
      "versao": {
        "data": "2021-11-23",
        "versao": "96.0.4664.45",
        "analista": {
          "id": 2,
          "nome": "Fernanda Santos",
          "email": "fernanda.santos@example.com"
        },
        "status": {
          "id": 1,
          "nome": "Disponível"
        }
      }
    },
    "status": {
      "id": 1,
      "nome": "Em contratação"
    }
  }
];

const chamados = [];
for(let i = 0; i < contratos.length; i++){
  chamados.push(generateChamado(contratos[i]));
}

console.log(chamados);

fs.writeFileSync(
  `./chamados.json`,
  JSON.stringify(chamados, null, 2),
  'utf-8',
);

//console.log(contratos);

/* const empresa = generateEmpresa();
console.log(empresa, empresa.usuario_chave); */
