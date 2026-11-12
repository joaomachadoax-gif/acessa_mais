const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

export async function buscarCoordenadas(endereco) {
  const url = `${NOMINATIM_URL}?format=json&limit=1&q=${encodeURIComponent(
    endereco
  )}`;

  const resposta = await fetch(url, {
    headers: {
      "Accept-Language": "pt-BR"
    }
  });

  if (!resposta.ok) {
    throw new Error("Não foi possível localizar o endereço informado.");
  }

  const resultados = await resposta.json();

  if (!resultados.length) {
    throw new Error("Endereço não encontrado. Tente incluir cidade e estado.");
  }

  const resultado = resultados[0];

  return {
    enderecoCompleto: resultado.display_name,
    coordenadas: [Number(resultado.lat), Number(resultado.lon)]
  };
}