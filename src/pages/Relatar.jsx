import { useState } from "react";
import { Link } from "react-router-dom";
import MapView from "../components/MapView.jsx";
import { BAIRROS } from "../data/relatosIniciais.js";
import { salvarRelato } from "../services/relatos.js";
import { buscarCoordenadas } from "../services/geocoding.js";

const CENTRO_PADRAO = [-23.5505, -46.6333];

export default function Relatar() {
  const [form, setForm] = useState({
    bairro: "",
    local: "",
    tipo: "",
    gravidade: "",
    descricao: ""
  });

  const [erros, setErros] = useState({});
  const [coordenadas, setCoordenadas] = useState(null);
  const [enviado, setEnviado] = useState(false);
  const [carregando, setCarregando] = useState(false);

  function aoMudar(evento) {
    const { name, value } = evento.target;

    setForm((valoresAnteriores) => ({
      ...valoresAnteriores,
      [name]: value
    }));
  }

  function validar() {
    const novosErros = {};

    if (!form.bairro) novosErros.bairro = "Selecione o bairro.";
    if (!form.local.trim())
      novosErros.local = "Informe o endereço ou ponto de referência.";
    if (!form.tipo) novosErros.tipo = "Selecione o tipo de barreira.";
    if (!form.gravidade) novosErros.gravidade = "Selecione a gravidade.";
    if (form.descricao.trim().length < 10)
      novosErros.descricao =
        "Descreva o problema com pelo menos 10 caracteres.";

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  async function aoEnviar(evento) {
    evento.preventDefault();
    setEnviado(false);

    if (!validar()) return;

    setCarregando(true);

    try {
      const ponto = await buscarCoordenadas(`${form.local}, ${form.bairro}`);

      setCoordenadas(ponto.coordenadas);

      salvarRelato({
        id: Date.now(),
        ...form,
        status: "Aberto",
        data: new Date().toISOString().slice(0, 10),
        coordenadas: ponto.coordenadas
      });

      setEnviado(true);
    } catch (erro) {
      setErros({ local: erro.message });
    } finally {
      setCarregando(false);
    }
  }

  return (
    <section className="py-5 fundo-cinza-claro">
      <div className="container">
        <div className="row g-5 align-items-start">
          <div className="col-lg-5">
            <span className="etiqueta etiqueta-amarela mb-3">Participe</span>

            <h1 className="fw-bold">Encontrou uma barreira no caminho?</h1>

            <p className="text-body-secondary">
              Registre o local, o tipo de problema e uma descrição simples.
              Seu relato ajuda outras pessoas a se planejarem antes de sair de
              casa.
            </p>

            <ul className="list-unstyled">
              <li className="mb-2">✓ Leva menos de um minuto</li>
              <li className="mb-2">✓ Ajuda a comunidade local</li>
              <li className="mb-2">✓ Pode orientar melhorias urbanas</li>
            </ul>
          </div>

          <div className="col-lg-7">
            <div className="card cartao-suave">
              <div className="card-body p-4">
                <form onSubmit={aoEnviar} noValidate>
                  <div className="mb-3">
                    <label htmlFor="bairro" className="form-label">
                      Bairro *
                    </label>

                    <select
                      id="bairro"
                      name="bairro"
                      className={`form-select ${
                        erros.bairro ? "is-invalid" : ""
                      }`}
                      value={form.bairro}
                      onChange={aoMudar}
                    >
                      <option value="">Selecione o bairro</option>

                      {BAIRROS.map((bairro) => (
                        <option key={bairro} value={bairro}>
                          {bairro}
                        </option>
                      ))}
                    </select>

                    {erros.bairro && (
                      <div className="invalid-feedback">{erros.bairro}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="local" className="form-label">
                      Endereço ou referência *
                    </label>

                    <input
                      id="local"
                      name="local"
                      type="text"
                      className={`form-control ${
                        erros.local ? "is-invalid" : ""
                      }`}
                      value={form.local}
                      onChange={aoMudar}
                      placeholder="Ex.: Rua das Flores, 120"
                    />

                    {erros.local && (
                      <div className="invalid-feedback">{erros.local}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="tipo" className="form-label">
                      Tipo de barreira *
                    </label>

                    <select
                      id="tipo"
                      name="tipo"
                      className={`form-select ${
                        erros.tipo ? "is-invalid" : ""
                      }`}
                      value={form.tipo}
                      onChange={aoMudar}
                    >
                      <option value="">Selecione o tipo</option>
                      <option value="Calcada irregular">
                        Calçada irregular
                      </option>
                      <option value="Falta de rampa">Falta de rampa</option>
                      <option value="Obra">Obra</option>
                      <option value="Iluminacao ruim">Iluminação ruim</option>
                      <option value="Obstaculo">Obstáculo na calçada</option>
                    </select>

                    {erros.tipo && (
                      <div className="invalid-feedback">{erros.tipo}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="gravidade" className="form-label">
                      Gravidade *
                    </label>

                    <select
                      id="gravidade"
                      name="gravidade"
                      className={`form-select ${
                        erros.gravidade ? "is-invalid" : ""
                      }`}
                      value={form.gravidade}
                      onChange={aoMudar}
                    >
                      <option value="">Selecione a gravidade</option>
                      <option value="Alta">Alta</option>
                      <option value="Media">Média</option>
                      <option value="Baixa">Baixa</option>
                    </select>

                    {erros.gravidade && (
                      <div className="invalid-feedback">{erros.gravidade}</div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="descricao" className="form-label">
                      Descrição *
                    </label>

                    <textarea
                      id="descricao"
                      name="descricao"
                      rows="4"
                      className={`form-control ${
                        erros.descricao ? "is-invalid" : ""
                      }`}
                      value={form.descricao}
                      onChange={aoMudar}
                      placeholder="Descreva o problema encontrado"
                    ></textarea>

                    {erros.descricao && (
                      <div className="invalid-feedback">
                        {erros.descricao}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn botao-amarelo w-100"
                    disabled={carregando}
                  >
                    {carregando ? "Enviando..." : "Enviar relato"}
                  </button>

                  <p className="small text-body-secondary mt-3 mb-0">
                    Protótipo acadêmico: os dados são salvos apenas neste
                    navegador.
                  </p>
                </form>
              </div>
            </div>

            {coordenadas && <MapView centro={coordenadas} barreiras={[]} />}

            {enviado && (
              <div
                className="alert alert-success mt-4"
                role="status"
                tabIndex="-1"
              >
                <h2 className="h5 fw-bold mb-1">
                  Relato enviado com sucesso
                </h2>

                <p className="mb-0">
                  A barreira foi marcada no mapa e está disponível em{" "}
                  <Link to="/meus-relatos">Meus relatos</Link>.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}