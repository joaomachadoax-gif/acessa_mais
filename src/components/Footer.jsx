import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="fundo-azul-escuro text-white py-5 mt-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-7">
            <p className="h5 fw-bold mb-2">Acessa+</p>
            <p className="mb-0">
              Protótipo de CitizenTech para uma cidade mais acessível,
              inclusiva e segura.
            </p>
          </div>

          <div className="col-md-5">
            <ul className="list-unstyled d-flex flex-wrap gap-3 mb-2">
              <li>
                <Link to="/barreiras" className="text-white text-decoration-none">
                  Barreiras
                </Link>
              </li>
              <li>
                <Link to="/relatar" className="text-white text-decoration-none">
                  Relatar
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-white text-decoration-none">
                  Sobre
                </Link>
              </li>
            </ul>

            <p className="small mb-0">
              Mapa e dados © OpenStreetMap. Protótipo acadêmico.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}