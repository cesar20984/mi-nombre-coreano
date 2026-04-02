import html2canvas from 'html2canvas';
import { useRef, useState } from 'react';
import { Download } from 'lucide-react';
import SpeakButton from './SpeakButton';

const THEMES = [
  {
    id: 'minimalist',
    name: 'Minimalista Clásico',
    bg: '#f9f9f7',
    gradient: null,
    hangul: '#1c281e', 
    roman: '#2b3d2d',
    sub: '#666666',
    wm: '#000000',
    wmOpacity: 0.04
  },
  {
    id: 'elegant',
    name: 'Elegancia Hanok',
    bg: '#1c1c1e',
    gradient: 'linear-gradient(135deg, #2b2d2f 0%, #1c1c1e 100%)',
    hangul: '#f2e8cf',
    roman: '#ffffff',
    sub: '#a59379',
    wm: '#f2e8cf',
    wmOpacity: 0.04
  },
  {
    id: 'kpop',
    name: 'K-Pop Neón',
    bg: '#0f0c29',
    gradient: 'linear-gradient(to right, #24243e, #302b63, #0f0c29)',
    hangul: '#ffbaf2',
    roman: '#00f2fe',
    sub: '#dcdcdc',
    wm: '#ffbaf2',
    wmOpacity: 0.06
  },
  {
    id: 'cute',
    name: 'Kawaii Vibe',
    bg: '#fff0f5', 
    gradient: null,
    hangul: '#ff6b81',
    roman: '#2f3542',
    sub: '#747d8c',
    wm: '#ff4757',
    wmOpacity: 0.05
  },
  {
    id: 'masculine',
    name: 'Guerrero Dark',
    bg: '#111111',
    gradient: 'linear-gradient(to right, #000000, #434343)',
    hangul: '#e53e3e',
    roman: '#f7fafc',
    sub: '#a0aec0',
    wm: '#e53e3e',
    wmOpacity: 0.04
  },
  {
    id: 'nature',
    name: 'Jardín de Té',
    bg: '#eef2e6',
    gradient: null,
    hangul: '#2d6a4f',
    roman: '#1b4332',
    sub: '#40916c',
    wm: '#1b4332',
    wmOpacity: 0.05
  }
];

export default function LabelCreator({ result }) {
  const labelRef = useRef(null);
  const [activeThemeId, setActiveThemeId] = useState('kpop');

  const theme = THEMES.find(t => t.id === activeThemeId) || THEMES[0];

  const downloadLabel = async () => {
    if (!labelRef.current) return;
    try {
      const canvas = await html2canvas(labelRef.current, {
        scale: 3, // High resolution
        backgroundColor: theme.bg // Use solid bg for canvas base
      });
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `mi-nombre-coreano-${result.romanized}.png`;
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error(e);
    }
  };

  if (!result) return null;

  return (
    <div className="fade-in animate-delay-200">
      <h3 className="title-md mb-6 text-center">Tu Etiqueta Personalizada</h3>
      
      {/* Theme Selector UI */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginBottom: '2rem' }}>
        {THEMES.map(t => (
          <button 
            key={t.id}
            onClick={() => setActiveThemeId(t.id)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '2rem',
              border: activeThemeId === t.id ? '2px solid var(--primary)' : '1px solid var(--outline-variant)',
              backgroundColor: activeThemeId === t.id ? 'var(--surface-container-high)' : 'transparent',
              color: activeThemeId === t.id ? 'var(--primary)' : 'var(--on-surface)',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 500,
              transition: 'all 0.2s ease',
              boxShadow: activeThemeId === t.id ? '0 2px 8px rgba(0,0,0,0.05)' : 'none'
            }}
          >
            {t.name}
          </button>
        ))}
      </div>

      <div className="label-canvas-container" style={{ display: 'flex', justifyContent: 'center' }}>
        {/* Visual Canvas to be Snapshotted */}
        <div 
          ref={labelRef} 
          style={{
            width: '100%',
            maxWidth: '500px',
            padding: '4rem 2rem',
            backgroundColor: theme.bg,
            backgroundImage: theme.gradient || 'none',
            position: 'relative',
            overflow: 'hidden',
            border: activeThemeId === 'minimalist' ? '1px solid var(--outline-variant)' : 'none',
            borderRadius: '1rem',
            textAlign: 'center',
            transition: 'background 0.5s ease',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
          }}
        >
          {/* Watermark specifically inside the label */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: '"Noto Serif KR", serif',
            fontSize: '12rem',
            color: theme.wm,
            opacity: theme.wmOpacity,
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            fontWeight: 900,
            transition: 'color 0.5s ease'
          }}>
            이름
          </div>

          <p style={{
            color: theme.sub,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '1rem',
            position: 'relative',
            transition: 'color 0.5s ease'
          }}>Mi Nombre en Coreano</p>
          
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', position: 'relative' }}>
            <h2 className="korean-text" style={{ 
              fontSize: '5rem', 
              color: theme.hangul, 
              lineHeight: 1.1,
              transition: 'color 0.5s ease'
            }}>
              {result.korean}
            </h2>
            <div data-html2canvas-ignore="true">
              {/* Speaker retains normal color locally inside its component but we scale it nicely */}
              <SpeakButton text={result.korean} size={40} />
            </div>
          </div>
          
          <div style={{
            marginTop: '1.5rem',
            position: 'relative',
            transition: 'color 0.5s ease'
          }}>
            <span style={{
              display: 'inline-block',
              fontSize: '1.25rem',
              fontWeight: 800,
              color: theme.roman,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              borderBottom: `2px solid ${theme.roman}50`,
              paddingBottom: '0.5rem',
              transition: 'all 0.5s ease'
            }}>
              {result.romanized}
            </span>
          </div>

          {result.labelMeaning && (
            <p style={{
              fontSize: '0.9rem',
              color: theme.sub,
              marginTop: '3rem',
              position: 'relative',
              fontStyle: 'italic',
              transition: 'color 0.5s ease'
            }}>
              {result.labelMeaning}
            </p>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
        <button className="btn btn-primary" onClick={downloadLabel}>
          <Download size={20} /> Guardar Etiqueta
        </button>
      </div>
    </div>
  );
}
