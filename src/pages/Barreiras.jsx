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

    setFiltros((valoresAnteriores) => ({
      ...valoresAnteriores,
      [name]: value
    }));
  }

  function aoLimpar() {
    setFiltros({ bairro: "", tipo: "", gravidade: "" });
  }

  return (
    <section className="py-5">
      <div className="container">
        <div className="mb-4">
          <span className="etiqueta etiqueta-azul mb-3">Mapa</span>
          <h1 className="fw-bold">Barreiras por região</h1>
          <p className="text-body-secondary">
            Selecione uma região para visualizar os relatos disponíveis.
          </p>
        </div>

        <FiltroBarreiras
          filtros={filtros}
          aoMudar={aoMudar}
          aoLimpar={aoLimpar}
        />

        <p className="text-body-secondary" role="status" aria-live="polite">
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

        <h2 className="h4 fw-bold mt-5 mb-3">Relatos encontrados</h2>

        <div className="row g-4">
          {relatosFiltrados.map((relato) => (
            <div className="col-md-6 col-lg-4" key={relato.id}>
              <RelatoCard relato={relato} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}