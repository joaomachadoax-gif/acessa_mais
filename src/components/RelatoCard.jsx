import { formatarTipo, formatarData } from "../data/relatosIniciais.js";

export default function RelatoCard({ relato }) {
  return (
    <article className="relatorio">
      <header>
        <h3>{formatarTipo(relato.tipo)}</h3>

        <span className={`tag tag--${relato.gravidade.toLowerCase()}`}>
          Gravidade {relato.gravidade}
        </span>
      </header>

      <p>
        <strong>Local:</strong> {relato.local}
      </p>

      <p>
        <strong>Bairro:</strong> {relato.bairro}
      </p>

      <p>{relato.descricao}</p>

      <p>
        <span
          className={`tag tag--${
            relato.status === "Aberto" ? "aberto" : "resolvido"
          }`}
        >
          {relato.status}
        </span>{" "}
        <span>Registrado em {formatarData(relato.data)}</span>
      </p>
    </article>
  );
}