import SEO from '../components/SEO';
import { Sparkles, ShieldCheck, Volume2, Download, BookOpen, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function QueEsKoriname() {
  return (
    <>
      <SEO 
        title="¿Qué es Koriname y por qué somos diferentes?" 
        description="Descubre qué hace a Koriname la mejor plataforma para generar y entender nombres coreanos. Conoce nuestras herramientas y nuestro enfoque cultural único."
      />
      
      {/* Hero Section */}
      <section className="section" style={{ paddingBottom: '3rem', paddingTop: '4rem', position: 'relative' }}>
        <div className="watermark" style={{ top: '-10%', right: '5%', fontSize: ' clamp(8rem, 15vw, 12rem)', opacity: 0.03, textAlign: 'right', zIndex: 1, whiteSpace:'nowrap', lineHeight:0.8 }}>코리네임</div>
        <div className="container relative" style={{ zIndex: 2, maxWidth: '800px', textAlign: 'center' }}>
          <span className="badge mb-4 display-inline-block">Conoce el Proyecto</span>
          <h1 className="display-sm mb-6" style={{ color: 'var(--primary)', fontWeight: 800 }}>
            Mucho más que un simple traductor
          </h1>
          <p className="body-lg" style={{ color: 'var(--on-surface-variant)' }}>
            Koriname es la plataforma definitiva en español para descubrir, entender y adoptar nombres coreanos. Diseñada con respeto por la cultura y enfocada en ofrecerte un resultado auténtico, hermoso y listo para usar.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="section" style={{ paddingBottom: '4rem', paddingTop: '2rem' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="title-lg" style={{ fontWeight: 800 }}>¿Qué puedes hacer en Koriname?</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '5rem' }}>
            <div style={{ background: 'var(--surface-container)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--outline-variant)' }}>
              <Sparkles size={28} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--on-surface)' }}>Generar tu Nombre Ideal</h3>
              <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Obtén un nombre coreano basado en tu fecha de nacimiento (Saju) o en la fonética de tu nombre original.
              </p>
            </div>
            
            <div style={{ background: 'var(--surface-container)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--outline-variant)' }}>
              <Volume2 size={28} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--on-surface)' }}>Audio Bilingüe Nativo</h3>
              <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                No solo leas cómo se escribe; escucha la pronunciación exacta en coreano gracias a nuestra integración de síntesis de voz nativa.
              </p>
            </div>

            <div style={{ background: 'var(--surface-container)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--outline-variant)' }}>
              <Download size={28} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--on-surface)' }}>Tarjetas Personalizadas</h3>
              <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Elige entre múltiples diseños visuales (minimalista, K-pop, tradicional) y descarga una tarjeta con tu nombre coreano para compartirla.
              </p>
            </div>

            <div style={{ background: 'var(--surface-container)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--outline-variant)' }}>
              <BookOpen size={28} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--on-surface)' }}>Diccionario y Significados</h3>
              <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Explora cientos de nombres coreanos organizados de la A a la Z, descubre sus significados profundos (Hanja) y orígenes.
              </p>
            </div>
          </div>

          {/* Differentiator Section */}
          <div style={{ background: 'var(--surface-container-high)', borderRadius: '1.5rem', padding: '3rem', position: 'relative', overflow: 'hidden' }}>
             <div style={{ position: 'relative', zIndex: 2 }}>
               <h2 className="title-lg mb-6" style={{ fontWeight: 800, textAlign: 'center' }}>¿En qué nos diferenciamos del resto?</h2>
               
               <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                 <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                   <ShieldCheck size={24} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
                   <div>
                     <h4 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.3rem' }}>Adaptación, no traducción robótica</h4>
                     <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.95rem' }}>La mayoría de las páginas web toman tu nombre y aplican un teclado coreano directamente (lo que genera palabras que no significan nada o suenan terrible en Corea). En Koriname buscamos <strong>nombres reales y estéticamente agradables</strong> que encajen con tu perfil fonético o de personalidad.</p>
                   </div>
                 </div>

                 <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                   <Star size={24} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
                   <div>
                     <h4 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.3rem' }}>Profundidad Cultural (Saju y Hanja)</h4>
                     <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.95rem' }}>No te damos un nombre vacío. Te explicamos los caracteres Hanja que lo componen, el contexto histórico y cómo se usa en la sociedad moderna coreana, brindándote una experiencia educativa.</p>
                   </div>
                 </div>

                 <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                   <Sparkles size={24} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
                   <div>
                     <h4 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.3rem' }}>Diseño Premium y Experiencia de Usuario</h4>
                     <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.95rem' }}>Creemos que descubrir tu nombre debe ser una experiencia mágica. Por eso ofrecemos una interfaz impecable, sin publicidad invasiva y con herramientas visuales únicas como nuestras tarjetas generadas al instante.</p>
                   </div>
                 </div>
               </div>
             </div>
          </div>

          {/* Value Proposition Section */}
          <div style={{ marginTop: '5rem', textAlign: 'center', maxWidth: '800px', margin: '5rem auto 0' }}>
            <h2 className="title-lg mb-4" style={{ fontWeight: 800 }}>¿Qué ganas al visitarnos?</h2>
            <p className="body-md" style={{ color: 'var(--on-surface-variant)', marginBottom: '1.5rem' }}>
              <strong>Seguridad:</strong> Evitas la vergüenza de usar un "nombre coreano" que en realidad es una traducción literal sin sentido.
            </p>
            <p className="body-md" style={{ color: 'var(--on-surface-variant)', marginBottom: '1.5rem' }}>
              <strong>Conexión:</strong> Obtienes una identidad coreana auténtica con la que puedes presentarte ante amigos coreanos, en comunidades de K-Pop, o usar en videojuegos.
            </p>
            <p className="body-md" style={{ color: 'var(--on-surface-variant)', marginBottom: '1.5rem' }}>
              <strong>Conocimiento:</strong> Aprendes sobre la fascinante estructura del idioma y la filosofía tradicional coreana para nombrar (como la energía de la fecha de nacimiento).
            </p>
          </div>

        </div>
      </section>

      {/* Footer Banner */}
      <section className="section section-alt mt-8" style={{ padding: '4rem 0', overflow: 'hidden' }}>
        <div className="container relative">
           <div style={{display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'center', justifyContent: 'center', zIndex: 2, position: 'relative', textAlign: 'center'}}>
             <div style={{ flex: '1 1 100%', maxWidth: '600px', margin: '0 auto' }}>
               <h2 className="display-sm mb-4" style={{ fontWeight: 800 }}>Experimenta la diferencia</h2>
               <p className="body-md mb-6" style={{color: 'var(--on-surface-variant)'}}>
                 Prueba nuestras herramientas ahora y comprueba por qué Koriname es tu mejor opción.
               </p>
               <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                 <Link to="/" className="btn btn-primary">Generador de Nombres</Link>
                 <Link to="/diccionario" className="btn" style={{ background: 'var(--surface-container-high)', color: 'var(--on-surface)' }}>Explorar Diccionario</Link>
               </div>
             </div>
           </div>
        </div>
      </section>
    </>
  );
}
