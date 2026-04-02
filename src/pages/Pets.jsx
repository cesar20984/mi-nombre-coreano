import { PawPrint } from 'lucide-react';
import SpeakButton from '../components/SpeakButton';
import SEO from '../components/SEO';

export default function Pets() {
  const petNames = [
    { hangul: '두부', roman: 'Dubu', desc: 'Significa "Tofu". Perfecto para perritos blancos y suaves.' },
    { hangul: '초코', roman: 'Choco', desc: 'Significa "Chocolate". Ideal para mascotas de pelaje marrón.' },
    { hangul: '우유', roman: 'Uyu', desc: 'Significa "Leche". Lindo para gatos blancos.' },
    { hangul: '구름', roman: 'Gureum', desc: 'Significa "Nube". Perfecto para perros muy peludos (como un Samoyedo).' },
    { hangul: '만두', roman: 'Mandu', desc: 'Significa "Dumpling/Empanada". Para mascotas gorditas y abrazables.' },
    { hangul: '사랑', roman: 'Sarang', desc: 'Significa "Amor". El nombre más dulce.' },
    { hangul: '봄', roman: 'Bom', desc: 'Significa "Primavera".' },
    { hangul: '겨울', roman: 'Gyeoul', desc: 'Significa "Invierno". ¡Ideal para huskies!' },
  ];

  return (
    <>
      <SEO 
        title="Nombres Coreanos para Mascotas | Perros y Gatos" 
        description="Inspírate con dulces nombres coreanos de comidas y naturaleza ideales para nombrar a tu perro o gatito." 
        keywords="nombres coreanos para perros, nombres coreanos para gatos, nombres para mascotas en coreano"
      />
      <section className="section">
        <div className="watermark">반려동물</div>
        <div className="container">
          
          <div className="text-center mb-8 fade-in">
            <span className="badge">Perritos y Gatitos</span>
            <h1 className="display-md mb-4">Nombres Coreanos para Mascotas</h1>
            <p className="body-lg" style={{ color: 'var(--secondary)', maxWidth: '600px', margin: '0 auto' }}>
              En Corea los nombres de comida y naturaleza son súper populares para nombrar a perros y gatos por lo tiernos que suenan.
            </p>
        </div>

        <div className="grid-cols-2 fade-in animate-delay-200">
          {petNames.map((pet, idx) => (
            <div key={idx} className="card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{ padding: '1rem', background: 'var(--surface-container)', borderRadius: '1rem' }}>
                <PawPrint size={32} color="var(--primary)" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <h3 className="title-lg korean-text" style={{ margin: 0 }}>{pet.hangul}</h3>
                  <SpeakButton text={pet.hangul} size={20} />
                </div>
                <p className="body-md" style={{ fontWeight: 600, color: 'var(--secondary)', marginBottom: '0.5rem' }}>{pet.roman}</p>
                <p className="body-sm" style={{ color: 'var(--on-surface-variant)' }}>{pet.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
      </section>
    </>
  );
}
