import SEO from '../components/SEO';
import ShareableItemCard from '../components/ShareableItemCard';
import { Feather } from 'lucide-react';

export default function Tattoos() {
  const categories = [
    {
      title: "Valores y Esencia",
      items: [
        { hangul: '사랑', roman: 'Sarang', desc: 'Amor.' },
        { hangul: '자유', roman: 'Jayu', desc: 'Libertad.' },
        { hangul: '평화', roman: 'Pyeonghwa', desc: 'Paz.' },
        { hangul: '희망', roman: 'Huimang', desc: 'Esperanza.' },
        { hangul: '용기', roman: 'Yonggi', desc: 'Valentía.' },
        { hangul: '진실', roman: 'Jinsil', desc: 'Verdad.' },
        { hangul: '신념', roman: 'Sinnyeom', desc: 'Convicción.' },
        { hangul: '균형', roman: 'Gyunhyeong', desc: 'Equilibrio.' },
        { hangul: '중심', roman: 'Jungsim', desc: 'Centro.' },
        { hangul: '본질', roman: 'Bonjil', desc: 'Esencia.' },
        { hangul: '진심', roman: 'Jinsim', desc: 'Sinceridad.' },
        { hangul: '존중', roman: 'Jonjung', desc: 'Respeto.' },
        { hangul: '책임', roman: 'Chaegim', desc: 'Responsabilidad.' },
        { hangul: '의지', roman: 'Uiji', desc: 'Voluntad.' },
      ]
    },
    {
      title: "Existencia y Tiempo",
      items: [
        { hangul: '흐름', roman: 'Heureum', desc: 'Fluir.' },
        { hangul: '순간', roman: 'Sungan', desc: 'Instante.' },
        { hangul: '영원', roman: 'Yeongwon', desc: 'Eternidad.' },
        { hangul: '기억', roman: 'Gieok', desc: 'Recuerdo.' },
        { hangul: '약속', roman: 'Yaksok', desc: 'Promesa.' },
        { hangul: '존재', roman: 'Jon-jae', desc: 'Existencia.' },
        { hangul: '지금', roman: 'Jigeum', desc: 'Ahora.' },
        { hangul: '오늘', roman: 'Oneul', desc: 'Hoy.' },
        { hangul: '계속', roman: 'Gyesok', desc: 'Continuar.' },
        { hangul: '시작', roman: 'Sijak', desc: 'Comienzo.' },
        { hangul: '변화', roman: 'Byeonhwa', desc: 'Cambio.' },
        { hangul: '윤회', roman: 'Yunhoe', desc: 'Ciclo de vida.' },
        { hangul: '인연', roman: 'In-yeon', desc: 'Destino / Conexión.' },
      ]
    },
    {
      title: "Paz y Reflexión",
      items: [
        { hangul: '고요', roman: 'Goyo', desc: 'Calma.' },
        { hangul: '침묵', roman: 'Chimmuk', desc: 'Silencio.' },
        { hangul: '여유', roman: 'Yeoyu', desc: 'Serenidad.' },
        { hangul: '마음', roman: 'Maeum', desc: 'Corazón / Mente.' },
        { hangul: '각성', roman: 'Gakseong', desc: 'Despertar.' },
        { hangul: '깨달음', roman: 'Kkaedareum', desc: 'Iluminación.' },
        { hangul: '성찰', roman: 'Seongchal', desc: 'Reflexión.' },
        { hangul: '절제', roman: 'Jeolje', desc: 'Autocontrol.' },
        { hangul: '고독', roman: 'Godok', desc: 'Soledad.' },
        { hangul: '초월', roman: 'Chowol', desc: 'Trascendencia.' },
        { hangul: '단순', roman: 'Dansun', desc: 'Simplicidad.' },
        { hangul: '공', roman: 'Gong', desc: 'Vacío.' },
      ]
    },
    {
      title: "Naturaleza y Elementos",
      items: [
        { hangul: '하늘', roman: 'Haneul', desc: 'Cielo.' },
        { hangul: '달', roman: 'Dal', desc: 'Luna.' },
        { hangul: '별', roman: 'Byeol', desc: 'Estrella.' },
        { hangul: '태양', roman: 'Taeyang', desc: 'Sol.' },
        { hangul: '바다', roman: 'Bada', desc: 'Mar.' },
        { hangul: '바람', roman: 'Baram', desc: 'Viento.' },
        { hangul: '빛', roman: 'Bit', desc: 'Luz.' },
        { hangul: '꽃', roman: 'Kkot', desc: 'Flor.' },
        { hangul: '나무', roman: 'Namu', desc: 'Árbol.' },
        { hangul: '산', roman: 'San', desc: 'Montaña.' },
      ]
    },
    {
      title: "Frases Inspiradoras",
      items: [
        { hangul: '지금 여기', roman: 'Jigeum yeogi', desc: 'Aquí y ahora.' },
        { hangul: '나의 길', roman: 'Na-ui gil', desc: 'Mi camino.' },
        { hangul: '끝까지', roman: 'Kkeutk-kaji', desc: 'Hasta el final.' },
        { hangul: '다시 시작', roman: 'Dasi sijak', desc: 'Empezar de nuevo.' },
        { hangul: '천천히 가', roman: 'Cheon-cheon-hi ga', desc: 'Ve despacio.' },
        { hangul: '계속 가', roman: 'Gyesok ga', desc: 'Sigue adelante.' },
        { hangul: '괜찮아', roman: 'Gwaenchan-a', desc: 'Está bien.' },
        { hangul: '나답게', roman: 'Nadabge', desc: 'A mi manera.' },
        { hangul: '있는 그대로', roman: 'Inneun geudaero', desc: 'Tal como eres.' },
        { hangul: '흔들리지 마', roman: 'Heundeulliji ma', desc: 'No vaciles.' },
        { hangul: '이 순간', roman: 'I sungan', desc: 'Este momento.' },
        { hangul: '멈추지 마', roman: 'Meom-chuji ma', desc: 'No te detengas.' },
        { hangul: '나를 믿어', roman: 'Nareul mideo', desc: 'Cree en ti.' },
        { hangul: '마음 가는 대로', roman: 'Maeum ganeun daero', desc: 'Sigue tu corazón.' },
        { hangul: '빛이 되라', roman: 'Bichi doera', desc: 'Sé luz.' },
      ]
    }
  ];

  return (
    <>
      <SEO 
        title="Palabras y Nombres Coreanos para Tatuajes" 
        description="Explora ideas de palabras y frases aesthetic en coreano (Hangul) con un significado profundo, perfectas para tu próximo tatuaje." 
        keywords="nombres coreanos para tatuajes, tatuajes en coreano, frases en coreano para tatuajes, hangul aesthetic"
      />
      <section className="section">
        <div className="watermark">타투</div>
        <div className="container">
          
          <div className="text-center mb-8 fade-in">
            <span className="badge">Tinta & Letras</span>
            <h1 className="display-md mb-4">Palabras Coreanas para Tatuajes</h1>
            <p className="body-lg" style={{ color: 'var(--secondary)', maxWidth: '600px', margin: '0 auto' }}>
              El Hangul es un alfabeto arquitectónico y muy elegante. Aquí tienes ideas de palabras estéticas y significativas para llevar en la piel.
            </p>
        </div>

        {categories.map((cat, catIdx) => (
          <div key={catIdx} className="mb-16 fade-in">
            <h2 className="title-lg mb-8 text-center" style={{ color: 'var(--primary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {cat.title}
            </h2>
            <div className="grid-cols-2 animate-delay-200">
              {cat.items.map((idea, idx) => (
                <ShareableItemCard 
                    key={idx}
                    icon={Feather}
                    hangul={idea.hangul}
                    roman={idea.roman}
                    desc={idea.desc}
                    shareTitle="Idea para Tatuaje Coreano"
                    shareText={`¡Esta palabra coreana sería un tatuaje increíble! ${idea.roman} (${idea.hangul}) - Significa: ${idea.desc}`}
                    shareType="tatuaje"
                />
              ))}
            </div>
          </div>
        ))}

      </div>
      </section>
    </>
  );
}
