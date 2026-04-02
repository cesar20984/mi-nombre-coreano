import { useState, useRef, useEffect } from 'react';
import BirthdateGenerator from '../components/BirthdateGenerator';
import TransliterationGenerator from '../components/TransliterationGenerator';
import ClassicBirthdateGenerator from '../components/ClassicBirthdateGenerator';
import LabelCreator from '../components/LabelCreator';
import SpeakButton from '../components/SpeakButton';
import GeneratorExplanation from '../components/GeneratorExplanation';
import SEO from '../components/SEO';

export default function Home() {
  const [activeTab, setActiveTab] = useState('transliteration'); // 'transliteration' | 'birthdate' | 'classic'
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);
  const cardRef = useRef(null);

  const scrollToCard = () => {
    if (cardRef.current) {
      window.scrollTo({ top: cardRef.current.getBoundingClientRect().top + window.scrollY - 40, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (result && resultRef.current) {
      // Calculamos la posición considerando la barra de navegación alta (80px) más 40px de margen visual extra
      const yOffset = -120; 
      const element = resultRef.current;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [result]);

  const handleGenerate = (data) => {
    setResult(data);
  };

  return (
    <>
      <SEO 
        title="Generador de Nombres Coreanos" 
        description="Generador gratuito para descubrir tu nombre en coreano según tu cumpleaños, sonido por transliteración o a través del tradicional método de lectura de tablas." 
        keywords="mi nombre en coreano, generador de nombres coreanos, cómo me llamo en coreano, traducir mi nombre al coreano, nombre coreano por cumpleaños, saju"
      />
      <section className="section">
        <div className="watermark">이름</div>
        <div className="container grid-asymmetric">
          
          <div className="hero-content">
            <span className="badge fade-in">Generador de nombres en coreano</span>
            <h1 className="display-md fade-in animate-delay-100 mb-4">
              Descubre Tu <br/> <span style={{ color: 'var(--secondary)' }}>Nombre Coreano</span>
            </h1>
            <p className="body-lg fade-in animate-delay-200" style={{ color: 'var(--on-surface-variant)', maxWidth: '400px' }}>
              Ya sea mediante tu fecha de nacimiento (Saju) o una transliteración directa desde el español.
            </p>
          </div>

          <div className="generators-wrap fade-in animate-delay-300">
            <div className="tabs">
              <button 
                className={`tab-btn ${activeTab === 'transliteration' ? 'active' : ''}`}
                style={{flex: 1}}
                onClick={() => setActiveTab('transliteration')}
              >
                Transliteración
              </button>
              <button 
                className={`tab-btn ${activeTab === 'birthdate' ? 'active' : ''}`}
                style={{flex: 1}}
                onClick={() => setActiveTab('birthdate')}
              >
                Saju (Por Fecha)
              </button>
              <button 
                className={`tab-btn ${activeTab === 'classic' ? 'active' : ''}`}
                style={{flex: 1}}
                onClick={() => setActiveTab('classic')}
              >
                Clásico de Tablas
              </button>
            </div>

            {activeTab === 'birthdate' && <BirthdateGenerator onGenerate={handleGenerate} />}
            {activeTab === 'classic' && <ClassicBirthdateGenerator onGenerate={handleGenerate} />}
            {activeTab === 'transliteration' && <TransliterationGenerator onGenerate={handleGenerate} />}
          </div>
        </div>
      </section>

      {/* Explicación de Generadores (SEO & Contexto) */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <GeneratorExplanation type={activeTab} />
        </div>
      </section>

      {/* Result Area */}
      {result && (
        <section className="section section-alt" ref={resultRef} style={{ paddingBottom: '6rem' }}>
          <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Downloadable Label Component (Now integrated with result display) */}
            <div ref={cardRef}>
              <LabelCreator result={result} />
              
              {result.explanation && (
                <div style={{ backgroundColor: 'var(--surface-container-low)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--outline-variant)', maxWidth: '650px', margin: '3rem auto 0 auto' }}>
                  <p className="body-md" style={{ color: 'var(--on-surface)', lineHeight: 1.6, margin: 0, textAlign: 'left' }}>
                    <strong style={{ color: 'var(--secondary)', display: 'block', marginBottom: '0.5rem' }}>¿Por qué obtuviste este nombre?</strong>
                    {result.explanation}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

    </>
  );
}
