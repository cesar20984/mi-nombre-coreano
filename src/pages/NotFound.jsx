import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <>
      <SEO 
        title="Página no encontrada"
        description="La página que buscas no existe. Descubre tu nombre en coreano en Koriname.com"
      />
      <section className="section" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          
          {/* Hangul decorativo */}
          <div className="fade-in" style={{
            fontSize: 'clamp(5rem, 15vw, 8rem)',
            fontFamily: '"Noto Serif KR", serif',
            fontWeight: 900,
            lineHeight: 1,
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem',
            userSelect: 'none'
          }}>
            없다
          </div>

          <h1 className="display-md fade-in animate-delay-100 mb-2" style={{ fontSize: '2rem' }}>
            Página no encontrada
          </h1>
          
          <p className="body-lg fade-in animate-delay-200 mb-6" style={{ color: 'var(--on-surface-variant)', maxWidth: '400px', margin: '0 auto 2rem' }}>
            <strong style={{ color: 'var(--secondary)' }}>없다</strong> significa <em>"no existe"</em> en coreano. 
            Como esta página.
          </p>

          <div className="fade-in animate-delay-300" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
            <Link to="/" className="btn btn-primary" style={{ borderRadius: '2rem', padding: '0.85rem 2rem', gap: '0.5rem', width: '100%', maxWidth: '320px' }}>
              <Home size={18} />
              Descubre tu nombre en coreano
            </Link>
            
            <Link to="/diccionario" className="btn btn-secondary" style={{ borderRadius: '2rem', padding: '0.85rem 2rem', gap: '0.5rem', width: '100%', maxWidth: '320px' }}>
              <Search size={18} />
              Explorar diccionario A-Z
            </Link>

            <button 
              onClick={() => window.history.back()} 
              className="btn" 
              style={{ 
                borderRadius: '2rem', 
                padding: '0.85rem 2rem', 
                gap: '0.5rem', 
                width: '100%', 
                maxWidth: '320px',
                background: 'transparent',
                border: '1px solid var(--outline-variant)',
                color: 'var(--on-surface-variant)',
                cursor: 'pointer'
              }}
            >
              <ArrowLeft size={18} />
              Volver atrás
            </button>
          </div>

          <p className="body-sm fade-in animate-delay-300 mt-8" style={{ opacity: 0.4 }}>
            Error 404
          </p>

        </div>
      </section>
    </>
  );
}
