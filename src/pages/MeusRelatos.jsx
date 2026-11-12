import { useState } from "react";
import { Link } from "react-router-dom";
import RelatoCard from "../components/RelatoCard.jsx";
import { obterRelatosSalvos, atualizarStatus } from "../services/relatos.js";

export default function MeusRelatos() {
  const [relatos, setRelatos] = useState(obterRelatosSalvos());
  const [mensagem, setMensagem] = useState("");

  function alterarStatus(id, statusAtual) {
    const novoStatus = statusAtual === "Aberto" ? "Resolvido" : "Aberto";

    atualizarStatus(id, novoStatus);
    setRelatos(obterRelatosSalvos());
    setMensagem(`Relato atualizado para "${novoStatus}".`);
  }

  return (
    <section className="secao">
      <div className="container">
        <div className="cabecalho-secao">
          <span className="etiqueta etiqueta--verde">Acompanhamento</span>
          <h1>Meus relatos</h1>
          <p>
            Veja as barreiras registradas neste dispositivo e atualize o
            status de cada ocorrência.
          </p>
        </div>

        <p role="status" aria-live="polite">
          {mensagem ||
            (relatos.length
              ? `Você registrou ${relatos.length} relato(s).`
              : "Você ainda não registrou nenhuma barreira.")}
        </p>

        <ul className="lista-relatos">
          {relatos.map((relato) => (
            <li key={relato.id}>
              <RelatoCard relato={relato} />

              <button
                type="button"
                className="botao botao--secundario"
                onClick={() => alterarStatus(relato.id, relato.status)}
              >
                {relato.status === "Aberto"
                  ? "Marcar como resolvido"
                  : "Reabrir relato"}
              </button>
            </li>
          ))}
        </ul>

        <Link to="/relatar" className="botao botao--primario">
          Relatar nova barreira
        </Link>
      </div>
    </section>
  );
}