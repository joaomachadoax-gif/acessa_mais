import { useMemo, useState } from "react";
import MapView from "../components/MapView.jsx";
import FiltroBarreiras from "../components/FiltroBarreiras.jsx";
import RelatoCard from "../components/RelatoCard.jsx";
import { RELATOS_INICIAIS } from "../data/relatosIniciais.js";
import { obterRelatosSalvos } from "../services/relatos.js";


const CENTRO_PADRAO = [-23.5505, -46.6333];

const FILTROS_VAZIOS = {
  estado: "",
  cidade: "",
  bairro: "",
  busca: "",
  descricao: "",
  tipo: "",
  gravidade: ""
};


export default function Barreiras() {
  const [filtrosAplicados, setFiltrosAplicados] = useState(FILTROS_VAZIOS);
  const [filtrosTemporarios, setFiltrosTemporarios] = useState(FILTROS_VAZIOS);

  const todosRelatos = [...RELATOS_INICIAIS, ...obterRelatosSalvos()];

  const relatosFiltrados = useMemo(() => {
    const busca = filtrosAplicados.busca.trim().toLowerCase();
    const descricao = filtrosAplicados.descricao.trim().toLowerCase();

    return todosRelatos.filter((relato) => {
      const textoRelato = [
        relato.titulo,
        relato.bairro,
        relato.cidade,
        relato.estado,
        relato.tipo,
        relato.descricao
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const descricaoRelato = (relato.descricao || "").toLowerCase();

      const correspondeBusca =
        !busca || textoRelato.includes(busca);

      const correspondeDescricao =
        !descricao || descricaoRelato.includes(descricao);

      const mesmoEstado =
        !filtrosAplicados.estado ||
        relato.estado === filtrosAplicados.estado;

      const mesmaCidade =
        !filtrosAplicados.cidade ||
        relato.cidade === filtrosAplicados.cidade;

      const mesmoBairro =
        !filtrosAplicados.bairro ||
        relato.bairro === filtrosAplicados.bairro;

      const mesmoTipo =
        !filtrosAplicados.tipo ||
        relato.tipo === filtrosAplicados.tipo;

      const mesmaGravidade =
        !filtrosAplicados.gravidade ||
        relato.gravidade === filtrosAplicados.gravidade;

      return (
        correspondeBusca &&
        correspondeDescricao &&
        mesmoEstado &&
        mesmaCidade &&
        mesmoBairro &&
        mesmoTipo &&
        mesmaGravidade
      );
    });
  }, [filtrosAplicados, todosRelatos]);


  function aoMudar(evento) {
    const { name, value } = evento.target;

    setFiltrosTemporarios((valoresAnteriores) => {
      const novosFiltros = {
        ...valoresAnteriores,
        [name]: value
      };

      if (name === "estado") {
        novosFiltros.cidade = "";
        novosFiltros.bairro = "";
      }

      if (name === "cidade") {
        novosFiltros.bairro = "";
      }

      return novosFiltros;
    });
  }

  function aoAplicarFiltros(evento) {
    evento.preventDefault();

    setFiltrosAplicados(filtrosTemporarios);
  }

  function aoLimpar() {
    setFiltrosTemporarios(FILTROS_VAZIOS);
    setFiltrosAplicados(FILTROS_VAZIOS);
  }


  return (
    <section className="py-5">
      <div className="container">
        <div className="mb-4">
          <span className="etiqueta etiqueta-azul mb-3">Mapa</span>

          <h1 className="fw-bold">Barreiras por região</h1>

          <p className="text-body-secondary">
            Pesquise e selecione filtros para visualizar os relatos disponíveis.
          </p>
        </div>

        <FiltroBarreiras
          filtros={filtrosTemporarios}
          aoMudar={aoMudar}
          aoAplicarFiltros={aoAplicarFiltros}
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