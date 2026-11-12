import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="rodape">
      <div className="container rodape__conteudo">
        <div>
          <p className="logo rodape__logo">
            <span aria-hidden="true">♿</span> Acessa<span>+</span>
          </p>

          <p>
            Protótipo de CitizenTech para uma cidade mais acessível, inclusiva
            e segura.
          </p>
        </div>

        <nav aria-label="Links do rodapé">
          <ul>
            <li>
              <Link to="/barreiras">Barreiras</Link>
            </li>
            <li>
              <Link to="/relatar">Relatar</Link>
            </li>
            <li>
              <Link to="/sobre">Sobre</Link>
            </li>
          </ul>
        </nav>

        <p className="rodape__creditos">
          Mapa e dados © OpenStreetMap. Protótipo acadêmico.
        </p>
      </div>
    </footer>
  );
}