import SEO from '../components/SEO';
import { Sparkles, Heart, Globe, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <>
      <SEO 
        title="Quiénes Somos" 
        description="Conoce más sobre Koriname, nuestra misión y la pasión detrás de conectar la cultura coreana con el mundo hispanohablante."
      />
      
      {/* Hero Section */}
      <section className="section" style={{ paddingBottom: '3rem', paddingTop: '4rem', position: 'relative' }}>
        <div className="watermark" style={{ top: '-10%', left: '5%', fontSize: ' clamp(8rem, 15vw, 12rem)', opacity: 0.03, textAlign: 'left', zIndex: 1, whiteSpace:'nowrap', lineHeight:0.8 }}>환영합니다</div>
        <div className="container relative" style={{ zIndex: 2, maxWidth: '800px', textAlign: 'center' }}>
          <span className="badge mb-4 display-inline-block">Nuestra Historia</span>
          <h1 className="display-sm mb-6" style={{ color: 'var(--primary)', fontWeight: 800 }}>
            Conectando Culturas a través de los Nombres
          </h1>
          <p className="body-lg" style={{ color: 'var(--on-surface-variant)' }}>
            Koriname nació de una profunda fascinación por la riqueza lingüística y cultural de Corea. Nuestra misión es tender un puente entre el mundo hispanohablante y la hermosa tradición coreana de nombrar.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="section" style={{ paddingBottom: '4rem', paddingTop: '2rem' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            <div style={{ background: 'var(--surface-container)', padding: '2rem', borderRadius: '1rem' }}>
              <Heart size={32} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--on-surface)' }}>Nuestra Pasión</h3>
              <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Creemos que un nombre es mucho más que una etiqueta; es un reflejo de identidad, esperanza y significado. Nos apasiona desentrañar los matices del Hangul y los caracteres Hanja para ofrecer traducciones que respeten la esencia original.
              </p>
            </div>
            <div style={{ background: 'var(--surface-container)', padding: '2rem', borderRadius: '1rem' }}>
              <Globe size={32} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--on-surface)' }}>Nuestra Visión</h3>
              <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Queremos ser la herramienta de referencia en español para cualquier persona que desee explorar la onomástica coreana, ya sea por curiosidad, amor por la cultura pop (K-pop, K-dramas), o conexiones personales.
              </p>
            </div>
          </div>

          <div className="body-md" style={{ color: 'var(--on-surface-variant)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--on-surface)', marginTop: '2rem' }}>¿Qué hacemos?</h2>
            <p>
              En Koriname hemos desarrollado algoritmos y bases de datos que no solo "traducen" nombres de forma literal, sino que buscan la correspondencia fonética y cultural más cercana y estética posible en el idioma coreano.
            </p>
            <p>Nuestro generador tiene en cuenta:</p>
            <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Fonética nativa:</strong> Adaptando los sonidos del español a las sílabas coreanas (Hangul) de manera natural.</li>
              <li><strong>Significado (Hanja):</strong> Recomendando nombres puramente coreanos o basados en caracteres chinos tradicionales que tengan connotaciones positivas (valentía, belleza, sabiduría).</li>
              <li><strong>Tendencias modernas:</strong> Equilibrando la tradición con los nombres que suenan bien y son populares en la Corea actual.</li>
            </ul>

            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--on-surface)', marginTop: '2rem' }}>Un proyecto independiente</h2>
            <p>
              Koriname.com es un esfuerzo independiente, construido desde Chile con mucho cariño y dedicación. No somos una gran corporación, sino entusiastas de la tecnología y la cultura asiática buscando crear herramientas hermosas, útiles y respetuosas.
            </p>
            <p>
              Cada búsqueda, cada nombre generado y cada tarjeta compartida nos motiva a seguir mejorando y añadiendo nuevas funcionalidades para ustedes.
            </p>
          </div>
          
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-alt mt-8" style={{ padding: '4rem 0', overflow: 'hidden' }}>
        <div className="container relative">
           <div className="watermark" style={{ top: '-10%', right: '5%', fontSize: ' clamp(10rem, 20vw, 15rem)', opacity: 0.03, textAlign: 'right', zIndex: 1, whiteSpace:'nowrap', lineHeight:0.8 }}>함께</div>
           <div style={{display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'center', justifyContent: 'center', zIndex: 2, position: 'relative', textAlign: 'center'}}>
             <div style={{ flex: '1 1 100%', maxWidth: '600px', margin: '0 auto' }}>
               <h2 className="display-sm mb-4" style={{ fontWeight: 800 }}>¿Listo para descubrir tu nombre?</h2>
               <p className="body-md mb-6" style={{color: 'var(--on-surface-variant)'}}>
                 Únete a miles de personas que ya han encontrado su identidad en coreano de forma rápida, estética y con significado.
               </p>
               <Link to="/" className="btn btn-primary" style={{ display: 'inline-flex', gap: '0.5rem' }}>
                 <Sparkles size={18} /> Ir al Generador
               </Link>
             </div>
           </div>
        </div>
      </section>
    </>
  );
}
