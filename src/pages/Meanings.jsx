import { BookOpen, HelpCircle } from "lucide-react";
import SEO from "../components/SEO";

export default function Meanings() {
  return (
    <>
      <SEO 
        title="Estructura de los Nombres Coreanos: Guía Completa" 
        description="Descubre cómo se estructuran los verdaderos nombres coreanos, el papel del apellido, el concepto filosófico del Hangul y el antiguo sistema del Saju." 
        keywords="nombres coreanos, estructura de los nombres coreanos, significado de los nombres coreanos, saju, hanja"
        schema={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "¿Cómo funciona el apellido en los nombres coreanos?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "En Corea, el apellido (Seong) precede al nombre. Existen relativamente pocos apellidos en comparación con Occidente. Los más comunes son Kim, Lee y Park, que representan casi a la mitad de la población. Cada apellido está vinculado a un 'Bon-gwan' o lugar de origen ancestral que define el clan familiar. Un dato curioso es que las mujeres coreanas mantienen su propio apellido después del matrimonio."
              }
            },
            {
              "@type": "Question",
              "name": "¿Cuál es la estructura del nombre de pila (이름)?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "El primer nombre o nombre de pila (Ireum) casi siempre consta de dos sílabas. Tradicionalmente, una de las sílabas es un 'Dolimja', un nombre generacional que comparten hermanos y primos de la misma línea familiar. Actualmente, además de los nombres basados en caracteres chinos, son muy populares los nombres 'Sun-uri', que utilizan palabras coreanas puras como Haneul (Cielo) o Iseul (Rocío)."
              }
            },
            {
              "@type": "Question",
              "name": "¿Cómo se eligen los nombres coreanos verdaderos (Saju y Hanja)?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "La elección es un proceso espiritual. Se utilizan caracteres Hanja (basados en ideogramas chinos) para asignar virtudes específicas. Muchos padres consultan el Saju (Los Cuatro Pilares del Destino) para analizar la energía de la hora y fecha de nacimiento. El objetivo es equilibrar los Cinco Elementos (madera, fuego, tierra, metal, agua), eligiendo un nombre cuya energía complemente lo que el destino del bebé necesita para una vida próspera."
              }
            }
          ]
        }}
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
               <h3 className="title-md mb-4" style={{ color: '#fff', fontSize: '1.4rem' }}>¿Cómo funciona el apellido en los nombres coreanos?</h3>
               <p className="body-md" style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>
                 En Corea, el apellido (Seong) precede al nombre. Los apellidos son heredados y reflejan el linaje del clan. Los nombres más comunes como <strong>Kim, Lee y Park</strong> tienen su origen en antiguos reinos y clanes específicos vinculados a regiones geográficas (Bon-gwan). A diferencia de muchas culturas occidentales, las mujeres coreanas no cambian su apellido al casarse, preservando su identidad familiar de por vida.
               </p>
            </div>
          </div>
          
          <div className="card">
            <div style={{ padding: '1rem', background: 'var(--surface-container)', borderRadius: '12px', width: 'fit-content', marginBottom: '1.5rem' }}>
               <HelpCircle size={24} color="var(--primary)" />
            </div>
            <h3 className="title-md mb-4" style={{ fontSize: '1.4rem' }}>¿Cuál es la estructura del nombre de pila (이름)?</h3>
            <p className="body-md" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.7 }}>
              El nombre suele tener dos sílabas. Una práctica tradicional fascinante es el uso del <strong>Dolimja</strong>, una sílaba específica seleccionada por la familia para ser compartida por todos los hijos o primos de la misma generación. Por ejemplo, si el "Dolimja" es "Ji", los hermanos podrían llamarse Ji-woo y Ji-hoon. Además, hoy existe una tendencia creciente hacia los nombres nativos coreanos (Sun-uri) que no usan caracteres chinos, como <em>Da-som</em> (amor antiguo).
            </p>
          </div>
        </div>

        <div className="card mt-8 fade-in animate-delay-300">
          <h3 className="title-md mb-4" style={{ fontSize: '1.4rem' }}>¿Cómo se eligen los nombres coreanos verdaderos (Saju y Hanja)?</h3>
          <p className="body-md mb-4" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.7 }}>
            La creación de un nombre es un arte que busca el equilibrio cósmico. Se utilizan los <strong>Hanja</strong>, caracteres que provienen de la escritura china antigua, donde cada trazo tiene un significado ideográfico profundo (ej. sabiduría, coraje, río). 
            Muchos recurren al <strong>Saju</strong> (los cuatro pilares del destino), una ciencia ancestral que analiza la hora y fecha de nacimiento para identificar qué elementos —madera, fuego, tierra, metal o agua— faltan en la esencia de la persona, usando el nombre como un amuleto para equilibrar esas energías naturales.
          </p>
          <div style={{ padding: '1rem', background: 'var(--surface-container-low)', borderRadius: '0.5rem', borderLeft: '4px solid var(--primary)' }}>
            <p className="body-sm" style={{ fontWeight: 600 }}>Nota Importante:</p>
            <p className="body-sm" style={{ color: 'var(--secondary)' }}>Los generadores online de "nombres por cumpleaños" asignan sílabas fonéticas para fines recreativos. Un nombre coreano real requiere un análisis profundo de virtudes y armonía energética que va mucho más allá de una fecha aleatoria.</p>
          </div>
        </div>

      </div>
      </section>
    </>
  );
}
