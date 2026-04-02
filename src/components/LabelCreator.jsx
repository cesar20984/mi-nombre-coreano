import html2canvas from 'html2canvas';
import { useRef, useState, useEffect } from 'react';
import { Download, Copy, Share2, Printer, Check } from 'lucide-react';
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
  const [copying, setCopying] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const theme = THEMES.find(t => t.id === activeThemeId) || THEMES[0];

  const generateCanvas = async () => {
    if (!labelRef.current) return null;
    return await html2canvas(labelRef.current, {
      scale: 3,
      backgroundColor: theme.bg,
      useCORS: true,
      logging: false
    });
  };

  const downloadLabel = async () => {
    const canvas = await generateCanvas();
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `koriname-${result.romanized}.png`;
    link.href = dataUrl;
    link.click();
  };

  const copyLabel = async () => {
    const canvas = await generateCanvas();
    if (!canvas) return;
    
    setCopying(true);
    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          const item = new ClipboardItem({ "image/png": blob });
          await navigator.clipboard.write([item]);
          setTimeout(() => setCopying(false), 2000);
        } catch (err) {
          console.error("No se pudo copiar al portapapeles:", err);
          setCopying(false);
        }
      });
    } catch (e) {
      setCopying(false);
    }
  };

  const shareLabel = async () => {
    const canvas = await generateCanvas();
    if (!canvas) return;

    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], `koriname-${result.romanized}.png`, { type: 'image/png' });
      
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Mi Nombre en Coreano',
            text: `¡Mira mi nombre en coreano generado en Koriname.com! Soy ${result.romanized} (${result.korean})`,
            files: [file],
            url: window.location.href
          });
        } catch (err) {
          console.error("Error al compartir:", err);
        }
      } else {
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`Mira mi nombre en coreano: ${result.romanized} (${result.korean}) - Descubre el tuyo en ${window.location.href}`)}`;
        window.open(whatsappUrl, '_blank');
      }
    });
  };

  const printLabel = async () => {
    const canvas = await generateCanvas();
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    const win = window.open('', '_blank');
    win.document.write(`
      <html>
        <head>
          <title>Imprimir Tarjeta Koriname</title>
          <style>
            body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background: #fff; }
            img { max-width: 100%; height: auto; }
            @media print {
              img { max-width: 80mm; } 
            }
          </style>
        </head>
        <body onload="window.print();window.close()">
          <img src="${dataUrl}" />
        </body>
      </html>
    `);
  };

  if (!result) return null;


  return (
    <div className="fade-in animate-delay-200">
      <div className="text-center mb-6">
        <h2 className="title-lg mb-1" style={{ color: 'var(--secondary)' }}>Este sería tu nombre en coreano</h2>
        <p className="body-sm" style={{ opacity: 0.6, fontSize: '0.85rem' }}>
          Copia o comparte tu nombre con esta etiqueta personalizada
        </p>
      </div>

      
      <div className="label-canvas-container" style={{ display: 'flex', justifyContent: 'center' }}>
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

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isDesktop ? 'repeat(4, 1fr)' : 'repeat(2, 1fr)', 
        gap: '0.75rem', 
        maxWidth: '600px', 
        margin: '0 auto' 
      }}>
        <button className="btn btn-primary" onClick={downloadLabel} style={{ width: '100%', justifyContent: 'center' }}>
          <Download size={18} /> <span style={{ fontSize: '0.9rem' }}>Guardar</span>
        </button>
        
        <button className="btn" onClick={copyLabel} style={{ 
          width: '100%', justifyContent: 'center', 
          backgroundColor: copying ? 'var(--success-container)' : 'var(--surface-container-high)',
          color: copying ? 'var(--on-success-container)' : 'var(--on-surface)',
          border: '1px solid var(--outline-variant)'
        }}>
          {copying ? <Check size={18} /> : <Copy size={18} />}
          <span style={{ fontSize: '0.9rem' }}>{copying ? 'Copiado' : 'Copiar'}</span>
        </button>

        <button className="btn" onClick={shareLabel} style={{ width: '100%', justifyContent: 'center', backgroundColor: 'var(--surface-container-high)', color: 'var(--on-surface)', border: '1px solid var(--outline-variant)' }}>
          <Share2 size={18} /> <span style={{ fontSize: '0.9rem' }}>Compartir</span>
        </button>

        {isDesktop && (
          <button className="btn" onClick={printLabel} style={{ width: '100%', justifyContent: 'center', backgroundColor: 'var(--surface-container-high)', color: 'var(--on-surface)', border: '1px solid var(--outline-variant)' }}>
            <Printer size={18} /> <span style={{ fontSize: '0.9rem' }}>Imprimir</span>
          </button>
        )}
      </div>

      {!isDesktop && (
        <p className="body-sm text-center mt-4" style={{ opacity: 0.6 }}>
          💡 Para resultados óptimos al copiar, usa navegadores modernos.
        </p>
      )}
    </div>
  );
}

