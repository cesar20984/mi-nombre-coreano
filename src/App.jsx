import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

import Home from './pages/Home';
import Meanings from './pages/Meanings';
import Dictionary from './pages/Dictionary';
import Pets from './pages/Pets';
import Tattoos from './pages/Tattoos';
import SharedView from './pages/SharedView';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';
import Legal from './pages/Legal';
import Cookies from './pages/Cookies';
import Privacy from './pages/Privacy';
import About from './pages/About';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Inicio', path: '/' },
    { name: 'Diccionario A-Z', path: '/diccionario' },
    { name: 'Estructura', path: '/significados' },
    { name: 'Para Mascotas', path: '/mascotas' },
    { name: 'Para Tatuajes', path: '/tatuajes' }
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className="navbar glass">
        <div className="container nav-container">
          <Link to="/" className="nav-logo" onClick={closeMenu} style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/logo.svg" alt="Koriname Logo" style={{ height: '36px', width: 'auto', display: 'block' }} />
          </Link>

          <div className="nav-links">
            {links.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
            <span>MENÚ</span>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        {links.map(link => (
          <Link
            key={link.path}
            to={link.path}
            className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            onClick={closeMenu}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </>
  );
}

function Footer() {
  return (
    <footer className="section-footer">
      <div className="container">
        <div className="nav-logo" style={{ justifyContent: 'center', marginBottom: '1rem' }}>
          <Sparkles size={20} /> <span className="korean-text">아름다움</span>
        </div>
        <p className="body-sm" style={{ opacity: 0.7 }}>
          Elaborado con amor para acercar la cultura y estética coreana al mundo hispanohablante.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          <Link to="/quienes-somos" style={{ color: 'var(--on-surface-variant)', fontSize: '0.85rem', textDecoration: 'none' }}>Quiénes Somos</Link>
          <Link to="/aviso-legal" style={{ color: 'var(--on-surface-variant)', fontSize: '0.85rem', textDecoration: 'none' }}>Aviso Legal</Link>
          <Link to="/privacidad" style={{ color: 'var(--on-surface-variant)', fontSize: '0.85rem', textDecoration: 'none' }}>Privacidad</Link>
          <Link to="/cookies" style={{ color: 'var(--on-surface-variant)', fontSize: '0.85rem', textDecoration: 'none' }}>Cookies</Link>
        </div>
        <p className="body-sm mt-4" style={{ opacity: 0.5 }}>
          © {new Date().getFullYear()} Koriname.com. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="layout">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/significados" element={<Meanings />} />
            <Route path="/diccionario" element={<Dictionary />} />
            <Route path="/diccionario/:letter" element={<Dictionary />} />
            <Route path="/mascotas" element={<Pets />} />
            <Route path="/tatuajes" element={<Tattoos />} />
            <Route path="/nombre-en-coreano/:name" element={<SharedView />} />
            <Route path="/saju/:name" element={<SharedView />} />
            <Route path="/significado-nombre-coreano/:name" element={<SharedView />} />
            <Route path="/koriname-admin" element={<Admin />} />
            <Route path="/aviso-legal" element={<Legal />} />
            <Route path="/privacidad" element={<Privacy />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/quienes-somos" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
