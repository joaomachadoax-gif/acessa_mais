const ORS_URL =
  "https://api.openrouteservice.org/v2/directions/wheelchair/geojson";

export async function calcularRotaAcessivel(origem, destino) {
  const chave = import.meta.env.VITE_ORS_API_KEY;

  if (!chave) {
    throw new Error(
      "Chave da OpenRouteService não configurada no arquivo .env."
    );
  }

  const resposta = await fetch(ORS_URL, {
    method: "POST",
    headers: {
      Authorization: chave,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      coordinates: [
        [origem[1], origem[0]],
        [destino[1], destino[0]]
      ],
      elevation: false,
      instructions: true
    })
  });

  if (!resposta.ok) {
    if (resposta.status === 401 || resposta.status === 403) {
      throw new Error(
        "Chave da OpenRouteService inválida ou sem permissão."
      );
    }

    if (resposta.status === 404) {
      throw new Error(
        "Não foi possível encontrar uma rota entre os pontos selecionados."
      );
    }

    throw new Error("Não foi possível calcular a rota acessível.");
  }

  const dados = await resposta.json();
  const rota = dados.features?.[0];

  if (!rota) {
    throw new Error(
      "Nenhuma rota acessível foi encontrada entre os pontos informados."
    );
  }

  const coordenadasRota = rota.geometry.coordinates.map(
    ([longitude, latitude]) => [latitude, longitude]
  );

  return {
    coordenadasRota,
    distanciaKm: (rota.properties.summary.distance / 1000).toFixed(1),
    duracaoMinutos: Math.round(rota.properties.summary.duration / 60),
    instrucoes:
      rota.properties.segments?.[0]?.steps?.map(
        (passo) => passo.instruction
      ) || []
  };
}