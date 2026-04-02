import { useState } from 'react';
import { BookOpen } from 'lucide-react';

export const CLASSIC_DATA = {
  surnames: [
    { num: 0, roman: 'Park', hangul: '박', meaning: 'luminoso' },
    { num: 1, roman: 'Kim', hangul: '김', meaning: 'oro puro' },
    { num: 2, roman: 'Shin', hangul: '신', meaning: 'intenso/fogoso' },
    { num: 3, roman: 'Choi', hangul: '최', meaning: 'cumbre/cima' },
    { num: 4, roman: 'Song', hangul: '송', meaning: 'linaje Song' },
    { num: 5, roman: 'Kang', hangul: '강', meaning: 'raíz de jengibre' },
    { num: 6, roman: 'Han', hangul: '한', meaning: 'nación coreana' },
    { num: 7, roman: 'Lee', hangul: '이', meaning: 'flor de ciruelo' },
    { num: 8, roman: 'Sung', hangul: '성', meaning: 'triunfo/prosperidad' },
    { num: 9, roman: 'Jung', hangul: '정', meaning: 'íntegro/leal' },
  ],
  months: [
    { num: 1, roman: 'Yong', hangul: '용', meaning: 'audaz/valeroso' },
    { num: 2, roman: 'Ji', hangul: '지', meaning: 'inteligencia/erudición' },
    { num: 3, roman: 'Je', hangul: '제', meaning: 'modestia' },
    { num: 4, roman: 'Hye', hangul: '혜', meaning: 'gracia/bendición' },
    { num: 5, roman: 'Dong', hangul: '동', meaning: 'oriente' },
    { num: 6, roman: 'Sang', hangul: '상', meaning: 'bello/radiante' },
    { num: 7, roman: 'Ha', hangul: '하', meaning: 'caudal/afluente' },
    { num: 8, roman: 'Hyo', hangul: '효', meaning: 'devoción/disciplina' },
    { num: 9, roman: 'Soo', hangul: '수', meaning: 'pionero/cabecilla' },
    { num: 10, roman: 'Eun', hangul: '은', meaning: 'gratitud/fortuna' },
    { num: 11, roman: 'Hyun', hangul: '현', meaning: 'diestro/talentoso' },
    { num: 12, roman: 'Rae', hangul: '래', meaning: 'hierba silvestre' },
  ],
  days: [
    { num: 1, roman: 'Hwa', hangul: '화', meaning: 'concordia/quietud' },
    { num: 2, roman: 'Woo', hangul: '우', meaning: 'rocío/lluvia' },
    { num: 3, roman: 'Joon', hangul: '준', meaning: 'habilidoso' },
    { num: 4, roman: 'Hee', hangul: '희', meaning: 'gozo/afecto' },
    { num: 5, roman: 'Kyo', hangul: '교', meaning: 'pasarela/sendero' },
    { num: 6, roman: 'Kyung', hangul: '경', meaning: 'festejo/júbilo' },
    { num: 7, roman: 'Wook', hangul: '욱', meaning: 'resplandeciente' },
    { num: 8, roman: 'Jin', hangul: '진', meaning: 'incalculable/único' },
    { num: 9, roman: 'Jae', hangul: '재', meaning: 'don natural/destreza' },
    { num: 10, roman: 'Hoon', hangul: '훈', meaning: 'bruma/neblina' },
    { num: 11, roman: 'Ra', hangul: '라', meaning: 'lazo/tejido' },
    { num: 12, roman: 'Bin', hangul: '빈', meaning: 'refinado/cortés' },
    { num: 13, roman: 'Sun', hangul: '선', meaning: 'inicial/pionero' },
    { num: 14, roman: 'Ri', hangul: '리', meaning: 'aldea/poblado' },
    { num: 15, roman: 'Soo', hangul: '수', meaning: 'conductor/líder' },
    { num: 16, roman: 'Rim', hangul: '림', meaning: 'jade precioso/joya' },
    { num: 17, roman: 'Ah', hangul: '아', meaning: 'sucesor/asiático' },
    { num: 18, roman: 'Ae', hangul: '애', meaning: 'querido/entrañable' },
    { num: 19, roman: 'Neul', hangul: '늘', meaning: 'perpetuidad/eternidad' },
    { num: 20, roman: 'Mun', hangul: '먼', meaning: 'umbral/entrada' },
    { num: 21, roman: 'In', hangul: '인', meaning: 'compasión/caridad' },
    { num: 22, roman: 'Mi', hangul: '미', meaning: 'belleza/exquisito' },
    { num: 23, roman: 'Ki', hangul: '기', meaning: 'cimiento/raíz' },
    { num: 24, roman: 'Sang', hangul: '상', meaning: 'preciosidad/grácil' },
    { num: 25, roman: 'Byung', hangul: '병', meaning: 'esplendor/reluciente' },
    { num: 26, roman: 'Seok', hangul: '석', meaning: 'roca milenaria' },
    { num: 27, roman: 'Gun', hangul: '건', meaning: 'vigoroso/firme' },
    { num: 28, roman: 'Yoo', hangul: '유', meaning: 'árbol de sauce' },
    { num: 29, roman: 'Sup', hangul: '섭', meaning: 'equilibrio/sintonía' },
    { num: 30, roman: 'Won', hangul: '원', meaning: 'fuente/dinamismo' },
    { num: 31, roman: 'Sub', hangul: '섭', meaning: 'concordancia/ensamble' },
  ]
};

