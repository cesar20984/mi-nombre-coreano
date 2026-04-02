import { CLASSIC_DATA } from './ClassicBirthdateGenerator';
import SpeakButton from './SpeakButton';

export default function GeneratorExplanation({ type }) {
  return (
    <div className="fade-in animate-delay-200" id="explicacion-zona">
      {type === 'birthdate' && (
        <>
          <h2 className="title-lg mb-4">Método 1: Saju (Tu Cumpleaños)</h2>
          <div className="card" style={{ textAlign: 'left' }}>
            <p className="body-md mb-4">
              Este generador es una versión <strong>súper fácil y divertida</strong>. Básicamente toma el mes, tu día y la terminación de tu año de nacimiento, y lo mezcla con una lista de nombres de la vida real (como Kim o Lee) y sílabas comunes separadas por el estilo que más te guste (femenino, masculino o neutro).
            </p>
            <p className="body-md mb-4">
              <strong>¿Es tu nombre 100% oficial?</strong> ¡No exactamente! Es una aproximación para divertirte un rato. Suena muy real y estético porque usa sílabas verdaderas de Corea del Sur, pero es un sistemita automático que te regala la mejor combinación sin que te rompas la cabeza.
            </p>
            <p className="body-md">
              <strong>Cómo pasa en la vida real:</strong> En Corea, escoger un nombre para alguien es un gran suceso. Usualmente se fijan en el <strong>Saju (사주)</strong>, donde maestros expertos revisan incluso a qué hora naciste y la historia de tus abuelos para buscar un nombre que "atraiga buenas vibras". Nosotros no llegamos a tanto, ¡pero te armamos un nombre súper bonito para que juegues con el idioma!
            </p>
          </div>
        </>
      )}

      {type === 'classic' && (
        <>
          <h2 className="title-lg mb-4">Método 2: El Juego Clásico de las 3 Tablas</h2>
          <div className="card" style={{ textAlign: 'left' }}>
            <p className="body-md mb-4">
              Alrededor del mundo, todos los nombres tienen un fondo interesante. En Corea del Sur, la enorme mayoría de los nombres se forman usando <strong>tres sílabas</strong>.
            </p>
            <p className="body-md mb-4">
              Y no van puestas al azar: la primera sílaba siempre es tu <strong>apellido de familia</strong>, la segunda es un nombre de generación (muchas veces lo compartes con tus primos) y la tercera es tu nombre más personal.
            </p>
            
            <h3 className="title-md mt-8 mb-4">Ármalo tú mismo: ¿Qué significa?</h3>
            <p className="body-md mb-4">
              Hace tiempo se hizo muy viral en internet un juego clásico para armar tu alias según tu cumple. Puedes dejar que el botoncito de arriba lo haga por ti, o bien <strong>armarlo a mano y buscar a tus amigos mirando estas tablas</strong> para ver qué dicen:
            </p>

            {/* Table 1: Surname */}
            <div className="table-responsive mb-8">
              <h4 className="title-sm mb-2">1. Tu Apellido de Origen - Último dígito de tu año natal</h4>
              <p className="body-sm" style={{color: 'var(--secondary)'}}>Ej: Si naciste en 1999 (termina en 9), tu apellido de tabla será Jung (정).</p>
              <table className="aesthetic-table mt-4">
                <thead><tr><th>Dígito</th><th>Romanizado</th><th>Hangul</th><th>Significado</th></tr></thead>
                <tbody>
                  {CLASSIC_DATA.surnames.map(s => (
                    <tr key={s.num}><td>{s.num}</td><td>{s.roman}</td><td className="korean-text"><div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>{s.hangul} <SpeakButton text={s.hangul} /></div></td><td>{s.meaning}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table 2: Month */}
            <div className="table-responsive mb-8">
              <h4 className="title-sm mb-2">2. Tu Primer Nombre (Medio) - Mes de Nacimiento</h4>
              <p className="body-sm" style={{color: 'var(--secondary)'}}>Ej: Si naciste en el mes de noviembre (11), te corresponderá Hyun (현).</p>
              <table className="aesthetic-table mt-4">
                <thead><tr><th>Mes</th><th>Romanizado</th><th>Hangul</th><th>Significado</th></tr></thead>
                <tbody>
                  {CLASSIC_DATA.months.map(m => (
                    <tr key={m.num}><td>{m.num}</td><td>{m.roman}</td><td className="korean-text"><div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>{m.hangul} <SpeakButton text={m.hangul} /></div></td><td>{m.meaning}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table 3: Day */}
            <div className="table-responsive mb-4">
              <h4 className="title-sm mb-2">3. Tu Cierre Personal (Final) - Día de Nacimiento</h4>
              <p className="body-sm" style={{color: 'var(--secondary)'}}>Ej: Si tu fecha cae en un día 25, tu cierre silábico será Byung (병).</p>
              <table className="aesthetic-table mt-4">
                <thead><tr><th>Día</th><th>Romanizado</th><th>Hangul</th><th>Significado</th></tr></thead>
                <tbody>
                  {CLASSIC_DATA.days.map(d => (
                    <tr key={d.num}><td>{d.num}</td><td>{d.roman}</td><td className="korean-text"><div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>{d.hangul} <SpeakButton text={d.hangul} /></div></td><td>{d.meaning}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </>
      )}

      {type === 'transliteration' && (
        <>
          <h2 className="title-lg mb-4">Método 3: Tu Nombre tal cual Suena</h2>
          <div className="card" style={{ textAlign: 'left' }}>
            <p className="body-md mb-4">
              ¿Alguna vez cruzó por tu mente la pregunta: <strong>¿Cómo rayos deletrearían los coreanos mi propio nombre?</strong> El alfabeto coreano, llamado <strong>Hangul (한글)</strong>, es súper lógico y está totalmente basado en el sonido.
            </p>
            <p className="body-md mb-4">
              Cuando pones un texto aquí, la web toma tu nombre en español y lo adapta, sílaba a sílaba, para que suene lo más parecido posible en coreano. Por ejemplo, "CARLOS" se vuelve "카를로스" (Ka-reul-lo-seu), ya que esa es la manera en la que un nativo koreano trataría de pronunciarlo.
            </p>
            <p className="body-md">
              Para nosotros, esta es la forma perfecta si quieres poner ese nombre en tu perfil de Instagram, escribir tu nueva firma, o incluso si andas buscando ideas para un tatuaje literario.
            </p>
          </div>
        </>
      )}

      {/* Disclaimers & Common Content (SEO / Context) */}
      <div className="card mt-8" style={{ borderLeft: '4px solid var(--primary)', backgroundColor: 'transparent', textAlign: 'left', opacity: 0.9 }}>
        <p className="body-sm">
          <strong>Aviso rápido:</strong> Queremos que la pases genial buscando tus combinaciones. Recuerda que <strong>estos tres generadores son herramientas súper rápidas para pasar el rato</strong> e imaginar tu nombre soñado. Si viajas a Seúl algún día verás que nombrar a alguien es súper profundo e involucra toda una historia familiar detrás que ninguna app web podría crear. ¡Tómalo como tu primer acercamiento divertido a su increíble idioma!
        </p>
      </div>

      <div className="mt-12 mb-8" style={{ paddingTop: '2.5rem', borderTop: '1px solid rgba(195, 200, 193, 0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 className="title-md mb-4" style={{ textAlign: 'center' }}>¿Qué es esto de "Mi Nombre en Coreano"?</h2>
        <p className="body-md" style={{ maxWidth: '800px', color: 'var(--on-surface-variant)', lineHeight: 1.8, textAlign: 'center' }}>
          Armamos este rinconcito web movidos por nuestro fanatismo por el k-pop, los maratones de k-dramas y la curiosidad por cómo suenan las cosas en Seúl. 
          Aquí tienes una colección cool de <strong>tres generadores automáticos</strong>, abecedarios para husmear las letras, ideas aesthetic para tatuajes o mascotas, y hasta un creador genial donde puedes descargar una tarjetita con tu nombre nuevo y escucharlo desde tu teléfono en tiempo real. 
        </p>
      </div>

    </div>
  );
}
