import { useMemo, useState } from "react";
import MapView from "../components/MapView.jsx";
import FiltroBarreiras from "../components/FiltroBarreiras.jsx";
import RelatoCard from "../components/RelatoCard.jsx";
import { RELATOS_INICIAIS } from "../data/relatosIniciais.js";
import { obterRelatosSalvos } from "../services/relatos.js";

const CENTRO_PADRAO = [-23.5505, -46.6333];

export default function Barreiras() {
  const [filtros, setFiltros] = useState({
    bairro: "",
    tipo: "",
    gravidade: ""
  });

  const todosRelatos = [...RELATOS_INICIAIS, ...obterRelatosSalvos()];

  const relatosFiltrados = useMemo(() => {
    return todosRelatos.filter((relato) => {
      const mesmoBairro = !filtros.bairro || relato.bairro === filtros.bairro;
      const mesmoTipo = !filtros.tipo || relato.tipo === filtros.tipo;
      const mesmaGravidade =
        !filtros.gravidade || relato.gravidade === filtros.gravidade;

      return mesmoBairro && mesmoTipo && mesmaGravidade;
    });
  }, [filtros, todosRelatos]);

  function aoMudar(evento) {
    const { name, value } = evento.target;

    setFiltros((filtrosAnteriores) => ({
      ...filtrosAnteriores,
      [name]: value
    }));
  }

  function aoLimpar() {
    setFiltros({
      bairro: "",
      tipo: "",
      gravidade: ""
    });
  }

  return (
    <section className="secao">
      <div className="container">
        <div className="cabecalho-secao">
          <span className="etiqueta etiqueta--azul">Mapa</span>
          <h1>Barreiras por região</h1>
          <p>
            Selecione uma região para visualizar os relatos disponíveis e os
            pontos marcados no mapa.
          </p>
        </div>

        <FiltroBarreiras
          filtros={filtros}
          aoMudar={aoMudar}
          aoLimpar={aoLimpar}
        />

        <p role="status" aria-live="polite">
          {relatosFiltrados.length
            ? `${relatosFiltrados.length} relato(s) encontrado(s).`
            : "Nenhum relato encontrado com os filtros escolhidos."}
        </p>

        <MapView
          centro={CENTRO_PADRAO}
          barreiras={relatosFiltrados.filter(
            (relato) => relato.coordenadas
          )}
        />

        <section aria-labelledby="titulo-lista">
          <h2 id="titulo-lista">Relatos encontrados</h2>

          <ul className="lista-relatos">
            {relatosFiltrados.map((relato) => (
              <li key={relato.id}>
                <RelatoCard relato={relato} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}