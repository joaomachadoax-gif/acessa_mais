import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__texto">
            <span className="etiqueta">CitizenTech</span>

            <h1>
              Sua cidade, mais <span className="destaque">acessível</span>{" "}
              para todas as pessoas
            </h1>

            <p>
              Consulte barreiras urbanas, visualize o mapa da sua região e
              registre problemas como calçadas irregulares, falta de rampas,
              obras e má iluminação.
            </p>

            <div className="hero__acoes">
              <Link to="/barreiras" className="botao botao--primario">
                Explorar o mapa
              </Link>

              <Link to="/relatar" className="botao botao--contorno">
                Relatar barreira
              </Link>
            </div>

            <dl className="hero__indicadores">
              <div>
                <dt>128</dt>
                <dd>barreiras relatadas</dd>
              </div>

              <div>
                <dt>36</dt>
                <dd>locais monitorados</dd>
              </div>

              <div>
                <dt>89%</dt>
                <dd>relatos revisados</dd>
              </div>
            </dl>
          </div>

          <div className="hero__visual">
            <div
              className="cartao-mapa"
              aria-label="Prévia do mapa de acessibilidade"
            >
              <div className="cartao-mapa__topo">
                <span className="ponto ponto--verde"></span>
                <p>Rota com boa acessibilidade</p>
              </div>

              <div className="mapa-simulado">
                <span className="rota"></span>
                <span
                  className="marcador marcador--origem"
                  title="Origem"
                ></span>
                <span
                  className="marcador marcador--destino"
                  title="Destino"
                ></span>
                <span className="marcador marcador--alerta">⚠️</span>
              </div>

              <div className="cartao-mapa__rodape">
                <p>
                  <strong>Centro</strong> — 3 barreiras ativas
                </p>
                <span className="selo">Protótipo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="secao" id="como-funciona">
        <div className="container">
          <div className="cabecalho-secao">
            <span className="etiqueta etiqueta--azul">Como funciona</span>
            <h2>Três passos para se deslocar com mais segurança</h2>
            <p>
              O Acessa+ reúne informações colaborativas sobre obstáculos e
              barreiras encontradas no caminho.
            </p>
          </div>

          <div className="grade-passos">
            <article className="passo">
              <span className="passo__numero">01</span>
              <h3>Consulte a região</h3>
              <p>
                Escolha o bairro ou procure um endereço para ver as barreiras
                já registradas pelos moradores.
              </p>
            </article>

            <article className="passo">
              <span className="passo__numero">02</span>
              <h3>Analise os alertas</h3>
              <p>
                Filtre por calçada irregular, falta de rampa, obra ou
                iluminação ruim.
              </p>
            </article>

            <article className="passo">
              <span className="passo__numero">03</span>
              <h3>Registre o problema</h3>
              <p>
                Encontrou uma barreira? Envie um relato simples e ajude outras
                pessoas a se planejarem melhor.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="secao secao--recursos">
        <div className="container">
          <div className="cabecalho-secao">
            <span className="etiqueta etiqueta--verde">Recursos</span>
            <h2>Feito para ampliar a autonomia no dia a dia</h2>
          </div>

          <div className="grade-recursos">
            <article className="recurso">
              <div className="recurso__icone" aria-hidden="true">
                🗺️
              </div>
              <h3>Mapa colaborativo</h3>
              <p>
                Visualize barreiras registradas em diferentes regiões da
                cidade.
              </p>
            </article>

            <article className="recurso">
              <div className="recurso__icone" aria-hidden="true">
                🔍
              </div>
              <h3>Filtros inteligentes</h3>
              <p>
                Encontre apenas os obstáculos que impactam o seu deslocamento.
              </p>
            </article>

            <article className="recurso">
              <div className="recurso__icone" aria-hidden="true">
                📢
              </div>
              <h3>Relatos da comunidade</h3>
              <p>
                Compartilhe informações rápidas e úteis com outros moradores.
              </p>
            </article>

            <article className="recurso">
              <div className="recurso__icone" aria-hidden="true">
                ♿
              </div>
              <h3>Acessibilidade primeiro</h3>
              <p>
                Interface pensada para leitura clara, navegação por teclado e
                contraste adequado.
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}