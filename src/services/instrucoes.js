const DIRECOES = {
  left: "à esquerda",
  right: "à direita",
  "slight left": "levemente à esquerda",
  "slight right": "levemente à direita",
  "sharp left": "acentuadamente à esquerda",
  "sharp right": "acentuadamente à direita",
  straight: "em frente",
  uturn: "em U"
};


function traduzirDirecao(direcao) {
  return DIRECOES[direcao] || "";
}


function formatarDistancia(metros) {
  if (metros === undefined || metros === null) return "";

  if (metros < 1000) {
    return `${Math.round(metros)} metros`;
  }

  return `${(metros / 1000)
    .toFixed(1)
    .replace(".", ",")} km`;
}


export function traduzirInstrucao(instrucao) {
  if (!instrucao) return "Siga a rota.";


  if (typeof instrucao === "string") {
    return traduzirTextoPronto(instrucao);
  }

  const tipo = instrucao?.maneuver?.type || "";
  const direcao = traduzirDirecao(instrucao?.maneuver?.modifier);
  const nome = instrucao?.name || "";
  const distancia = formatarDistancia(instrucao?.distance);
  const saida = instrucao?.maneuver?.exit;

  switch (tipo) {
    case "depart":
      return `Comece o trajeto${
        nome ? ` em ${nome}` : ""
      }${distancia ? ` e siga por ${distancia}` : ""}.`;

    case "arrive":
      return "Você chegou ao destino.";

    case "turn":
      return `Vire ${direcao || "seguindo a rota"}${
        nome ? ` na ${nome}` : ""
      }${distancia ? ` e siga por ${distancia}` : ""}.`;

    case "new name":
      return `Continue${nome ? ` pela ${nome}` : ""}${
        distancia ? ` por ${distancia}` : ""
      }.`;

    case "continue":
      return `Continue ${direcao || "em frente"}${
        nome ? ` pela ${nome}` : ""
      }${distancia ? ` por ${distancia}` : ""}.`;

    case "merge":
      return `Entre ${direcao || "na via"}${
        nome ? ` na ${nome}` : ""
      }${distancia ? ` e siga por ${distancia}` : ""}.`;

    case "on ramp":
      return `Pegue o acesso ${direcao || ""}${
        nome ? ` para ${nome}` : ""
      }${distancia ? ` e siga por ${distancia}` : ""}.`;

    case "off ramp":
      return `Pegue a saída ${direcao || ""}${
        nome ? ` para ${nome}` : ""
      }${distancia ? ` e siga por ${distancia}` : ""}.`;

    case "fork":
      return `Mantenha-se ${direcao || "na bifurcação"}${
        nome ? ` pela ${nome}` : ""
      }${distancia ? ` por ${distancia}` : ""}.`;

    case "end of road":
      return `No fim da via, vire ${direcao || "seguindo a rota"}${
        nome ? ` na ${nome}` : ""
      }${distancia ? ` e siga por ${distancia}` : ""}.`;

    case "roundabout":
    case "rotary":
      return saida
        ? `Na rotatória, pegue a ${saida}ª saída${
            nome ? ` para ${nome}` : ""
          }${distancia ? ` e siga por ${distancia}` : ""}.`
        : `Entre na rotatória${
            nome ? ` e siga pela ${nome}` : ""
          }${distancia ? ` por ${distancia}` : ""}.`;

    case "exit roundabout":
    case "exit rotary":
      return `Saia da rotatória${
        nome ? ` para ${nome}` : ""
      }${distancia ? ` e siga por ${distancia}` : ""}.`;

    case "roundabout turn":
      return `Na rotatória, vire ${direcao || "seguindo a rota"}${
        nome ? ` na ${nome}` : ""
      }${distancia ? ` e siga por ${distancia}` : ""}.`;

    default:
      return `Siga ${direcao || "em frente"}${
        nome ? ` pela ${nome}` : ""
      }${distancia ? ` por ${distancia}` : ""}.`;
  }
}


function traduzirTextoPronto(texto) {
  const substituicoes = [
    ["depart", "Comece o trajeto"],
    ["arrive", "Você chegou ao destino"],
    ["turn left", "Vire à esquerda"],
    ["turn right", "Vire à direita"],
    ["turn slight left", "Vire levemente à esquerda"],
    ["turn slight right", "Vire levemente à direita"],
    ["turn sharp left", "Vire acentuadamente à esquerda"],
    ["turn sharp right", "Vire acentuadamente à direita"],
    ["continue straight", "Continue em frente"],
    ["continue", "Continue"],
    ["merge left", "Entre à esquerda"],
    ["merge right", "Entre à direita"],
    ["on ramp left", "Pegue o acesso à esquerda"],
    ["on ramp right", "Pegue o acesso à direita"],
    ["off ramp left", "Pegue a saída à esquerda"],
    ["off ramp right", "Pegue a saída à direita"],
    ["fork left", "Mantenha-se à esquerda na bifurcação"],
    ["fork right", "Mantenha-se à direita na bifurcação"],
    ["end of road left", "No fim da via, vire à esquerda"],
    ["end of road right", "No fim da via, vire à direita"],
    ["roundabout", "Entre na rotatória"],
    ["exit roundabout", "Saia da rotatória"],
    ["rotary", "Entre na rotatória"],
    ["exit rotary", "Saia da rotatória"],
    ["left", "à esquerda"],
    ["right", "à direita"],
    ["straight", "em frente"]
  ];

  let textoTraduzido = texto;

  substituicoes.forEach(([ingles, portugues]) => {
    textoTraduzido = textoTraduzido.replace(
      new RegExp(ingles, "gi"),
      portugues
    );
  });

  return textoTraduzido;
}