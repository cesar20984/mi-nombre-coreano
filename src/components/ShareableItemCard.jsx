import { useState, useRef } from 'react';
import { Download, Copy, Share2, Check, Printer } from 'lucide-react';
import SpeakButton from './SpeakButton';
import { copyAsImage, shareAsImage, downloadAsImage, printAsImage } from '../utils/shareUtils';
import { buildShareUrl } from '../pages/SharedView';

/**
 * Reusable card for list items (pets, tattoos, dictionary)
 * Optimized for aesthetics and sharing with hidden branding that 
 * does not affect the layout during capture.
 */
export default function ShareableItemCard({ 
  hangul, 
  roman, 
  desc, 
  icon: Icon,
  shareTitle,
  shareText,
  shareType // 'diccionario' | 'mascota' | 'tatuaje'
}) {
  const cardRef = useRef(null);
  const [copying, setCopying] = useState(false);

  const handleDownload = () => downloadAsImage(cardRef.current, `koriname-${roman}`, '#ffffff');
  const handleCopy = () => copyAsImage(cardRef.current, '#ffffff', setCopying);
  const handleShare = () => {
    const shareUrl = buildShareUrl(shareType || 'diccionario', { hangul, roman, desc });
    shareAsImage(cardRef.current, '#ffffff', shareTitle, shareText, shareUrl);
  };
  const handlePrint = () => printAsImage(cardRef.current, '#ffffff', shareTitle);

  return (
    <div className="card hover-up" style={{ 
      display: 'flex', 
      flexDirection: 'column',
      position: 'relative',
      padding: '1.5rem',
      borderRadius: '1.25rem'
    }}>
      {/* Visual part to be captured */}
      <div ref={cardRef} style={{ background: '#ffffff', borderRadius: '0.75rem', position: 'relative' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          {Icon && (
            <div style={{ 
              padding: '0.75rem', 
              background: 'var(--primary-container)', 
              borderRadius: '1rem',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <Icon size={24} />
            </div>
          )}
          <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <h3 className="title-md korean-text" style={{ margin: 0, fontSize: '2.5rem', color: 'var(--on-surface)' }}>{hangul}</h3>
              <div data-html2canvas-ignore="true">
                <SpeakButton text={hangul} size={24} />
              </div>
            </div>
            <p className="body-md" style={{ fontWeight: 800, color: 'var(--primary)', margin: '0.5rem 0', letterSpacing: '0.1em', fontSize: '1.2rem' }}>{roman}</p>
          </div>
        </div>
        
        <p className="body-md" style={{ color: 'var(--on-surface-variant)', margin: '1rem auto 1.5rem auto', lineHeight: 1.5, textAlign: 'center', maxWidth: '90%' }}>
          {desc}
        </p>
        
        {/* Branding: Always present, takes space, but transparent to user. HTML2Canvas makes it opaque. */}
        <div className="capture-only" style={{ 
            textAlign: 'center',
            paddingTop: '0.75rem',
            borderTop: '1px solid #f0f0f0',
            marginTop: '0.5rem',
            opacity: 0,
            transition: 'opacity 0.2s ease',
            color: '#bbb'
        }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2rem' }}>
                Koriname.com
            </span>
        </div>
      </div>

      {/* Action Buttons - Ignored in capture */}
      <div data-html2canvas-ignore="true" className="action-buttons-container" style={{ marginTop: '0.5rem' }}>
        <button onClick={handleDownload} className="btn-icon btn-order-download" title="Guardar imagen"><Download size={18} /></button>
        <button onClick={handleCopy} className="btn-icon btn-order-copy" title="Copiar" style={{ background: copying ? 'var(--success-container)' : '' }}>
          {copying ? <Check size={18} /> : <Copy size={18} />}
        </button>
        <button onClick={handleShare} className="btn-icon btn-order-share" title="Compartir"><Share2 size={18} /></button>
        <button onClick={handlePrint} className="btn-icon btn-print btn-order-print" title="Imprimir"><Printer size={18} /></button>
      </div>
    </div>
  );
}
