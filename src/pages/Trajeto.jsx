import { useState } from "react";
import MapView from "../components/MapView.jsx";
import { RELATOS_INICIAIS } from "../data/relatosIniciais.js";

const CENTRO_PADRAO = [-23.5505, -46.6333];

function calcularDistanciaKm(pontoA, pontoB) {
  const [latA, lonA] = pontoA;
  const [latB, lonB] = pontoB;

  const R = 6371;
  const dLat = ((latB - latA) * Math.PI) / 180;
  const dLon = ((lonB - lonA) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((latA * Math.PI) / 180) *
      Math.cos((latB * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return 2 * R * Math.asin(Math.sqrt(a));
}

export default function Trajeto() {
  const [origem, setOrigem] = useState(null);
  const [destino, setDestino] = useState(null);
  const [mensagem, setMensagem] = useState("");

  function aoClicarNoMapa(evento) {
    const { lat, lng } = evento.latlng;
    const ponto = [lat, lng];

    if (!origem || (origem && destino)) {
      setOrigem(ponto);
      setDestino(null);
      setMensagem("Origem selecionada. Agora clique no destino.");
      return;
    }

    setDestino(ponto);

    const distancia = calcularDistanciaKm(origem, ponto);

    setMensagem(
      `Trajeto simulado de aproximadamente ${distancia.toFixed(1)} km em linha reta.`
    );
  }

  function limparSelecao() {
    setOrigem(null);
    setDestino(null);
    setMensagem("");
  }

  const rota = origem && destino ? [origem, destino] : null;

  return (
    <section className="secao">
      <div className="container">
        <div className="cabecalho-secao">
          <span className="etiqueta etiqueta--azul">Planejar</span>
          <h1>Selecione origem e destino</h1>

          <p>
            Clique primeiro no ponto de origem e depois no destino. O mapa
            mostrará uma linha reta entre os pontos e os relatos de barreiras
            cadastrados.
          </p>
        </div>

        <p className="aviso">
          Protótipo: a linha representa uma distância aproximada e não uma
          rota real pelas ruas.
        </p>

        <p className="erro" role="alert">
          {mensagem}
        </p>

        <MapView
          centro={CENTRO_PADRAO}
          origem={origem}
          destino={destino}
          rota={rota}
          barreiras={RELATOS_INICIAIS}
          aoClicarNoMapa={aoClicarNoMapa}
        />

        <button
          type="button"
          className="botao botao--secundario"
          onClick={limparSelecao}
        >
          Limpar seleção
        </button>
      </div>
    </section>
  );
}