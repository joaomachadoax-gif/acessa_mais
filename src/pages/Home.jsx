import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section className="hero py-5">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <span className="etiqueta etiqueta-amarela mb-3">
                CitizenTech
              </span>

              <h1 className="display-5 fw-bold">
                Sua cidade, mais{" "}
                <span className="texto-destaque">acessível</span> para todas
                as pessoas
              </h1>

              <p className="lead">
                Consulte barreiras urbanas, visualize o mapa da sua região e
                registre problemas como calçadas irregulares, falta de rampas,
                obras e má iluminação.
              </p>

              <div className="d-flex flex-wrap gap-3 mt-4">
                <Link to="/barreiras" className="btn botao-amarelo">
                  Explorar o mapa
                </Link>

                <Link to="/relatar" className="btn botao-contorno-branco">
                  Relatar barreira
                </Link>
              </div>

              <div className="row g-3 mt-5">
                <div className="col-4">
                  <div className="border border-light rounded-3 p-3 text-center">
                    <p className="h4 fw-bold text-warning mb-0">128</p>
                    <p className="small mb-0">barreiras relatadas</p>
                  </div>
                </div>

                <div className="col-4">
                  <div className="border border-light rounded-3 p-3 text-center">
                    <p className="h4 fw-bold text-warning mb-0">36</p>
                    <p className="small mb-0">locais monitorados</p>
                  </div>
                </div>

                <div className="col-4">
                  <div className="border border-light rounded-3 p-3 text-center">
                    <p className="h4 fw-bold text-warning mb-0">89%</p>
                    <p className="small mb-0">relatos revisados</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="card cartao-suave">
                <div className="card-body">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <span
                      className="d-inline-block rounded-circle"
                      style={{
                        width: "10px",
                        height: "10px",
                        backgroundColor: "var(--verde-600)"
                      }}
                    ></span>

                    <span className="small fw-semibold">
                      Rota com boa acessibilidade
                    </span>
                  </div>

                  <div
                    className="rounded-3 position-relative"
                    style={{
                      height: "240px",
                      backgroundColor: "var(--azul-100)"
                    }}
                  >
                    <div
                      className="position-absolute"
                      style={{
                        top: "50%",
                        left: "12%",
                        width: "70%",
                        height: "6px",
                        borderRadius: "999px",
                        backgroundColor: "var(--azul-800)",
                        transform: "rotate(-12deg)"
                      }}
                    ></div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <p className="small mb-0">
                      <strong>Centro</strong> — 3 barreiras ativas
                    </p>

                    <span className="badge text-success bg-light">
                      Protótipo
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="mb-5">
            <span className="etiqueta etiqueta-azul mb-3">Como funciona</span>
            <h2 className="fw-bold">Três passos para se deslocar com mais segurança</h2>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card cartao-suave h-100">
                <div className="card-body">
                  <span className="badge bg-primary mb-3">01</span>
                  <h3 className="h5">Consulte a região</h3>
                  <p className="text-body-secondary mb-0">
                    Escolha o bairro ou procure um endereço para ver as
                    barreiras já registradas.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card cartao-suave h-100">
                <div className="card-body">
                  <span className="badge bg-primary mb-3">02</span>
                  <h3 className="h5">Analise os alertas</h3>
                  <p className="text-body-secondary mb-0">
                    Filtre por calçada irregular, falta de rampa, obra ou
                    iluminação ruim.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card cartao-suave h-100">
                <div className="card-body">
                  <span className="badge bg-primary mb-3">03</span>
                  <h3 className="h5">Registre o problema</h3>
                  <p className="text-body-secondary mb-0">
                    Envie um relato simples e ajude outras pessoas a se
                    planejarem melhor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}