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
  const [erro, setErro] = useState("");

  function escolherPonto(evento) {
    const { lat, lng } = evento.latlng;
    const ponto = [lat, lng];

    if (!origem || (origem && destino)) {
      setOrigem(ponto);
      setDestino(null);
      setRota(null);
      setMensagem("Origem selecionada. Agora clique no destino.");
      return;
    }

    setDestino(ponto);

    const distancia = calcularDistanciaKm(origem, ponto);

    setMensagem(
      `Trajeto simulado de aproximadamente ${distancia.toFixed(1)} km em linha reta.`
    );
  }

  function setRota(valor) {
    return valor;
  }

  const rota = origem && destino ? [origem, destino] : null;

  return (
    <section className="secao">
      <div className="container">
        <h1>Planejar trajeto</h1>

        <p>
          Clique primeiro no ponto de origem e depois no destino. O mapa
          mostrará uma linha reta entre os pontos e os relatos de barreiras
          próximos.
        </p>

        <p className="aviso">
          Esta é uma versão de protótipo: a linha não representa uma rota real
          pelas ruas.
        </p>

        <p className="erro" role="alert">
          {erro}
        </p>

        <p role="status" aria-live="polite">
          {mensagem}
        </p>

        <MapView
          centro={CENTRO_PADRAO}
          origem={origem}
          destino={destino}
          rota={rota}
          barreiras={RELATOS_INICIAIS}
          aoClicarNoMapa={escolherPonto}
        />

        <MapContainer
        center={centro}
        zoom={14}
        scrollWheelZoom={true}
        eventHandlers={{
            click: (evento) => aoClicarNoMapa?.(evento)
        }}
        ></MapContainer>

        <button
          type="button"
          className="botao botao--secundario"
          onClick={() => {
            setOrigem(null);
            setDestino(null);
            setMensagem("");
          }}
        >
          Limpar seleção
        </button>
      </div>
    </section>
  );
}