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
    <section className="py-5">
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
          <div>
            <span className="etiqueta etiqueta-verde mb-3">
              Acompanhamento
            </span>

            <h1 className="fw-bold mb-1">Meus relatos</h1>

            <p className="text-body-secondary mb-0">
              Veja as barreiras registradas neste dispositivo e atualize o
              status de cada ocorrência.
            </p>
          </div>

          <Link
            to="/relatar"
            className="btn botao-amarelo"
          >
            Relatar nova barreira
          </Link>
        </div>

        <div
          className="alert alert-info"
          role="status"
          aria-live="polite"
        >
          {mensagem ||
            (relatos.length
              ? `Você registrou ${relatos.length} relato(s).`
              : "Você ainda não registrou nenhuma barreira.")}
        </div>

        <div className="row g-4">
          {relatos.map((relato) => (
            <div className="col-md-6 col-lg-4" key={relato.id}>
              <RelatoCard relato={relato} />

              <button
                type="button"
                className="btn botao-contorno-azul w-100 mt-3"
                onClick={() => alterarStatus(relato.id, relato.status)}
              >
                {relato.status === "Aberto"
                  ? "Marcar como resolvido"
                  : "Reabrir relato"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}