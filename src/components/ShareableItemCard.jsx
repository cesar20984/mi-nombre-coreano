import { useState, useRef } from 'react';
import { Download, Copy, Share2, Check } from 'lucide-react';
import SpeakButton from './SpeakButton';
import { copyAsImage, shareAsImage, downloadAsImage } from '../utils/shareUtils';

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
  shareText
}) {
  const cardRef = useRef(null);
  const [copying, setCopying] = useState(false);

  const handleDownload = () => downloadAsImage(cardRef.current, `koriname-${roman}`, '#ffffff');
  const handleCopy = () => copyAsImage(cardRef.current, '#ffffff', setCopying);
  const handleShare = () => shareAsImage(cardRef.current, '#ffffff', shareTitle, shareText);

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
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
          {Icon && (
            <div style={{ 
              padding: '0.75rem', 
              background: 'var(--primary-container)', 
              borderRadius: '1rem',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Icon size={24} />
            </div>
          )}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 className="title-md korean-text" style={{ margin: 0, fontSize: '2rem', color: 'var(--on-surface)' }}>{hangul}</h3>
              <div data-html2canvas-ignore="true">
                <SpeakButton text={hangul} size={20} />
              </div>
            </div>
            <p className="body-md" style={{ fontWeight: 800, color: 'var(--primary)', margin: '0.2rem 0', letterSpacing: '0.05em' }}>{roman}</p>
          </div>
        </div>
        
        <p className="body-md" style={{ color: 'var(--on-surface-variant)', margin: '1rem 0 1.5rem 0', lineHeight: 1.5 }}>
          {desc}
        </p>
        
        {/* Branding: Always present but absolute positioned and only visible by html2canvas (in effect) or very discrete */}
        <div className="capture-only" style={{ 
            textAlign: 'center',
            paddingTop: '0.5rem',
            borderTop: '1px solid #eee',
            marginTop: '0.5rem'
        }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#ccc', textTransform: 'uppercase', letterSpacing: '0.2rem' }}>
                Koriname.com
            </span>
        </div>
      </div>

      {/* Action Buttons - Ignored in capture */}
      <div data-html2canvas-ignore="true" style={{ 
        marginTop: '0.5rem', 
        display: 'flex', 
        justifyContent: 'flex-end', 
        gap: '0.5rem' 
      }}>
        <button onClick={handleDownload} className="btn-icon" title="Guardar imagen"><Download size={18} /></button>
        <button onClick={handleCopy} className="btn-icon" title="Copiar" style={{ background: copying ? 'var(--success-container)' : '' }}>
          {copying ? <Check size={18} /> : <Copy size={18} />}
        </button>
        <button onClick={handleShare} className="btn-icon" title="Compartir"><Share2 size={18} /></button>
      </div>
    </div>
  );
}
