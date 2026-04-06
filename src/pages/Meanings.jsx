import { BookOpen, HelpCircle } from "lucide-react";
import SEO from "../components/SEO";

export default function Meanings() {
  return (
    <>
      <SEO 
        title="Estructura de los Nombres Coreanos: Guía Completa" 
        description="Descubre cómo se estructuran los verdaderos nombres coreanos, el papel del apellido, el concepto filosófico del Hangul y el antiguo sistema del Saju." 
        keywords="nombres coreanos, estructura de los nombres coreanos, significado de los nombres coreanos, saju, hanja"
      />
      <section className="section">
        <div className="watermark">의미</div>
        <div className="container">
          
          <div className="hero-content text-center mb-8" style={{ margin: '0 auto', maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '4rem' }}>
            <span className="badge fade-in mb-4">Cultura & Tradición</span>
            <h1 className="display-md fade-in animate-delay-100 mb-6">
              Estructura de los<br/> <span style={{ color: 'var(--secondary)' }}>Nombres Coreanos</span>
            </h1>
            <p className="body-lg fade-in animate-delay-200" style={{ color: 'var(--on-surface-variant)', maxWidth: '500px' }}>
              Un nombre coreano (이름) es profundo. No es solo un sonido, sino un concepto filosófico basado en ciclos de elementos y energía.
            </p>
          </div>

        <div className="grid-cols-2 fade-in animate-delay-200">
          <div className="card card-dark" style={{ display: 'flex', gap: '1.5rem', flexDirection: 'column', border: 'none' }}>
            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', width: 'fit-content' }}>
               <BookOpen size={24} color="#fff" />
            </div>
            <div>
               <h3 className="title-md mb-2" style={{ color: '#fff' }}>El Apellido (성)</h3>
               <p className="body-md" style={{ color: 'rgba(255,255,255,0.8)' }}>
                 En Corea, el apellido va primero. Aproximadamente la mitad de la población comparte los tres apellidos más comunes: Kim, Lee y Park. Estos apellidos representan grandes clanes familiares.
               </p>
            </div>
          </div>
          
          <div className="card">
            <div style={{ padding: '1rem', background: 'var(--surface-container)', borderRadius: '12px', width: 'fit-content', marginBottom: '1.5rem' }}>
               <HelpCircle size={24} color="var(--primary)" />
            </div>
            <h3 className="title-md mb-2">El Nombre Dado (이름)</h3>
            <p className="body-md" style={{ color: 'var(--on-surface-variant)' }}>
              El primer nombre o nombre de pila casi siempre consta de dos sílabas. Antiguamente, una de las sílabas (llamada "dolimja") se compartía con todos los de la misma generación familiar (ej. hermanos, primos).
            </p>
          </div>
        </div>

        <div className="card mt-8 fade-in animate-delay-300">
          <h3 className="title-md mb-2">¿Cómo se eligen? (Saju y Hanja)</h3>
          <p className="body-md mb-4" style={{ color: 'var(--on-surface-variant)' }}>
            Los nombres auténticos a menudo derivan de raíces chinas (Hanja), que le dan el significado profundo (ej. Inteligencia, Belleza, Prosperidad). 
            La elección específica de los caracteres Hanja se hace a menudo mediante el *Saju* (Los Cuatro Pilares del Destino), evaluando el año, mes, día y hora de nacimiento para encontrar qué "elementos" astrológicos faltan y balancearlos a través del nombre.
          </p>
          <div style={{ padding: '1rem', background: 'var(--surface-container-low)', borderRadius: '0.5rem', borderLeft: '4px solid var(--primary)' }}>
            <p className="body-sm" style={{ fontWeight: 600 }}>Nota Importante:</p>
            <p className="body-sm" style={{ color: 'var(--secondary)' }}>Los generadores online de "nombres por cumpleaños" no hacen un verdadero cálculo Saju, sino que asignan sílabas al azar según tu día de nacimiento. ¡Son puramente para diversión creativa!</p>
          </div>
        </div>

      </div>
      </section>
    </>
  );
}
