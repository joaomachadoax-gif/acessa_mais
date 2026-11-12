export default function Sobre() {
  return (
    <section className="py-5 fundo-azul-claro">
      <div className="container">
        <div className="mb-4">
          <span className="etiqueta etiqueta-verde mb-3">Sobre</span>
          <h1 className="fw-bold">Acessa+</h1>
          <p className="text-body-secondary">
            Um protótipo de CitizenTech criado para ajudar moradores a
            consultar e relatar barreiras de acessibilidade urbana.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="card cartao-suave h-100">
              <div className="card-body">
                <h2 className="h5 fw-bold">O problema</h2>
                <p className="text-body-secondary mb-0">
                  Calçadas irregulares, falta de rampas, obras e má iluminação
                  reduzem a autonomia de pessoas com deficiência, idosos e
                  pedestres.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card cartao-suave h-100">
              <div className="card-body">
                <h2 className="h5 fw-bold">Nossa solução</h2>
                <p className="text-body-secondary mb-0">
                  O Acessa+ permite consultar barreiras no mapa, filtrar
                  relatos, registrar novas ocorrências e acompanhar seu status.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card cartao-suave h-100">
              <div className="card-body">
                <h2 className="h5 fw-bold">Limitação do protótipo</h2>
                <p className="text-body-secondary mb-0">
                  A linha entre origem e destino é uma rota simulada. Para
                  rotas reais e acessíveis, seria necessária uma API de
                  roteamento.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card cartao-suave h-100">
              <div className="card-body">
                <h2 className="h5 fw-bold">ODS 11</h2>
                <p className="text-body-secondary mb-0">
                  O projeto contribui para cidades inclusivas, seguras e
                  acessíveis, alinhado ao ODS 11.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}