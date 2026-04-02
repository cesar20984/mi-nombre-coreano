import SEO from '../components/SEO';
import ShareableItemCard from '../components/ShareableItemCard';
import { Book } from 'lucide-react';

export default function Dictionary() {
  const dictionary = [
    { hangul: '아름', roman: 'Areum', meaning: 'Belleza (Nativo coreano).' },
    { hangul: '바다', roman: 'Bada', meaning: 'Océano o Mar (Nativo coreano).' },
    { hangul: '빛나', roman: 'Binna', meaning: 'Brillar (Nativo coreano).' },
    { hangul: '보라', roman: 'Bora', meaning: 'Púrpura (Nativo coreano).' },
    { hangul: '은우', roman: 'Eun-woo', meaning: 'Misericordioso y excepcional.' },
    { hangul: '하나', roman: 'Hana', meaning: 'Uno, primero (Nativo coreano).' },
    { hangul: '하늘', roman: 'Haneul', meaning: 'Cielo (Nativo coreano).' },
    { hangul: '지민', roman: 'Ji-min', meaning: 'Afiable y de intelecto rápido.' },
    { hangul: '준호', roman: 'Jun-ho', meaning: 'Talentoso e inmenso.' },
    { hangul: '미란', roman: 'Mi-ran', meaning: 'Hermosa orquídea.' },
    { hangul: '나비', roman: 'Nabi', meaning: 'Mariposa (Nativo coreano).' },
    { hangul: '세아', roman: 'Se-ah', meaning: 'Mundo elegante.' },
    { hangul: '서준', roman: 'Seo-jun', meaning: 'Auspicioso y talentoso.' },
    { hangul: '수진', roman: 'Su-jin', meaning: 'Hermosa y genuina.' },
    { hangul: '태양', roman: 'Taeyang', meaning: 'Sol.' },
  ];

  return (
    <>
      <SEO 
        title="Diccionario de Nombres Coreanos | A-Z" 
        description="Explora un extenso directorio de nombres coreanos nativos femeninos y masculinos, traducidos con su significado exacto al español." 
        keywords="nombres coreanos para niños, nombres coreanos femeninos, diccionario de nombres coreanos, nombres coreanos con significado"
      />
      <section className="section">
        <div className="watermark">사전</div>
        <div className="container">
          <div className="text-center mb-8 fade-in">
            <span className="badge">Directorio A-Z</span>
            <h1 className="display-md mb-4">Diccionario de Nombres Coreanos</h1>
            <p className="body-lg" style={{ color: 'var(--secondary)', maxWidth: '600px', margin: '0 auto' }}>
              Explora una amplia variedad de nombres coreanos populares y puros (nativos) con sus respectivos significados.
            </p>
        </div>

        <div className="grid-cols-2 fade-in animate-delay-200">
          {dictionary.map((item, idx) => (
            <ShareableItemCard 
                key={idx}
                icon={Book}
                hangul={item.hangul}
                roman={item.roman}
                desc={item.meaning}
                shareTitle="Diccionario de Nombres Coreanos"
                shareText={`Acabo de encontrar este nombre coreano: ${item.roman} (${item.hangul}) - Significa: ${item.meaning}`}
            />
          ))}
        </div>
      </div>
      </section>
    </>
  );
}
