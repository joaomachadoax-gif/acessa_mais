import { BAIRROS } from "../data/relatosIniciais.js";

export default function FiltroBarreiras({
  filtros,
  aoMudar,
  aoLimpar
}) {
  return (
    <form
      className="filtros"
      onSubmit={(evento) => evento.preventDefault()}
    >
      <div className="campo">
        <label htmlFor="bairro">Bairro</label>

        <select
          id="bairro"
          name="bairro"
          value={filtros.bairro}
          onChange={aoMudar}
        >
          <option value="">Todas as regiões</option>

          {BAIRROS.map((bairro) => (
            <option key={bairro} value={bairro}>
              {bairro}
            </option>
          ))}
        </select>
      </div>

      <div className="campo">
        <label htmlFor="tipo">Tipo de barreira</label>

        <select
          id="tipo"
          name="tipo"
          value={filtros.tipo}
          onChange={aoMudar}
        >
          <option value="">Todos os tipos</option>
          <option value="Calcada irregular">Calçada irregular</option>
          <option value="Falta de rampa">Falta de rampa</option>
          <option value="Obra">Obra</option>
          <option value="Iluminacao ruim">Iluminação ruim</option>
          <option value="Obstaculo">Obstáculo na calçada</option>
        </select>
      </div>

      <div className="campo">
        <label htmlFor="gravidade">Gravidade</label>

        <select
          id="gravidade"
          name="gravidade"
          value={filtros.gravidade}
          onChange={aoMudar}
        >
          <option value="">Todas</option>
          <option value="Alta">Alta</option>
          <option value="Media">Média</option>
          <option value="Baixa">Baixa</option>
        </select>
      </div>

      <button type="button" className="botao botao--secundario" onClick={aoLimpar}>
        Limpar filtros
      </button>
    </form>
  );
}