export default function ClassicBirthdateGenerator({ onGenerate }) {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const handleGenerate = () => {
    if (!day || !month || !year) return;

    const lastDigitOfY = parseInt(year[year.length - 1] || '0');
    const surnameObj = CLASSIC_DATA.surnames.find(s => s.num === lastDigitOfY) || CLASSIC_DATA.surnames[0];
    
    const monthIndex = parseInt(month);
    const monthObj = CLASSIC_DATA.months.find(m => m.num === monthIndex) || CLASSIC_DATA.months[0];
    
    const dayIndex = parseInt(day);
    const dayObj = CLASSIC_DATA.days.find(d => d.num === dayIndex) || CLASSIC_DATA.days[0];

    const koreanName = `${surnameObj.hangul}${monthObj.hangul}${dayObj.hangul}`;
    const romanized = `${surnameObj.roman} ${monthObj.roman} ${dayObj.roman}`;
    
    // Capitalize first letter of combined meaning
    const meaningCombined = `${surnameObj.meaning}, ${monthObj.meaning} y ${dayObj.meaning}.`;
    const meaningCapitalized = meaningCombined.charAt(0).toUpperCase() + meaningCombined.slice(1);

    onGenerate({
      korean: koreanName,
      romanized: romanized,
      meaning: `Significado literal: ${meaningCapitalized}`,
      labelMeaning: meaningCapitalized,
      explanation: `Tu apellido proviene directamente del último dígito de tu año (que da ${surnameObj.roman}), la parte media se tomó del número de tu mes (${monthObj.roman}) y la parte final de tu día exacto de nacimiento (${dayObj.roman}). Es un sistema lúdico clásico súper popular porque le adjudica a tus números elementos bellísimos de la naturaleza y aptitudes.`,
      shareType: 'meaning',
      inputName: romanized,
      shareData: { day, month, year }
    });
  };

  const scrollToExplanation = () => {
    const el = document.getElementById('explicacion-zona');
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="card fade-in">
      <h3 className="title-md mb-2">Método de Tablas Clásicas</h3>
      <p className="body-sm mb-4" style={{ color: 'var(--secondary)' }}>
        Utiliza el famoso método de las 3 tablas de significados por características para armar tu nombre.
      </p>

      <div className="input-group" style={{ marginBottom: '1.5rem' }}>
        <label className="input-label">Año de Nacimiento</label>
        <input 
          type="number" 
          placeholder="Ej: 2004" 
          className="input-field"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>

      <div className="grid-cols-2">
        <div className="input-group">
          <label className="input-label">Mes</label>
          <select 
            className="input-field" 
            value={month} 
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="">Selecciona</option>
            {Array.from({length: 12}, (_, i) => (
              <option key={i+1} value={i+1}>{i+1}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label className="input-label">Día</label>
          <select 
            className="input-field" 
            value={day} 
            onChange={(e) => setDay(e.target.value)}
          >
            <option value="">Selecciona</option>
            {Array.from({length: 31}, (_, i) => (
              <option key={i+1} value={i+1}>{i+1}</option>
            ))}
          </select>
        </div>
      </div>

      <button className="btn btn-primary mt-4" style={{ width: '100%', marginBottom: '1rem' }} onClick={handleGenerate}>
        <BookOpen size={20} /> Construir mi Nombre
      </button>

      <button className="btn btn-secondary" style={{ width: '100%', fontSize: '0.9rem' }} onClick={scrollToExplanation}>
        Leer explicación y ver tablas completas 👇
      </button>
    </div>
  );
}
