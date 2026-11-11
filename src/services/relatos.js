const CHAVE_STORAGE = "acessaMaisRelatos";

export function obterRelatosSalvos() {
  return JSON.parse(localStorage.getItem(CHAVE_STORAGE) || "[]");
}

export function salvarRelato(relato) {
  const relatos = obterRelatosSalvos();
  relatos.unshift(relato);
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(relatos));
}

export function atualizarStatus(id, novoStatus) {
  const relatos = obterRelatosSalvos().map((relato) =>
    relato.id === id ? { ...relato, status: novoStatus } : relato
  );

  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(relatos));
}