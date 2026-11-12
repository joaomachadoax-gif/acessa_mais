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
    <header className="cabecalho">
      <div className="container cabecalho__conteudo">
        <NavLink to="/" className="logo">
          <span className="logo__icone" aria-hidden="true">
            ♿
          </span>

          Acessa<span className="logo__mais">+</span>
        </NavLink>

        <button
          className="menu-botao"
          aria-expanded={menuAberto}
          aria-controls="menu-principal"
          onClick={() => setMenuAberto(!menuAberto)}
        >
          {menuAberto ? "Fechar menu" : "Abrir menu"}
        </button>

        <nav
          id="menu-principal"
          className={`menu ${menuAberto ? "aberto" : ""}`}
          aria-label="Menu principal"
        >
          <ul>
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    isActive ? "menu__link menu__link--ativo" : "menu__link"
                  }
                  onClick={() => setMenuAberto(false)}
                >
                  {link.texto}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <NavLink to="/relatar" className="botao botao--primario cabecalho__acao">
          Relatar barreira
        </NavLink>
      </div>
    </header>
  );
}