export const BAIRROS = [
  "Centro",
  "Jardim Paulista",
  "Vila Nova",
  "Bela Vista",
  "Parque Industrial"
];

export const TIPOS_BARRREIRA = {
  "Calcada irregular": "Calçada irregular",
  "Falta de rampa": "Falta de rampa",
  "Obra": "Obra",
  "Iluminacao ruim": "Iluminação ruim",
  "Obstaculo": "Obstáculo na calçada"
};

export const RELATOS_INICIAIS = [
  {
    id: 1,
    bairro: "Centro",
    local: "Rua das Flores, 120",
    tipo: "Calcada irregular",
    gravidade: "Alta",
    descricao: "Buraco profundo na calçada em frente à farmácia.",
    status: "Aberto",
    data: "2026-10-28",
    coordenadas: [-23.5505, -46.6333]
  },
  {
    id: 2,
    bairro: "Jardim Paulista",
    local: "Avenida Central com Rua do Mercado",
    tipo: "Falta de rampa",
    gravidade: "Alta",
    descricao: "Esquina sem rampa acessível.",
    status: "Aberto",
    data: "2026-10-30",
    coordenadas: [-23.5615, -46.656]
  },
  {
    id: 3,
    bairro: "Vila Nova",
    local: "Praça Central",
    tipo: "Iluminacao ruim",
    gravidade: "Media",
    descricao: "Postes apagados deixam o caminho escuro.",
    status: "Aberto",
    data: "2026-11-01",
    coordenadas: [-23.57, -46.64]
  }
];

export const formatarTipo = (tipo) => TIPOS_BARRREIRA[tipo] || tipo;

export const formatarData = (data) => {
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
};