import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero__conteudo">
          <p className="etiqueta">CitizenTech</p>

          <h1>Consulte barreiras de acessibilidade na sua cidade</h1>

          <p>
            O Acessa+ ajuda moradores, pessoas com deficiência e idosos a
            conhecer barreiras urbanas, como calçadas irregulares, falta de
            rampas, obras e obstáculos.
          </p>

          <div className="hero__acoes">
            <Link className="botao botao--primario" to="/barreiras">
              Ver barreiras no mapa
            </Link>

            <Link className="botao botao--secundario" to="/relatar">
              Relatar uma barreira
            </Link>
          </div>
        </div>
      </section>

      <section className="secao">
        <div className="container">
          <h2>Como o Acessa+ ajuda você</h2>

          <div className="cartoes">
            <article className="cartao">
              <h3>Consulte antes de sair</h3>
              <p>Veja relatos de barreiras registrados pelos moradores.</p>
            </article>

            <article className="cartao">
              <h3>Filtre pelo que importa</h3>
              <p>Escolha bairro, tipo de barreira e nível de gravidade.</p>
            </article>

            <article className="cartao">
              <h3>Localize no mapa</h3>
              <p>Veja onde cada barreira foi registrada.</p>
            </article>

            <article className="cartao">
              <h3>Avise outras pessoas</h3>
              <p>Registre um obstáculo e ajude quem passa pelo mesmo lugar.</p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}