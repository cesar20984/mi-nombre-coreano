import html2canvas from 'html2canvas';
import { useRef, useState, useEffect } from 'react';
import { Download, Copy, Share2, Printer, Check, Sparkles } from 'lucide-react';
import SpeakButton from './SpeakButton';
import { downloadAsImage, copyAsImage, shareAsImage, printAsImage } from '../utils/shareUtils';
import { buildShareUrl } from '../pages/SharedView';

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

export default function LabelCreator({ result, isSharedView }) {
  const labelRef = useRef(null);
  const [activeThemeId, setActiveThemeId] = useState('kpop');
  const [copying, setCopying] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const theme = THEMES.find(t => t.id === activeThemeId) || THEMES[0];

  const handleDownload = () => downloadAsImage(labelRef.current, `koriname-${result.romanized}`, theme.bg);
  const handleCopy = () => copyAsImage(labelRef.current, theme.bg, setCopying);
  const handleShare = () => {
    const type = result.shareType || 'my-name';
    const shareUrl = buildShareUrl(type, {
      name: result.inputName || result.romanized,
      ...(result.shareData || {})
    });
    shareAsImage(
      labelRef.current, 
      theme.bg, 
      'Mi Nombre en Coreano', 
      `¡Mira mi nombre en coreano! Soy ${result.romanized} (${result.korean})`,
      shareUrl
    );
  };
  const handlePrint = () => printAsImage(labelRef.current, theme.bg, 'Imprimir Tarjeta Koriname');

  if (!result) return null;

  return (
    <div className="fade-in animate-delay-200">
      <div className="text-center mb-6">
        <h2 className="title-lg mb-1" style={{ color: 'var(--secondary)' }}>
          {isSharedView ? 'Escucha su pronunciación:' : 'Este sería tu nombre en coreano'}
        </h2>
        {isSharedView ? (
          <a href="/" className="btn btn-primary" style={{ marginTop: '0.75rem', borderRadius: '2rem', fontSize: '0.9rem', padding: '0.6rem 1.5rem' }}>
            <Sparkles size={16} /> Descubre otro nombre en coreano
          </a>
        ) : (
          <p className="body-sm" style={{ opacity: 0.6, fontSize: '0.85rem' }}>
            Copia o comparte tu nombre con esta etiqueta personalizada
          </p>
        )}
      </div>
      
      <div className="label-canvas-container" style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
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
          }}>Koriname.com</p>
          
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
              <SpeakButton text={result.korean} size={40} />
            </div>
          </div>
          
          {result.pronunciation && (
            <div style={{
              marginTop: '1rem',
              fontSize: '0.9rem',
              color: theme.sub,
              fontWeight: 500,
              fontStyle: 'italic',
              opacity: 0.8,
              letterSpacing: '0.1em',
              transition: 'color 0.5s ease'
            }}>
              ({result.pronunciation})
            </div>
          )}
          
          <div style={{
            marginTop: result.pronunciation ? '0.75rem' : '1.5rem',
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

          {/* Branding: transparent to user, HTML2Canvas makes it opaque */}
          <div className="capture-only" style={{ 
              textAlign: 'center',
              paddingTop: '0.75rem',
              borderTop: `1px solid ${theme.roman}30`,
              marginTop: '2rem',
              opacity: 0,
              transition: 'opacity 0.2s ease',
              color: theme.roman
          }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2rem', opacity: 0.7 }}>
                  Koriname.com
              </span>
          </div>

          {/* Mobile floating action buttons INSIDE the label */}
          {!isDesktop && (
            <div 
              data-html2canvas-ignore="true"
              className="label-mobile-actions"
              style={{
                position: 'absolute',
                bottom: '1rem',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '0.75rem',
                padding: '0.6rem 1.2rem',
                borderRadius: '2rem',
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                zIndex: 10,
                animation: 'floatPill 3s ease-in-out infinite'
              }}
            >
              <button 
                onClick={handleShare} 
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.roman, padding: '0.4rem', display: 'flex', alignItems: 'center', opacity: 0.85, transition: 'opacity 0.2s, transform 0.2s' }}
                title="Compartir"
                className="label-pill-btn"
              >
                <Share2 size={20} />
              </button>
              <button 
                onClick={handleDownload} 
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.roman, padding: '0.4rem', display: 'flex', alignItems: 'center', opacity: 0.85, transition: 'opacity 0.2s, transform 0.2s' }}
                title="Guardar"
                className="label-pill-btn"
              >
                <Download size={20} />
              </button>
              <button 
                onClick={handleCopy} 
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: copying ? '#4ade80' : theme.roman, padding: '0.4rem', display: 'flex', alignItems: 'center', opacity: 0.85, transition: 'opacity 0.2s, transform 0.2s, color 0.3s' }}
                title="Copiar"
                className="label-pill-btn"
              >
                {copying ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginTop: '2rem', marginBottom: '1.5rem' }}>
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
              fontSize: '0.85rem',
              fontWeight: 500,
              transition: 'all 0.2s ease'
            }}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* Desktop external buttons — hidden on mobile via CSS */}
      <div className="action-buttons-container grid-layout label-desktop-actions" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <button className="btn btn-primary btn-order-download" onClick={handleDownload} style={{ width: '100%', justifyContent: 'center' }}>
          <Download size={18} /> <span style={{ fontSize: '0.9rem' }}>Guardar</span>
        </button>
        
        <button className="btn btn-order-copy" onClick={handleCopy} style={{ 
          width: '100%', justifyContent: 'center', 
          backgroundColor: copying ? 'var(--success-container)' : 'var(--surface-container-high)',
          color: copying ? 'var(--on-success-container)' : 'var(--on-surface)',
          border: '1px solid var(--outline-variant)'
        }}>
          {copying ? <Check size={18} /> : <Copy size={18} />}
          <span style={{ fontSize: '0.9rem' }}>{copying ? 'Copiado' : 'Copiar'}</span>
        </button>

        <button className="btn btn-order-share" onClick={handleShare} style={{ width: '100%', justifyContent: 'center', backgroundColor: 'var(--surface-container-high)', color: 'var(--on-surface)', border: '1px solid var(--outline-variant)' }}>
          <Share2 size={18} /> <span style={{ fontSize: '0.9rem' }}>Compartir</span>
        </button>

        <button className="btn btn-print btn-order-print" onClick={handlePrint} style={{ width: '100%', justifyContent: 'center', backgroundColor: 'var(--surface-container-high)', color: 'var(--on-surface)', border: '1px solid var(--outline-variant)' }}>
          <Printer size={18} /> <span style={{ fontSize: '0.9rem' }}>Imprimir</span>
        </button>
      </div>
    </div>
  );
}
