export default function Sobre() {
  return (
    <section className="secao secao--sobre">
      <div className="container container--estreito">
        <div className="cabecalho-secao">
          <span className="etiqueta etiqueta--verde">Sobre</span>
          <h1>Acessa+</h1>
          <p>
            Um protótipo de CitizenTech criado para ajudar moradores a
            consultar e relatar barreiras de acessibilidade urbana.
          </p>
        </div>

        <article className="cartao">
          <h2>O problema</h2>
          <p>
            Calçadas irregulares, falta de rampas, obras e má iluminação
            reduzem a autonomia de pessoas com deficiência, idosos e pedestres
            em geral.
          </p>
        </article>

        <article className="cartao">
          <h2>Nossa solução</h2>
          <p>
            O Acessa+ permite consultar barreiras no mapa, filtrar relatos,
            registrar novas ocorrências e acompanhar seu status.
          </p>
        </article>

        <article className="cartao">
          <h2>Limitação do protótipo</h2>
          <p>
            A linha entre origem e destino é uma rota simulada. Em uma versão
            futura, será possível calcular rotas reais e acessíveis com uma
            API de roteamento.
          </p>
        </article>

        <article className="cartao">
          <h2>ODS 11</h2>
          <p>
            O projeto contribui para cidades inclusivas, seguras e acessíveis,
            alinhado ao ODS 11.
          </p>
        </article>
      </div>
    </section>
  );
}