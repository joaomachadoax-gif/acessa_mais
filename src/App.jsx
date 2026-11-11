import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Trajeto from "./pages/Trajeto.jsx";
import Barreiras from "./pages/Barreiras.jsx";
import Relatar from "./pages/Relatar.jsx";
import MeusRelatos from "./pages/MeusRelatos.jsx";
import Sobre from "./pages/Sobre.jsx";

export default function App() {
  return (
    <>
      <a className="pular" href="#conteudo">
        Pular para o conteúdo principal
      </a>

      <Navbar />

      <main id="conteudo">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trajeto" element={<Trajeto />} />
          <Route path="/barreiras" element={<Barreiras />} />
          <Route path="/relatar" element={<Relatar />} />
          <Route path="/meus-relatos" element={<MeusRelatos />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}