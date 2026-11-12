import { useState } from "react";
import MapView from "../components/MapView.jsx";
import { RELATOS_INICIAIS } from "../data/relatosIniciais.js";
import { calcularRotaAcessivel } from "../services/routing.js";

const CENTRO_PADRAO = [-23.5505, -46.6333];

export default function Trajeto() {
  const [origem, setOrigem] = useState(null);
  const [destino, setDestino] = useState(null);
  const [rota, setRota] = useState(null);
  const [instrucoes, setInstrucoes] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  function aoClicarNoMapa(evento) {
    const { lat, lng } = evento.latlng;
    const ponto = [lat, lng];

    if (!origem || (origem && destino)) {
      setOrigem(ponto);
      setDestino(null);
      setRota(null);
      setInstrucoes([]);
      setMensagem("Origem selecionada. Agora clique no destino.");
      return;
    }

    setDestino(ponto);
    buscarRota(ponto);
  }

  async function buscarRota(pontoDestino) {
    setCarregando(true);
    setErro("");
    setRota(null);
    setInstrucoes([]);

    try {
      const resultado = await calcularRotaAcessivel(origem, pontoDestino);

      setRota(resultado.coordenadasRota);
      setInstrucoes(resultado.instrucoes);
      setMensagem(
        `Rota acessível encontrada: ${resultado.distanciaKm} km, aproximadamente ${resultado.duracaoMinutos} minutos.`
      );
    } catch (erroAtual) {
      setErro(erroAtual.message);
      setDestino(null);
    } finally {
      setCarregando(false);
    }
  }

  function limparSelecao() {
    setOrigem(null);
    setDestino(null);
    setRota(null);
    setInstrucoes([]);
    setMensagem("");
    setErro("");
  }

  return (
    <section className="py-5">
      <div className="container">
        <div className="mb-4">
          <span className="etiqueta etiqueta-azul mb-3">Planejar</span>

          <h1 className="fw-bold">Selecione origem e destino</h1>

          <p className="text-body-secondary">
            Clique primeiro no ponto de origem e depois no destino. O site
            calculará uma rota acessível seguindo as ruas.
          </p>
        </div>

        {erro && <div className="alert alert-danger">{erro}</div>}

        <div className="alert alert-info" role="status" aria-live="polite">
          {carregando
            ? "Calculando rota acessível..."
            : mensagem || "Clique no mapa para selecionar a origem."}
        </div>

        <MapView
          centro={CENTRO_PADRAO}
          origem={origem}
          destino={destino}
          rota={rota}
          barreiras={RELATOS_INICIAIS}
          aoClicarNoMapa={aoClicarNoMapa}
        />

        {instrucoes.length > 0 && (
          <div className="card cartao-suave mt-4">
            <div className="card-body">
              <h2 className="h5 fw-bold mb-3">Instruções do trajeto</h2>

              <ol className="mb-0">
                {instrucoes.map((instrucao, indice) => (
                  <li key={indice}>{instrucao}</li>
                ))}
              </ol>
            </div>
          </div>
        )}

        <button
          type="button"
          className="btn botao-contorno-azul mt-4"
          onClick={limparSelecao}
        >
          Limpar seleção
        </button>
      </div>
    </section>
  );
}