import SEO from '../components/SEO';

export default function Cookies() {
  return (
    <>
      <SEO 
        title="Política de Cookies" 
        description="Política de Cookies de Koriname.com"
      />
      <section className="section" style={{ paddingBottom: '4rem', paddingTop: '4rem' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 className="display-sm mb-6" style={{ color: 'var(--primary)', fontWeight: 800 }}>Política de Cookies</h1>
          
          <div className="body-md" style={{ color: 'var(--on-surface-variant)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p>En Koriname.com utilizamos cookies para poder ofrecerte una mejor experiencia de navegación y para recopilar estadísticas anónimas de uso.</p>

            <p><strong>¿Qué son las cookies?</strong></p>
            <p>Las cookies son pequeños archivos de texto que los sitios web que visitas almacenan en tu dispositivo (ordenador, tablet, smartphone). Se utilizan ampliamente para hacer que los sitios web funcionen, o funcionen de manera más eficiente, así como para proporcionar información a los propietarios del sitio.</p>

            <p><strong>¿Qué tipo de cookies utilizamos?</strong></p>
            <ul>
              <li><strong>Cookies técnicas:</strong> Son aquellas estrictamente necesarias para el funcionamiento del sitio web, como por ejemplo, recordar preferencias visuales (como el tema oscuro/claro si estuviera disponible) o almacenar temporalmente configuraciones del administrador (uso de localStorage para mostrar/ocultar elementos en paneles privados).</li>
              <li><strong>Cookies de análisis:</strong> Son aquellas que nos permiten cuantificar el número de usuarios y así realizar la medición y análisis estadístico de la utilización que hacen los usuarios del servicio ofertado (por ejemplo, Google Analytics).</li>
            </ul>

            <p><strong>Cómo gestionar las cookies</strong></p>
            <p>Puedes permitir, bloquear o eliminar las cookies instaladas en tu equipo mediante la configuración de las opciones del navegador instalado en tu ordenador. Ten en cuenta que si desactivas las cookies, es posible que algunas funcionalidades del sitio no funcionen correctamente.</p>
            <p>A continuación te indicamos cómo puedes configurar las cookies en los navegadores más populares:</p>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li><strong>Google Chrome:</strong> Configuración - Privacidad y seguridad - Cookies y otros datos de sitios.</li>
              <li><strong>Mozilla Firefox:</strong> Opciones - Privacidad y seguridad - Cookies y datos del sitio.</li>
              <li><strong>Safari:</strong> Preferencias - Privacidad.</li>
              <li><strong>Edge:</strong> Configuración - Cookies y permisos del sitio.</li>
            </ul>

            <p><strong>Actualizaciones y cambios en la Política de Cookies</strong></p>
            <p>Koriname.com puede modificar esta Política de Cookies en función de exigencias legislativas, reglamentarias, o con la finalidad de adaptar dicha política a las instrucciones dictadas por las autoridades competentes, por ello se aconseja a los Usuarios que la visiten periódicamente.</p>
          </div>
        </div>
      </section>
    </>
  );
}
