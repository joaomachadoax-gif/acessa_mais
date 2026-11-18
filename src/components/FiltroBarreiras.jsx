import { useEffect, useState } from "react";
import { obterRelatosSalvos } from "../services/relatos.js";


const URL_ESTADOS =
  "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

const URL_MUNICIPIOS = (siglaEstado) =>
  `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${siglaEstado}/municipios?orderBy=nome`;


export default function FiltroBarreiras({
  filtros,
  aoMudar,
  aoAplicarFiltros,
  aoLimpar
}) {
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [carregandoCidades, setCarregandoCidades] = useState(false);

  const bairrosDisponiveis = filtros.cidade
    ? [
        ...new Set(
          obterRelatosSalvos()
            .filter(
              (relato) =>
                relato.cidade === filtros.cidade &&
                relato.bairro
            )
            .map((relato) => relato.bairro)
        )
      ].sort((a, b) => a.localeCompare(b, "pt-BR"))
    : [];


  useEffect(() => {
    async function carregarEstados() {
      try {
        const resposta = await fetch(URL_ESTADOS);
        const dados = await resposta.json();

        const estadosOrdenados = [...dados].sort((a, b) =>
          a.nome.localeCompare(b.nome, "pt-BR")
        );

        setEstados(estadosOrdenados);
      } catch (erro) {
        console.error("Erro ao carregar estados:", erro);
      }
    }

    carregarEstados();
  }, []);


  useEffect(() => {
    if (!filtros.estado) {
      setCidades([]);
      return;
    }

    async function carregarCidades() {
      setCarregandoCidades(true);

      try {
        const resposta = await fetch(URL_MUNICIPIOS(filtros.estado));
        const dados = await resposta.json();

        setCidades(dados);
      } catch (erro) {
        console.error("Erro ao carregar cidades:", erro);
        setCidades([]);
      } finally {
        setCarregandoCidades(false);
      }
    }

    carregarCidades();
  }, [filtros.estado]);


  return (
    <form
      className="card border-0 shadow-sm p-4 mb-4"
      onSubmit={aoAplicarFiltros}
    >
      <h2 className="h5 fw-bold mb-3">Filtrar barreiras</h2>

      <div className="row g-3">
        <div className="col-12 col-md-4">
          <label htmlFor="estado" className="form-label fw-semibold">
            Estado
          </label>

          <select
            id="estado"
            name="estado"
            className="form-select form-select-lg"
            value={filtros.estado}
            onChange={aoMudar}
          >
            <option value="">Todos os estados</option>

            {estados.map((estado) => (
              <option key={estado.id} value={estado.sigla}>
                {estado.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12 col-md-4">
          <label htmlFor="cidade" className="form-label fw-semibold">
            Cidade
          </label>

          <select
            id="cidade"
            name="cidade"
            className="form-select form-select-lg"
            value={filtros.cidade}
            onChange={aoMudar}
            disabled={!filtros.estado || carregandoCidades}
          >
            <option value="">
              {carregandoCidades
                ? "Carregando cidades..."
                : filtros.estado
                ? "Todas as cidades"
                : "Selecione um estado"}
            </option>

            {cidades.map((cidade) => (
              <option key={cidade.id} value={cidade.nome}>
                {cidade.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12 col-md-4">
          <label htmlFor="bairro" className="form-label fw-semibold">
            Bairro
          </label>

          <input
            type="text"
            id="bairro"
            name="bairro"
            className="form-control form-control-lg"
            placeholder={
              filtros.cidade
                ? "Digite o bairro"
                : "Selecione uma cidade"
            }
            value={filtros.bairro}
            onChange={aoMudar}
            disabled={!filtros.cidade}
            list="lista-bairros"
          />

          <datalist id="lista-bairros">
            {bairrosDisponiveis.map((bairro) => (
              <option key={bairro} value={bairro} />
            ))}
          </datalist>
        </div>

        <div className="col-12">
          <label htmlFor="busca" className="form-label fw-semibold">
            Buscar relato
          </label>

          <input
            type="text"
            id="busca"
            name="busca"
            className="form-control form-control-lg"
            placeholder="Ex.: calçada, rampa, ônibus, Praça da Sé"
            value={filtros.busca}
            onChange={aoMudar}
          />
        </div>

        <div className="col-12">
          <label htmlFor="descricao" className="form-label fw-semibold">
            Palavras na descrição
          </label>

          <textarea
            id="descricao"
            name="descricao"
            className="form-control"
            rows="4"
            placeholder="Digite palavras que podem estar na descrição do relato. Ex.: buraco, degrau, falta de rampa, obstáculo."
            value={filtros.descricao}
            onChange={aoMudar}
          ></textarea>
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="tipo" className="form-label fw-semibold">
            Tipo de barreira
          </label>

          <select
            id="tipo"
            name="tipo"
            className="form-select form-select-lg"
            value={filtros.tipo}
            onChange={aoMudar}
          >
            <option value="">Todos os tipos</option>
            <option value="Calcada irregular">
              Calçada irregular
            </option>
            <option value="Falta de rampa">
              Falta de rampa
            </option>
            <option value="Obra">Obra</option>
            <option value="Iluminacao ruim">
              Iluminação ruim
            </option>
            <option value="Obstaculo">
              Obstáculo na calçada
            </option>
          </select>
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="gravidade" className="form-label fw-semibold">
            Gravidade
          </label>

          <select
            id="gravidade"
            name="gravidade"
            className="form-select form-select-lg"
            value={filtros.gravidade}
            onChange={aoMudar}
          >
            <option value="">Todas as gravidades</option>
            <option value="Alta">Alta</option>
            <option value="Media">Média</option>
            <option value="Baixa">Baixa</option>
          </select>
        </div>

        <div className="col-12 d-flex flex-wrap gap-2 mt-2">
          <button
            type="submit"
            className="btn btn-primary btn-lg d-inline-flex align-items-center gap-2"
          >
            <i className="bi bi-search" aria-hidden="true"></i>
            Aplicar filtros
          </button>

          <button
            type="button"
            className="btn btn-outline-secondary btn-lg"
            onClick={aoLimpar}
          >
            Limpar filtros
          </button>
        </div>
      </div>
    </form>
  );
}