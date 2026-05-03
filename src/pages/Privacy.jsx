import SEO from '../components/SEO';

export default function Privacy() {
  return (
    <>
      <SEO 
        title="Política de Privacidad" 
        description="Política de Privacidad de Koriname.com"
      />
      <section className="section" style={{ paddingBottom: '4rem', paddingTop: '4rem' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 className="display-sm mb-6" style={{ color: 'var(--primary)', fontWeight: 800 }}>Política de Privacidad</h1>
          
          <div className="body-md" style={{ color: 'var(--on-surface-variant)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p><strong>1. Identificación del Responsable</strong></p>
            <p>
              Responsable del tratamiento: Cesar Armando Gaamez Maldonado<br/>
              Domicilio: Calle Sara del Campo 535, depto 712. Santiago, Chile.<br/>
              Correo electrónico: gamez.cesararmando@gmail.com<br/>
              Teléfono: +56956210042<br/>
              Sitio Web: koriname.com
            </p>

            <p><strong>2. Información que recopilamos</strong></p>
            <p>En Koriname.com nos tomamos muy en serio tu privacidad. No requerimos que te registres para usar nuestro generador. La información que introduces (como tu nombre original o tus preferencias de personalidad para el generador) se procesa únicamente para mostrarte los resultados en tiempo real y <strong>no se almacena en ninguna base de datos</strong> ni queda vinculada a ti.</p>
            <p>Adicionalmente, podemos recopilar datos de navegación anónimos mediante herramientas como Google Analytics para entender cómo los usuarios utilizan el sitio y mejorarlo (como páginas más visitadas, tiempo de permanencia, etc.).</p>

            <p><strong>3. Finalidad del tratamiento de datos</strong></p>
            <p>Los datos anónimos de navegación se utilizan exclusivamente para:</p>
            <ul>
              <li>Realizar análisis estadísticos y mejorar el rendimiento y diseño del sitio web.</li>
              <li>Asegurar el correcto funcionamiento técnico de la plataforma.</li>
            </ul>

            <p><strong>4. Compartición de datos con terceros</strong></p>
            <p>No vendemos, alquilamos ni compartimos ningún tipo de información personal con terceros. Solo empleamos servicios de terceros (como Google Analytics) que pueden recopilar información estadística anónima mediante el uso de cookies.</p>

            <p><strong>5. Derechos del Usuario</strong></p>
            <p>Dado que no almacenamos información personal que permita identificarte, no mantenemos bases de datos de usuarios. Si tienes alguna duda sobre nuestra política de privacidad o el uso de datos en este sitio, puedes contactarnos a través del correo electrónico facilitado en el apartado 1.</p>

            <p><strong>6. Cambios en la Política de Privacidad</strong></p>
            <p>Nos reservamos el derecho a modificar la presente Política de Privacidad para adaptarla a novedades legislativas o jurisprudenciales. En dichos supuestos, anunciaremos en esta página los cambios introducidos con razonable antelación a su puesta en práctica.</p>
          </div>
        </div>
      </section>
    </>
  );
}
