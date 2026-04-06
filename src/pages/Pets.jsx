import { PawPrint } from 'lucide-react';
import SEO from '../components/SEO';
import ShareableItemCard from '../components/ShareableItemCard';

export default function Pets() {
  const petCategories = [
    {
      title: "Estilo sonidos tiernos (Muy común)",
      names: [
        { hangul: '몽몽', roman: 'Mongmong', desc: 'Sonido de perro.' },
        { hangul: '뽀뽀', roman: 'BboBbo', desc: 'Significa "Beso".' },
        { hangul: '뚜뚜', roman: 'DduDdu', desc: 'Sonido tierno.' },
        { hangul: '콩콩', roman: 'KkongKkong', desc: 'Significa "Saltitos".' },
        { hangul: '보리보리', roman: 'BoriBori', desc: 'Cebadita.' },
        { hangul: '노리노리', roman: 'NoriNori', desc: 'Juguetón.' },
        { hangul: '도리도리', roman: 'DoriDori', desc: 'Girada de cabeza.' },
        { hangul: '꼬마', roman: 'Kkoma', desc: 'Pequeñito.' },
        { hangul: '쭈니', roman: 'Jjuni', desc: 'Diminutivo tierno.' },
        { hangul: '미미', roman: 'Mimi', desc: 'Pequeño.' },
      ]
    },
    {
      title: "Comida (Extremadamente popular)",
      names: [
        { hangul: '두부', roman: 'Dubu', desc: 'Tofu. Ideal para mascotas blancas.' },
        { hangul: '콩', roman: 'Kong', desc: 'Frijol. Lindo para perritos pequeños.' },
        { hangul: '떡', roman: 'Tteok', desc: 'Pastel de arroz.' },
        { hangul: '인절미', roman: 'Injeolmi', desc: 'Dulce de arroz tradicional.' },
        { hangul: '만두', roman: 'Mandu', desc: 'Dumpling. Para mascotas gorditas.' },
        { hangul: '김치', roman: 'Kimchi', desc: 'El plato nacional de Corea.' },
        { hangul: '밥', roman: 'Bap', desc: 'Arroz.' },
        { hangul: '김밥', roman: 'Gimbap', desc: 'Rollo de arroz.' },
        { hangul: '짜장', roman: 'Jajang', desc: 'Salsa negra deliciosa.' },
        { hangul: '라면', roman: 'Ramyeon', desc: 'Fideos coreanos.' },
      ]
    },
    {
      title: "Colores y Apariencia",
      names: [
        { hangul: '하얀', roman: 'Hayan', desc: 'Blanco.' },
        { hangul: '까미', roman: 'Kkami', desc: 'Negro.' },
        { hangul: '누리', roman: 'Nuri', desc: 'Amarillo o dorado.' },
        { hangul: '빨강', roman: 'Bbalgang', desc: 'Rojo.' },
        { hangul: '초코', roman: 'Choco', desc: 'Marrón o chocolate.' },
        { hangul: '구름', roman: 'Gureum', desc: 'Nube. Para mascotas muy peludas.' },
        { hangul: '백구', roman: 'Baekgu', desc: 'Perro blanco.' },
        { hangul: '흑구', roman: 'Heukgu', desc: 'Perro negro.' },
        { hangul: '달콤', roman: 'Dalkom', desc: 'Dulce.' },
      ]
    },
    {
      title: "Personalidad",
      names: [
        { hangul: '행복', roman: 'Haengbok', desc: 'Felicidad.' },
        { hangul: '사랑', roman: 'Sarang', desc: 'Amor.' },
        { hangul: '짱', roman: 'Jjang', desc: '"El mejor".' },
        { hangul: '똥', roman: 'Ddong', desc: 'Travieso (muy usado con humor).' },
        { hangul: '졸리', roman: 'Jolly', desc: 'Somnoliento.' },
        { hangul: '바로', roman: 'Baro', desc: 'Directo o enseguida.' },
        { hangul: '예뻐', roman: 'Yeppeo', desc: 'Bonito.' },
        { hangul: '귀여', roman: 'Gwiyeo', desc: 'Lindo.' },
        { hangul: '친구', roman: 'Chingu', desc: 'Amigo.' },
        { hangul: '놀자', roman: 'Nolja', desc: 'Juguemos.' },
      ]
    },
    {
      title: "Inspirados en Nombres Humanos",
      names: [
        { hangul: '민지', roman: 'Minji', desc: 'Nombre femenino popular.' },
        { hangul: '지수', roman: 'Jisoo', desc: 'Unisex.' },
        { hangul: '지호', roman: 'Jiho', desc: 'Nombre masculino común.' },
        { hangul: '유나', roman: 'Yuna', desc: 'Nombre femenino.' },
        { hangul: '하나', roman: 'Hana', desc: 'Uno o primer nombre.' },
        { hangul: '나리', roman: 'Nari', desc: 'Flor de lirio.' },
        { hangul: '보라', roman: 'Bora', desc: 'Púrpura.' },
        { hangul: '아라', roman: 'Ara', desc: 'Bello.' },
        { hangul: '소라', roman: 'Sora', desc: 'Cielo.' },
        { hangul: '다미', roman: 'Dami', desc: 'Belleza.' },
      ]
    },
    {
      title: "Naturaleza",
      names: [
        { hangul: '하늘', roman: 'Haneul', desc: 'Cielo.' },
        { hangul: '달', roman: 'Dal', desc: 'Luna.' },
        { hangul: '별', roman: 'Byul', desc: 'Estrella.' },
        { hangul: '바람', roman: 'Baram', desc: 'Viento.' },
        { hangul: '나무', roman: 'Namu', desc: 'Árbol.' },
        { hangul: '산', roman: 'San', desc: 'Montaña.' },
        { hangul: '바다', roman: 'Bada', desc: 'Mar.' },
        { hangul: '숲', roman: 'Sup', desc: 'Bosque.' },
        { hangul: '빛', roman: 'Bit', desc: 'Luz.' },
        { hangul: '햇빛', roman: 'Haetbit', desc: 'Sol brillante.' },
      ]
    },
    {
      title: "Modernos y Divertidos",
      names: [
        { hangul: '레오', roman: 'Leo', desc: 'Moderno.' },
        { hangul: '코코', roman: 'Coco', desc: 'Súper popular.' },
        { hangul: '비비', roman: 'Bibi', desc: 'Corto y sonoro.' },
        { hangul: '루루', roman: 'Ruru', desc: 'Suave.' },
        { hangul: '데데', roman: 'Dodo', desc: 'Elegante.' },
        { hangul: '토토', roman: 'Toto', desc: 'Clásico.' },
        { hangul: '왕자', roman: 'Wangja', desc: 'Príncipe.' },
        { hangul: '공주', roman: 'Gongju', desc: 'Princesa.' },
        { hangul: '사장', roman: 'Sajang', desc: 'Jefe.' },
        { hangul: '오ppa', roman: 'Oppa', desc: 'Hermano mayor (gracioso para mascotas).' },
      ]
    },
    {
      title: "Baby Talk y Sonidos Especiales",
      names: [
        { hangul: '아잉', roman: 'Aing', desc: 'Ternura extrema.' },
        { hangul: '우유', roman: 'Uyu', desc: 'Leche.' },
        { hangul: '꾸기', roman: 'Kkuki', desc: 'Bebé.' },
        { hangul: '뿡', roman: 'Bboong', desc: 'Gracioso.' },
        { hangul: '냥', roman: 'Nyang', desc: 'Gato.' },
        { hangul: '멍', roman: 'Mung', desc: 'Perro.' },
        { hangul: '아기', roman: 'Aegi', desc: 'Bebé.' },
        { hangul: '콩이', roman: 'Kkongi', desc: 'Frijolito.' },
        { hangul: '뚜비', roman: 'Ddubbi', desc: 'Diminutivo.' },
      ]
    }
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
          
          <div className="hero-content text-center mb-8" style={{ margin: '0 auto', maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '4rem' }}>
            <span className="badge mb-4 display-inline-block">Perritos y Gatitos</span>
            <h1 className="display-lg mb-6">Nombres Coreanos para Mascotas</h1>
            <p className="body-lg" style={{ color: 'var(--on-surface-variant)', maxWidth: '500px', margin: '0 auto' }}>
              En Corea los nombres de comida y naturaleza son súper populares para nombrar a perros y gatos por lo tiernos que suenan.
            </p>
          </div>

        {petCategories.map((category, catIdx) => (
          <div key={catIdx} className="mb-12 fade-in">
            <h2 className="title-lg mb-6" style={{ borderLeft: '4px solid var(--primary)', paddingLeft: '1rem' }}>{category.title}</h2>
            <div className="grid-cols-2">
              {category.names.map((pet, idx) => (
                <ShareableItemCard 
                    key={idx}
                    icon={PawPrint}
                    hangul={pet.hangul}
                    roman={pet.roman}
                    desc={pet.desc}
                    shareTitle="Nombre Coreano para Mascota"
                    shareText={`¡Mira este nombre coreano para mi mascota! ${pet.roman} (${pet.hangul}) - ${pet.desc}`}
                    shareType="mascota"
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
