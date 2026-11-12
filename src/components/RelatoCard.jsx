import { formatarTipo, formatarData } from "../data/relatosIniciais.js";

export default function RelatoCard({ relato }) {
  const corGravidade =
    relato.gravidade === "Alta"
      ? "text-danger"
      : relato.gravidade === "Media"
      ? "text-warning"
      : "text-success";

  return (
    <article className="card cartao-suave h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h3 className="h6 fw-bold mb-0">
            {formatarTipo(relato.tipo)}
          </h3>

          <span className={`badge ${corGravidade} bg-light`}>
            Gravidade {relato.gravidade}
          </span>
        </div>

        <p className="mb-1">
          <strong>Local:</strong> {relato.local}
        </p>

        <p className="mb-1">
          <strong>Bairro:</strong> {relato.bairro}
        </p>

        <p className="text-body-secondary">{relato.descricao}</p>

        <span
          className={`badge ${
            relato.status === "Aberto" ? "bg-primary" : "bg-success"
          }`}
        >
          {relato.status}
        </span>

        <span className="small text-body-secondary ms-2">
          Registrado em {formatarData(relato.data)}
        </span>
      </div>
    </article>
  );
}