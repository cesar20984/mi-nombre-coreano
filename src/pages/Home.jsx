import { useState, useRef, useEffect } from 'react';
import BirthdateGenerator from '../components/BirthdateGenerator';
import TransliterationGenerator from '../components/TransliterationGenerator';
import ClassicBirthdateGenerator from '../components/ClassicBirthdateGenerator';
import LabelCreator from '../components/LabelCreator';
import SpeakButton from '../components/SpeakButton';
import GeneratorExplanation from '../components/GeneratorExplanation';

export default function Home() {
  const [activeTab, setActiveTab] = useState('birthdate'); // 'birthdate' | 'transliteration'
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);

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
              <button 
                className={`tab-btn ${activeTab === 'transliteration' ? 'active' : ''}`}
                style={{flex: 1}}
                onClick={() => setActiveTab('transliteration')}
              >
                Transliteración
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
            
            <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '5rem' }}>
              <h2 className="title-lg mb-8" style={{ color: 'var(--secondary)' }}>Este sería tu nombre en coreano</h2>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                <div className="display-lg korean-text" style={{ color: 'var(--primary)', margin: 0, lineHeight: 1 }}>{result.korean}</div>
                <SpeakButton text={result.korean} size={48} />
              </div>
              
              <div className="title-lg mb-4" style={{ letterSpacing: '0.1em', fontWeight: 600 }}>{result.romanized}</div>
              <p className="body-lg" style={{ color: 'var(--on-surface-variant)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>{result.meaning}</p>
            </div>

            {/* Downloadable Label Component */}
            <LabelCreator result={result} />
          </div>
        </section>
      )}
    </>
  );
}
