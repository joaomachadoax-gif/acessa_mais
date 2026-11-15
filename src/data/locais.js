export const ESTADOS = [
  { sigla: "SP", nome: "São Paulo" },
  { sigla: "RJ", nome: "Rio de Janeiro" },
  { sigla: "MG", nome: "Minas Gerais" }
];

export const CIDADES_POR_ESTADO = {
  SP: [
    { nome: "São Paulo" },
    { nome: "Campinas" },
    { nome: "Santos" }
  ],
  RJ: [
    { nome: "Rio de Janeiro" },
    { nome: "Niterói" },
    { nome: "Petrópolis" }
  ],
  MG: [
    { nome: "Belo Horizonte" },
    { nome: "Uberlândia" },
    { nome: "Juiz de Fora" }
  ]
};

export const BAIRROS_POR_CIDADE = {
  "São Paulo": [
    "Centro",
    "Vila Mariana",
    "Pinheiros",
    "Butantã",
    "Santana",
    "Mooca"
  ],
  "Campinas": [
    "Centro",
    "Cambuí",
    "Taquaral",
    "Barão Geraldo"
  ],
  "Santos": [
    "Centro",
    "Gonzaga",
    "Pompeia",
    "Encruzilhada"
  ],
  "Rio de Janeiro": [
    "Centro",
    "Copacabana",
    "Botafogo",
    "Tijuca",
    "Barra da Tijuca"
  ],
  "Niterói": [
    "Centro",
    "Icaraí",
    "Santa Rosa",
    "Ingá"
  ],
  "Petrópolis": [
    "Centro",
    "Quitandinha",
    "Corrêas",
    "Itaipava"
  ],
  "Belo Horizonte": [
    "Centro",
    "Savassi",
    "Serra",
    "Pampulha",
    "Buritis"
  ],
  "Uberlândia": [
    "Centro",
    "Santa Mônica",
    "Tabulância",
    "Osvaldo Rezende"
  ],
  "Juiz de Fora": [
    "Centro",
    "Granjas Betânia",
    "Santa Helena",
    "São Mateus"
  ]
};