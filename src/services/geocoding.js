const URL_NOMINATIM =
  "https://nominatim.openstreetmap.org/search";

const OPCOES_REQUISICAO = {
  headers: {
    "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8"
  }
};


function extrairCoordenadas(resultados) {
  if (!resultados || !resultados.length) {
    return null;
  }

  const primeiroResultado = resultados[0];

  return [
    Number(primeiroResultado.lat),
    Number(primeiroResultado.lon)
  ];
}


async function consultarNominatim(parametros) {
  const url = new URL(URL_NOMINATIM);

  Object.entries(parametros).forEach(([chave, valor]) => {
    if (valor) {
      url.searchParams.set(chave, valor);
    }
  });

  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("limit", "1");
  url.searchParams.set("countrycodes", "br");

  const resposta = await fetch(url, OPCOES_REQUISICAO);

  if (!resposta.ok) {
    throw new Error(
      "Não foi possível consultar a localização. Tente novamente."
    );
  }

  return resposta.json();
}


export async function buscarCoordenadas(endereco) {
  if (!endereco || !endereco.trim()) {
    throw new Error(
      "Informe um endereço ou ponto de referência."
    );
  }

  const enderecoLimpo = endereco.trim();

  try {
    const resultados = await consultarNominatim({
      q: `${enderecoLimpo}, Brasil`
    });

    const coordenadas = extrairCoordenadas(resultados);

    if (coordenadas) {
      return { coordenadas };
    }
  } catch (erro) {
    console.error("Erro na primeira busca de endereço:", erro);
  }

  try {
    const resultados = await consultarNominatim({
      q: enderecoLimpo
    });

    const coordenadas = extrairCoordenadas(resultados);

    if (coordenadas) {
      return { coordenadas };
    }
  } catch (erro) {
    console.error("Erro na segunda busca de endereço:", erro);
  }

  throw new Error(
    "Não foi possível localizar esse endereço. Tente incluir o número, o nome da rua ou um ponto de referência conhecido."
  );
}


export async function buscarCoordenadasComContexto({
  local,
  bairro,
  cidade,
  estado
}) {
  const partes = [
    local,
    bairro,
    cidade,
    estado
  ]
    .filter(Boolean)
    .map((parte) => parte.trim())
    .filter(Boolean);

  if (!partes.length) {
    throw new Error(
      "Informe um endereço ou ponto de referência."
    );
  }

  const enderecoCompleto = `${partes.join(", ")}, Brasil`;

  try {
    const resultados = await consultarNominatim({
      q: enderecoCompleto
    });

    const coordenadas = extrairCoordenadas(resultados);

    if (coordenadas) {
      return { coordenadas };
    }
  } catch (erro) {
    console.error(
      "Erro na busca com estado e cidade:",
      erro
    );
  }

  return buscarCoordenadas(local);
}