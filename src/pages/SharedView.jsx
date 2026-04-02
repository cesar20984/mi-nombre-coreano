import { useParams, Link } from 'react-router-dom';
import { useMemo } from 'react';
import { Sparkles, Volume2, ArrowRight } from 'lucide-react';
import SpeakButton from '../components/SpeakButton';
import SEO from '../components/SEO';

/**
 * Encodes share data into a URL-safe base64 string.
 */
export function encodeShareData(obj) {
  return btoa(unescape(encodeURIComponent(JSON.stringify(obj))));
}

/**
 * Decodes a URL-safe base64 string back into an object.
 */
function decodeShareData(str) {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(str))));
  } catch {
    return null;
  }
}

/**
 * Builds a shareable URL for a specific type and data.
 * @param {'nombre'|'diccionario'|'mascota'|'tatuaje'} type
 * @param {object} data - { hangul, roman, desc?, meaning?, theme? }
 */
export function buildShareUrl(type, data) {
  const encoded = encodeShareData(data);
  return `${window.location.origin}/compartir/${type}/${encoded}`;
}

// Pastel theme configs for each type
const TYPE_CONFIG = {
  nombre: {
    title: 'Nombre en Coreano',
    subtitle: 'Este nombre fue generado en',
    bg: '#0f0c29',
    gradient: 'linear-gradient(to right, #24243e, #302b63, #0f0c29)',
    hangulColor: '#ffbaf2',
    romanColor: '#00f2fe',
    subColor: '#dcdcdc',
    wmColor: '#ffbaf2',
    wmOpacity: 0.06,
    cta: '¡Descubre tu nombre en coreano!',
    ctaLink: '/'
  },
  diccionario: {
    title: 'Nombre Coreano',
    subtitle: 'Descubierto en',
    bg: '#f9f9f7',
    gradient: null,
    hangulColor: '#1c281e',
    romanColor: '#2b3d2d',
    subColor: '#666',
    wmColor: '#000',
    wmOpacity: 0.04,
    cta: 'Explora más nombres coreanos',
    ctaLink: '/diccionario'
  },
  mascota: {
    title: 'Nombre Coreano para Mascota',
    subtitle: 'Encontrado en',
    bg: '#fff0f5',
    gradient: null,
    hangulColor: '#ff6b81',
    romanColor: '#2f3542',
    subColor: '#747d8c',
    wmColor: '#ff4757',
    wmOpacity: 0.05,
    cta: 'Encuentra nombres coreanos para mascotas',
    ctaLink: '/mascotas'
  },
  tatuaje: {
    title: 'Palabra Coreana para Tatuaje',
    subtitle: 'Inspiración de',
    bg: '#111111',
    gradient: 'linear-gradient(to right, #000, #434343)',
    hangulColor: '#e53e3e',
    romanColor: '#f7fafc',
    subColor: '#a0aec0',
    wmColor: '#e53e3e',
    wmOpacity: 0.04,
    cta: 'Descubre más palabras para tatuajes',
    ctaLink: '/tatuajes'
  }
};

