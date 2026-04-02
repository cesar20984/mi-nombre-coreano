import { useState } from 'react';
import { Wand2 } from 'lucide-react';

// Basic Transliteration mapping rules
const charMap = {
  'a': '아', 'b': '비', 'c': '시', 'd': '디', 'e': '에',
  'f': '에프', 'g': '지', 'h': '에이치', 'i': '아이', 'j': '제이',
  'k': '케이', 'l': '엘', 'm': '엠', 'n': '엔', 'o': '오',
  'p': '피', 'q': '큐', 'r': '아르', 's': '에스', 't': '티',
  'u': '유', 'v': '브이', 'w': '더블유', 'x': '엑스', 'y': '와이', 'z': '제트',
  'ñ': '니',
};

const phoneticMap = {
  'ba': '바', 'be': '베', 'bi': '비', 'bo': '보', 'bu': '부',
  'ca': '카', 'ce': '세', 'ci': '시', 'co': '코', 'cu': '쿠',
  'da': '다', 'de': '데', 'di': '디', 'do': '도', 'du': '두',
  'fa': '파', 'fe': '페', 'fi': '피', 'fo': '포', 'fu': '푸',
  'ga': '가', 'ge': '헤', 'gi': '히', 'go': '고', 'gu': '구',
  'ha': '아', 'he': '에', 'hi': '이', 'ho': '오', 'hu': '우',
  'ja': '하', 'je': '헤', 'ji': '히', 'jo': '호', 'ju': '후',
  'ka': '카', 'ke': '케', 'ki': '키', 'ko': '코', 'ku': '쿠',
  'la': '라', 'le': '레', 'li': '리', 'lo': '로', 'lu': '루',
  'ma': '마', 'me': '메', 'mi': '미', 'mo': '모', 'mu': '무',
  'na': '나', 'ne': '네', 'ni': '니', 'no': '노', 'nu': '누',
  'pa': '파', 'pe': '페', 'pi': '피', 'po': '포', 'pu': '푸',
  'ra': '라', 're': '레', 'ri': '리', 'ro': '로', 'ru': '루',
  'sa': '사', 'se': '세', 'si': '시', 'so': '소', 'su': '수',
  'ta': '타', 'te': '테', 'ti': '티', 'to': '토', 'tu': '투',
  'va': '바', 've': '베', 'vi': '비', 'vo': '보', 'vu': '부',
  'ya': '야', 'ye': '예', 'yo': '요', 'yu': '유',
  'za': '사', 'ze': '세', 'zi': '시', 'zo': '소', 'zu': '수',
};

export default function TransliterationGenerator({ onGenerate }) {
  const [name, setName] = useState('');

  const transliterate = (input) => {
    let lower = input.toLowerCase().replace(/[^a-zñ]/g, '');
    let result = '';
    
    let i = 0;
    while(i < lower.length) {
      if (i < lower.length - 1) {
        let pair = lower.substring(i, i+2);
        if (phoneticMap[pair]) {
          result += phoneticMap[pair];
          i += 2;
          continue;
        }
      }
      result += charMap[lower[i]] || '';
      i++;
    }
    return result;
  };

  const handleGenerate = () => {
    if (!name.trim()) return;

    const korean = transliterate(name);
    onGenerate({
      korean: korean || '이름',
      romanized: name,
      meaning: 'La transliteración fonética de tu nombre a caracteres Hangul.',
      explanation: 'Para lograr este resultado leímos tu nombre sílaba a sílaba en español y encontramos los bloques del alfabeto coreano (Hangul) que generan el mismo sonido o uno idéntico. Así es exactamente como un nativo trataría de pronunciarlo y escribirlo basándose solo en cómo suena al escucharlo, dándole a tu nombre de nacimiento el perfecto look "Hallyu".'
    });
  };

  return (
    <div className="card fade-in">
      <h3 className="title-md mb-2">Transliteración Real</h3>
      <p className="body-sm mb-4" style={{ color: 'var(--secondary)' }}>
        Escribe tu nombre real y lo convertiremos fonéticamente al alfabeto coreano (Hangul).
      </p>

      <div className="input-group">
        <label className="input-label">Tu Nombre</label>
        <input 
          type="text" 
          placeholder="Ej: Carlos" 
          className="input-field"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <button className="btn btn-primary mt-4" style={{ width: '100%', marginBottom: '1rem' }} onClick={handleGenerate}>
        <Wand2 size={20} /> Transliterar
      </button>

      <button className="btn btn-secondary" style={{ width: '100%', fontSize: '0.9rem' }} onClick={() => {
        const el = document.getElementById('explicacion-zona');
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
      }}>
        Descubre cómo funciona esto 👇
      </button>
    </div>
  );
}
