import { ESTADOS, CIDADES_POR_ESTADO, BAIRROS_POR_CIDADE } from "../data/locais.js";


export default function FiltroBarreiras({
  filtros,
  aoMudar,
  aoAplicarFiltros,
  aoLimpar
}) {
  const cidadesDisponiveis = filtros.estado
    ? CIDADES_POR_ESTADO[filtros.estado] || []
    : [];

  const bairrosDisponiveis = filtros.cidade
    ? BAIRROS_POR_CIDADE[filtros.cidade] || []
    : [];


  return (
    <form
      className="card border-0 shadow-sm p-4 mb-4"
      onSubmit={aoAplicarFiltros}
    >
      <h2 className="h5 fw-bold mb-3">Filtrar barreiras</h2>

      <div className="row g-3">
        <div className="col-12 col-md-3">
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

            {ESTADOS.map((estado) => (
              <option key={estado.sigla} value={estado.sigla}>
                {estado.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12 col-md-3">
          <label htmlFor="cidade" className="form-label fw-semibold">
            Cidade
          </label>

          <select
            id="cidade"
            name="cidade"
            className="form-select form-select-lg"
            value={filtros.cidade}
            onChange={aoMudar}
            disabled={!filtros.estado}
          >
            <option value="">
              {filtros.estado
                ? "Todas as cidades"
                : "Selecione um estado"}
            </option>

            {cidadesDisponiveis.map((cidade) => (
              <option key={cidade.nome} value={cidade.nome}>
                {cidade.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="bairro" className="form-label fw-semibold">
            Bairro
          </label>

          <select
            id="bairro"
            name="bairro"
            className="form-select form-select-lg"
            value={filtros.bairro}
            onChange={aoMudar}
            disabled={!filtros.cidade}
          >
            <option value="">
              {filtros.cidade
                ? "Todos os bairros"
                : "Selecione uma cidade"}
            </option>

            {bairrosDisponiveis.map((bairro) => (
              <option key={bairro} value={bairro}>
                {bairro}
              </option>
            ))}
          </select>
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
            <option value="Calçada irregular">Calçada irregular</option>
            <option value="Falta de rampa">Falta de rampa</option>
            <option value="Obstrução">Obstrução</option>
            <option value="Iluminação">Iluminação</option>
            <option value="Transporte">Transporte</option>
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
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
        </div>

        <div className="col-12 d-flex flex-wrap gap-2 mt-2">
          <button
            type="submit"
            className="btn btn-warning btn-lg d-inline-flex align-items-center gap-2"
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