export default function SharedView() {
  const { type, data: encodedData } = useParams();
  const data = useMemo(() => decodeShareData(encodedData), [encodedData]);
  const config = TYPE_CONFIG[type];

  if (!data || !config) {
    return (
      <section className="section" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container">
          <h1 className="display-md mb-4">Enlace no válido</h1>
          <p className="body-lg mb-6" style={{ color: 'var(--on-surface-variant)' }}>Este enlace ha expirado o no es válido.</p>
          <Link to="/" className="btn btn-primary">Ir a Koriname.com</Link>
        </div>
      </section>
    );
  }

  const hangul = data.hangul || data.korean || '';
  const roman = data.roman || data.romanized || '';
  const desc = data.desc || data.meaning || data.labelMeaning || '';
  
  // Use theme from data if it's a nombre type
  const themeFromData = data.theme;
  const bg = themeFromData?.bg || config.bg;
  const gradient = themeFromData?.gradient || config.gradient;
  const hangulColor = themeFromData?.hangul || config.hangulColor;
  const romanColor = themeFromData?.roman || config.romanColor;
  const subColor = themeFromData?.sub || config.subColor;
  const wmColor = themeFromData?.wm || config.wmColor;
  const wmOpacity = themeFromData?.wmOpacity || config.wmOpacity;

  return (
    <>
      <SEO 
        title={`${roman} (${hangul}) – ${config.title} | Koriname`}
        description={`${roman} significa "${desc}" en coreano. Descubre tu propio nombre coreano en Koriname.com`}
        keywords={`${roman}, ${hangul}, nombre coreano, significado`}
      />
      <section className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ maxWidth: '600px', margin: '0 auto' }}>
          
          {/* Card */}
          <div className="fade-in" style={{
            background: bg,
            backgroundImage: gradient || 'none',
            borderRadius: '1.5rem',
            padding: '3.5rem 2rem',
            position: 'relative',
            overflow: 'hidden',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            marginBottom: '2rem'
          }}>
            {/* Watermark */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontFamily: '"Noto Serif KR", serif',
              fontSize: '12rem',
              color: wmColor,
              opacity: wmOpacity,
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
              fontWeight: 900
            }}>
              이름
            </div>

            {/* Subtitle */}
            <p style={{
              color: subColor,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '0.5rem',
              position: 'relative',
              fontSize: '0.85rem'
            }}>
              {config.subtitle}
            </p>
            <p style={{
              color: subColor,
              fontWeight: 400,
              letterSpacing: '0.1em',
              marginBottom: '1.5rem',
              position: 'relative',
              fontSize: '0.75rem',
              opacity: 0.7
            }}>
              Koriname.com
            </p>

            {/* Hangul */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', position: 'relative' }}>
              <h1 className="korean-text" style={{ 
                fontSize: 'clamp(3.5rem, 12vw, 6rem)', 
                color: hangulColor, 
                lineHeight: 1.1,
                margin: 0
              }}>
                {hangul}
              </h1>
            </div>

            {/* Romanized */}
            <div style={{ marginTop: '1.5rem', position: 'relative' }}>
              <span style={{
                display: 'inline-block',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: romanColor,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                borderBottom: `2px solid ${romanColor}50`,
                paddingBottom: '0.5rem'
              }}>
                {roman}
              </span>
            </div>

            {/* Meaning */}
            {desc && (
              <p style={{
                fontSize: '0.95rem',
                color: subColor,
                marginTop: '2rem',
                position: 'relative',
                fontStyle: 'italic',
                lineHeight: 1.5
              }}>
                {desc}
              </p>
            )}
          </div>

          {/* Listen Button */}
          <div className="fade-in animate-delay-200" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'var(--surface-container-high)',
              padding: '0.75rem 1.5rem',
              borderRadius: '2rem',
              border: '1px solid var(--outline-variant)'
            }}>
              <Volume2 size={20} style={{ color: 'var(--primary)' }} />
              <span className="body-md" style={{ color: 'var(--on-surface)', fontWeight: 600 }}>Escucha la pronunciación:</span>
              <SpeakButton text={hangul} size={28} />
            </div>
          </div>

          {/* CTA */}
          <div className="fade-in animate-delay-300" style={{ textAlign: 'center' }}>
            <Link 
              to={config.ctaLink}
              className="btn btn-primary"
              style={{ 
                padding: '1rem 2.5rem', 
                fontSize: '1.1rem',
                borderRadius: '2rem',
                gap: '0.75rem',
                boxShadow: '0 8px 30px rgba(6, 27, 14, 0.2)'
              }}
            >
              <Sparkles size={20} />
              {config.cta}
              <ArrowRight size={20} />
            </Link>
            
            <p className="body-sm mt-6" style={{ opacity: 0.5 }}>
              Generado en <a href="https://koriname.com" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Koriname.com</a>
            </p>
          </div>

        </div>
      </section>
    </>
  );
}
