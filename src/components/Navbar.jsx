import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", texto: "Início" },
  { to: "/trajeto", texto: "Planejar trajeto" },
  { to: "/barreiras", texto: "Barreiras" },
  { to: "/relatar", texto: "Relatar" },
  { to: "/meus-relatos", texto: "Meus relatos" },
  { to: "/sobre", texto: "Sobre" }
];

export default function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark fundo-azul-escuro">
        <div className="container">
          <NavLink to="/" className="navbar-brand fw-bold">
            <span
              className="d-inline-flex align-items-center justify-content-center me-2"
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "12px",
                backgroundColor: "var(--amarelo-500)",
                color: "var(--azul-900)"
              }}
            >
              ♿
            </span>

            Acessa+
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            aria-controls="menuPrincipal"
            aria-expanded={menuAberto}
            aria-label="Alternar navegação"
            onClick={() => setMenuAberto(!menuAberto)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse ${menuAberto ? "show" : ""}`}
            id="menuPrincipal"
          >
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
              {links.map((link) => (
                <li className="nav-item" key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link active fw-semibold"
                        : "nav-link fw-semibold"
                    }
                    onClick={() => setMenuAberto(false)}
                  >
                    {link.texto}
                  </NavLink>
                </li>
              ))}

              <li className="nav-item ms-lg-3">
                <NavLink to="/relatar" className="btn botao-amarelo">
                  Relatar barreira
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}