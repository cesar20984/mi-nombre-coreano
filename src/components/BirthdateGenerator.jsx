import { useState } from 'react';
import { Sparkles, Calendar, BookOpen } from 'lucide-react';

const SURNAMES = [
  "김 (Kim)", "이 (Lee)", "박 (Park)", "최 (Choi)", "정 (Jeong)", 
  "강 (Kang)", "조 (Cho)", "윤 (Yoon)", "장 (Jang)", "임 (Lim)"
];

const MONTH_NAMES = {
  F: ["은 (Eun)", "다 (Da)", "지 (Ji)", "수 (Su)", "효 (Hyo)", "나 (Na)", "연 (Yeon)", "서 (Seo)", "윤 (Yoon)", "아 (Ah)", "유 (Yu)", "희 (Hee)"],
  M: ["도 (Do)", "하 (Ha)", "시 (Si)", "재 (Jae)", "승 (Seung)", "민 (Min)", "건 (Geon)", "태 (Tae)", "진 (Jin)", "혁 (Hyuk)", "현 (Hyun)", "우 (Woo)"],
  U: ["지 (Ji)", "수 (Su)", "은 (Eun)", "민 (Min)", "연 (Yeon)", "서 (Seo)", "태 (Tae)", "진 (Jin)", "현 (Hyun)", "유 (Yu)", "해 (Hae)", "솔 (Sol)"]
};

// 31 days
const DAY_NAMES = {
  F: ["영 (Young)", "진 (Jin)", "희 (Hee)", "은 (Eun)", "주 (Ju)", "아 (Ah)", "경 (Kyung)", "원 (Won)", "연 (Yeon)", "서 (Seo)", "미 (Mi)", "린 (Rin)", "솔 (Sol)", "빈 (Bin)", "정 (Jeong)", "솜 (Som)", "별 (Byeol)", "나 (Na)", "슬 (Seul)", "하 (Ha)", "리 (Ri)", "비 (Bi)", "혜 (Hye)", "인 (In)", "봄 (Bom)", "설 (Seol)", "화 (Hwa)", "윤 (Yoon)", "다 (Da)", "란 (Ran)", "루 (Ru)"],
  M: ["영 (Young)", "진 (Jin)", "준 (Jun)", "훈 (Hoon)", "섭 (Seop)", "주 (Ju)", "성 (Sung)", "재 (Jae)", "환 (Hwan)", "동 (Dong)", "건 (Geon)", "빈 (Bin)", "혁 (Hyuk)", "우 (Woo)", "상 (Sang)", "원 (Won)", "민 (Min)", "석 (Seok)", "철 (Cheol)", "호 (Ho)", "기 (Ki)", "태 (Tae)", "경 (Kyung)", "수 (Su)", "겸 (Gyeom)", "식 (Sik)", "빈 (Bin)", "율 (Yul)", "도 (Do)", "찬 (Chan)", "균 (Gyun)"],
  U: ["영 (Young)", "진 (Jin)", "준 (Jun)", "훈 (Hoon)", "섭 (Seop)", "주 (Ju)", "성 (Sung)", "재 (Jae)", "환 (Hwan)", "동 (Dong)", "건 (Geon)", "빈 (Bin)", "혁 (Hyuk)", "우 (Woo)", "상 (Sang)", "원 (Won)", "민 (Min)", "선 (Sun)", "희 (Hee)", "설 (Seol)", "미 (Mi)", "윤 (Yoon)", "경 (Kyung)", "아 (Ah)", "림 (Rim)", "비 (Bi)", "혜 (Hye)", "솔 (Sol)", "별 (Byeol)", "하 (Ha)", "루 (Ru)"]
};

export default function BirthdateGenerator({ onGenerate }) {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [gender, setGender] = useState('U');

  const handleGenerate = () => {
    if (!day || !month || !year) return;

    // A fun algorithmic mapping for entertainment purposes
    const lastDigitOfY = parseInt(year[year.length - 1] || '0');
    const surnameIndex = lastDigitOfY;
    const monthIndex = parseInt(month) - 1;
    const dayIndex = parseInt(day) - 1;

    const surnameStr = SURNAMES[surnameIndex];
    const monthStr = MONTH_NAMES[gender][monthIndex];
    const dayStr = DAY_NAMES[gender][dayIndex];

    const koreanName = `${surnameStr.split(' ')[0]}${monthStr.split(' ')[0]}${dayStr.split(' ')[0]}`;
    const romanized = `${surnameStr.match(/\(([^)]+)\)/)[1]} ${monthStr.match(/\(([^)]+)\)/)[1]}${dayStr.match(/\(([^)]+)\)/)[1].toLowerCase()}`;

    const genderText = gender === 'F' ? 'femenino' : (gender === 'M' ? 'masculino' : 'unisex');

    onGenerate({
      korean: koreanName,
      romanized: romanized,
      meaning: `Combinación de estilo ${genderText} ensamblada a partir de tu fecha ${day}/${month}/${year}.`,
    });
  };

  return (
    <div className="card fade-in">
      <h3 className="title-md mb-2">Generador Dinámico por Fecha</h3>
      <p className="body-sm mb-4" style={{ color: 'var(--secondary)' }}>
        Crea una aproximación realista de tu nombre coreano cruzando tu fecha con una base de datos silábica.
      </p>

      <div className="grid-cols-2" style={{ marginBottom: '1.5rem' }}>
        <div className="input-group" style={{ marginBottom: 0 }}>
          <label className="input-label">Estilo / Identidad</label>
          <select 
            className="input-field" 
            value={gender} 
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="U">Neutro / Unisex</option>
            <option value="F">Femenino (Suave)</option>
            <option value="M">Masculino (Fuerte)</option>
          </select>
        </div>

        <div className="input-group" style={{ marginBottom: 0 }}>
          <label className="input-label">Año</label>
          <input 
            type="number" 
            placeholder="Ej: 1995" 
            className="input-field"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
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
        <Calendar size={20} /> Descubrir mi Nombre
      </button>

      <button className="btn btn-secondary" style={{ width: '100%', fontSize: '0.9rem' }} onClick={() => {
        const el = document.getElementById('explicacion-zona');
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
      }}>
        ¿Cómo calculamos esto? 👇
      </button>
    </div>
  );
}
