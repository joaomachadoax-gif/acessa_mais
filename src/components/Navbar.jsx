import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", texto: "Início" },
  { to: "/trajeto", texto: "Planejar trajeto" },
  { to: "/barreiras", texto: "Ver barreiras" },
  { to: "/relatar", texto: "Relatar barreira" },
  { to: "/meus-relatos", texto: "Meus relatos" },
  { to: "/sobre", texto: "Sobre" }
];

export default function Navbar() {
  const [aberto, setAberto] = useState(false);

  return (
    <header className="cabecalho">
      <div className="container cabecalho__conteudo">
        <NavLink to="/" className="logo">
          <span aria-hidden="true">♿</span> Acessa+
        </NavLink>

        <button
          className="menu-botao"
          aria-expanded={aberto}
          aria-controls="menu-principal"
          onClick={() => setAberto(!aberto)}
        >
          {aberto ? "Fechar menu" : "Abrir menu"}
        </button>

        <nav
          id="menu-principal"
          className={`menu ${aberto ? "aberto" : ""}`}
          aria-label="Menu principal"
        >
          <ul>
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  onClick={() => setAberto(false)}
                >
                  {link.texto}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}