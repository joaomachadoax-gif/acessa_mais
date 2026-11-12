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

    if (!form.bairro) {
      novosErros.bairro = "Selecione o bairro.";
    }

    if (!form.local.trim()) {
      novosErros.local = "Informe o endereço ou ponto de referência.";
    }

    if (!form.tipo) {
      novosErros.tipo = "Selecione o tipo de barreira.";
    }

    if (!form.gravidade) {
      novosErros.gravidade = "Selecione a gravidade.";
    }

    if (form.descricao.trim().length < 10) {
      novosErros.descricao =
        "Descreva o problema com pelo menos 10 caracteres.";
    }

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
    <section className="secao secao--relato">
      <div className="container container--estreito">
        <div className="cartao-relato">
          <div className="cartao-relato__texto">
            <span className="etiqueta etiqueta--amarela">Participe</span>

            <h1>Encontrou uma barreira no caminho?</h1>

            <p>
              Registre o local, o tipo de problema e uma descrição simples.
              Seu relato ajuda outras pessoas a se planejarem antes de sair de
              casa.
            </p>

            <ul className="lista-beneficios">
              <li>Leva menos de um minuto</li>
              <li>Ajuda a comunidade local</li>
              <li>Pode orientar melhorias urbanas</li>
            </ul>
          </div>

          <form className="formulario" onSubmit={aoEnviar} noValidate>
            <div className="campo">
              <label htmlFor="bairro">Bairro *</label>

              <select
                id="bairro"
                name="bairro"
                value={form.bairro}
                onChange={aoMudar}
                aria-invalid={!!erros.bairro}
              >
                <option value="">Selecione o bairro</option>

                {BAIRROS.map((bairro) => (
                  <option key={bairro} value={bairro}>
                    {bairro}
                  </option>
                ))}
              </select>

              <p className="erro">{erros.bairro}</p>
            </div>

            <div className="campo">
              <label htmlFor="local">Endereço ou referência *</label>

              <input
                id="local"
                name="local"
                type="text"
                value={form.local}
                onChange={aoMudar}
                aria-invalid={!!erros.local}
                placeholder="Ex.: Rua das Flores, 120"
              />

              <p className="erro">{erros.local}</p>
            </div>

            <div className="campo">
              <label htmlFor="tipo">Tipo de barreira *</label>

              <select
                id="tipo"
                name="tipo"
                value={form.tipo}
                onChange={aoMudar}
                aria-invalid={!!erros.tipo}
              >
                <option value="">Selecione o tipo</option>
                <option value="Calcada irregular">Calçada irregular</option>
                <option value="Falta de rampa">Falta de rampa</option>
                <option value="Obra">Obra</option>
                <option value="Iluminacao ruim">Iluminação ruim</option>
                <option value="Obstaculo">Obstáculo na calçada</option>
              </select>

              <p className="erro">{erros.tipo}</p>
            </div>

            <div className="campo">
              <label htmlFor="gravidade">Gravidade *</label>

              <select
                id="gravidade"
                name="gravidade"
                value={form.gravidade}
                onChange={aoMudar}
                aria-invalid={!!erros.gravidade}
              >
                <option value="">Selecione a gravidade</option>
                <option value="Alta">Alta</option>
                <option value="Media">Média</option>
                <option value="Baixa">Baixa</option>
              </select>

              <p className="erro">{erros.gravidade}</p>
            </div>

            <div className="campo">
              <label htmlFor="descricao">Descrição *</label>

              <textarea
                id="descricao"
                name="descricao"
                rows="4"
                value={form.descricao}
                onChange={aoMudar}
                aria-invalid={!!erros.descricao}
                placeholder="Descreva o problema encontrado"
              ></textarea>

              <p className="erro">{erros.descricao}</p>
            </div>

            <button
              type="submit"
              className="botao botao--primario botao--largura"
              disabled={carregando}
            >
              {carregando ? "Enviando..." : "Enviar relato"}
            </button>

            <p className="formulario__aviso">
              Protótipo acadêmico: os dados são salvos apenas neste navegador.
            </p>
          </form>
        </div>

        {coordenadas && <MapView centro={coordenadas} barreiras={[]} />}

        {enviado && (
          <div className="confirmacao" tabIndex="-1" role="status">
            <h2>Relato enviado com sucesso</h2>

            <p>
              A barreira foi marcada no mapa e está disponível em{" "}
              <Link to="/meus-relatos">Meus relatos</Link>.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}