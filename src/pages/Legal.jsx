import SEO from '../components/SEO';

export default function Legal() {
  return (
    <>
      <SEO 
        title="Aviso Legal" 
        description="Aviso legal y condiciones de uso de Koriname.com"
      />
      <section className="section" style={{ paddingBottom: '4rem', paddingTop: '4rem' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 className="display-sm mb-6" style={{ color: 'var(--primary)', fontWeight: 800 }}>Aviso Legal</h1>
          
          <div className="body-md" style={{ color: 'var(--on-surface-variant)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p><strong>1. Datos identificativos</strong></p>
            <p>En cumplimiento con el deber de información recogido en la normativa aplicable, se reflejan a continuación los siguientes datos:</p>
            <ul>
              <li><strong>Titular:</strong> Cesar Armando Gaamez Maldonado</li>
              <li><strong>Domicilio:</strong> Calle Sara del Campo 535, depto 712. Santiago, Chile.</li>
              <li><strong>Correo electrónico:</strong> gamez.cesararmando@gmail.com</li>
              <li><strong>Teléfono:</strong> +56956210042</li>
              <li><strong>Sitio Web:</strong> koriname.com</li>
            </ul>

            <p><strong>2. Uso del portal</strong></p>
            <p>El acceso y/o uso de este portal (Koriname.com) atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas. El sitio web proporciona acceso a multitud de informaciones, servicios, programas o datos (en adelante, "los contenidos") en Internet pertenecientes a Koriname.com o a sus licenciantes a los que el USUARIO pueda tener acceso.</p>
            <p>El USUARIO asume la responsabilidad del uso del portal. El sitio se proporciona con fines de entretenimiento e informativos.</p>

            <p><strong>3. Propiedad intelectual e industrial</strong></p>
            <p>Koriname.com por sí o como cesionaria, es titular de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma (a título enunciativo, imágenes, sonido, audio, vídeo, software o textos; marcas o logotipos, combinaciones de colores, estructura y diseño, selección de materiales usados, programas de ordenador necesarios para su funcionamiento, acceso y uso, etc.). Todos los derechos reservados.</p>

            <p><strong>4. Exclusión de garantías y responsabilidad</strong></p>
            <p>Koriname.com no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos o lesivos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.</p>

            <p><strong>5. Modificaciones</strong></p>
            <p>Koriname.com se reserva el derecho de efectuar sin previo aviso las modificaciones que considere oportunas en su portal, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios que se presten a través de la misma como la forma en la que éstos aparezcan presentados o localizados en su portal.</p>

            <p><strong>6. Legislación aplicable y jurisdicción</strong></p>
            <p>La relación entre Koriname.com y el USUARIO se regirá por la normativa chilena vigente y cualquier controversia se someterá a los Juzgados y tribunales de la ciudad de Santiago, Chile.</p>
          </div>
        </div>
      </section>
    </>
  );
}
