import { useParams, useSearchParams, Link, useLocation } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import LabelCreator from '../components/LabelCreator';
import SEO from '../components/SEO';
import { transliterate } from '../utils/koreanGenerators';
import { CLASSIC_DATA } from '../components/ClassicBirthdateGenerator';

// ─── Saju tables (mirrored from BirthdateGenerator) ───
const SAJU_SURNAMES = [
  "김 (Kim)", "이 (Lee)", "박 (Park)", "최 (Choi)", "정 (Jeong)", 
  "강 (Kang)", "조 (Cho)", "윤 (Yoon)", "장 (Jang)", "임 (Lim)"
];
const SAJU_MONTH_NAMES = {
  F: ["은 (Eun)", "다 (Da)", "지 (Ji)", "수 (Su)", "효 (Hyo)", "나 (Na)", "연 (Yeon)", "서 (Seo)", "윤 (Yoon)", "아 (Ah)", "유 (Yu)", "희 (Hee)"],
  M: ["도 (Do)", "하 (Ha)", "시 (Si)", "재 (Jae)", "승 (Seung)", "민 (Min)", "건 (Geon)", "태 (Tae)", "진 (Jin)", "혁 (Hyuk)", "현 (Hyun)", "우 (Woo)"],
  U: ["지 (Ji)", "수 (Su)", "은 (Eun)", "민 (Min)", "연 (Yeon)", "서 (Seo)", "태 (Tae)", "진 (Jin)", "현 (Hyun)", "유 (Yu)", "해 (Hae)", "솔 (Sol)"]
};
const SAJU_DAY_NAMES = {
  F: ["영 (Young)", "진 (Jin)", "희 (Hee)", "은 (Eun)", "주 (Ju)", "아 (Ah)", "경 (Kyung)", "원 (Won)", "연 (Yeon)", "서 (Seo)", "미 (Mi)", "린 (Rin)", "솔 (Sol)", "빈 (Bin)", "정 (Jeong)", "솜 (Som)", "별 (Byeol)", "나 (Na)", "슬 (Seul)", "하 (Ha)", "리 (Ri)", "비 (Bi)", "혜 (Hye)", "인 (In)", "봄 (Bom)", "설 (Seol)", "화 (Hwa)", "윤 (Yoon)", "다 (Da)", "란 (Ran)", "루 (Ru)"],
  M: ["영 (Young)", "진 (Jin)", "준 (Jun)", "훈 (Hoon)", "섭 (Seop)", "주 (Ju)", "성 (Sung)", "재 (Jae)", "환 (Hwan)", "동 (Dong)", "건 (Geon)", "빈 (Bin)", "혁 (Hyuk)", "우 (Woo)", "상 (Sang)", "원 (Won)", "민 (Min)", "석 (Seok)", "철 (Cheol)", "호 (Ho)", "기 (Ki)", "태 (Tae)", "경 (Kyung)", "수 (Su)", "겸 (Gyeom)", "식 (Sik)", "빈 (Bin)", "율 (Yul)", "도 (Do)", "찬 (Chan)", "균 (Gyun)"],
  U: ["영 (Young)", "진 (Jin)", "준 (Jun)", "훈 (Hoon)", "섭 (Seop)", "주 (Ju)", "성 (Sung)", "재 (Jae)", "환 (Hwan)", "동 (Dong)", "건 (Geon)", "빈 (Bin)", "혁 (Hyuk)", "우 (Woo)", "상 (Sang)", "원 (Won)", "민 (Min)", "선 (Sun)", "희 (Hee)", "설 (Seol)", "미 (Mi)", "윤 (Yoon)", "경 (Kyung)", "아 (Ah)", "림 (Rim)", "비 (Bi)", "혜 (Hye)", "솔 (Sol)", "별 (Byeol)", "하 (Ha)", "루 (Ru)"]
};

// ─── Generator functions ───

function generateTransliteration(name) {
  const result = transliterate(name);
  return {
    korean: result.korean || '이름',
    romanized: name,
    pronunciation: result.pronunciation,
    meaning: 'Transliteración fonética directa al alfabeto Hangul.',
    labelMeaning: 'Transliteración fonética directa al alfabeto Hangul.',
    explanation: 'Este resultado se obtiene leyendo el nombre sílaba a sílaba en español y encontrando los bloques del alfabeto coreano (Hangul) que generan el mismo sonido.'
  };
}

function generateSaju(name, day, month, year, gender) {
  const g = gender || 'U';
  const lastDigit = parseInt(String(year).slice(-1)) || 0;
  const surnameStr = SAJU_SURNAMES[lastDigit];
  const monthStr = SAJU_MONTH_NAMES[g][(parseInt(month) - 1)] || SAJU_MONTH_NAMES[g][0];
  const dayStr = SAJU_DAY_NAMES[g][(parseInt(day) - 1)] || SAJU_DAY_NAMES[g][0];

  const koreanName = `${surnameStr.split(' ')[0]}${monthStr.split(' ')[0]}${dayStr.split(' ')[0]}`;
  const romanized = `${surnameStr.match(/\(([^)]+)\)/)[1]} ${monthStr.match(/\(([^)]+)\)/)[1]}${dayStr.match(/\(([^)]+)\)/)[1].toLowerCase()}`;
  const genderText = g === 'F' ? 'femenino' : (g === 'M' ? 'masculino' : 'unisex');

  return {
    korean: koreanName,
    romanized: romanized,
    meaning: `Nombre de estilo ${genderText} generado a partir de la fecha ${day}/${month}/${year}.`,
    labelMeaning: `Estilo ${genderText} • Fecha ${day}/${month}/${year}`,
    explanation: `Apellido "${surnameStr}" por el último dígito del año, sílaba "${monthStr}" por el mes y "${dayStr}" por el día de nacimiento.`
  };
}

function generateMeaning(name, day, month, year) {
  const lastDigit = parseInt(String(year).slice(-1)) || 0;
  const surnameObj = CLASSIC_DATA.surnames.find(s => s.num === lastDigit) || CLASSIC_DATA.surnames[0];
  const monthObj = CLASSIC_DATA.months.find(m => m.num === parseInt(month)) || CLASSIC_DATA.months[0];
  const dayObj = CLASSIC_DATA.days.find(d => d.num === parseInt(day)) || CLASSIC_DATA.days[0];

  const koreanName = `${surnameObj.hangul}${monthObj.hangul}${dayObj.hangul}`;
  const romanized = `${surnameObj.roman} ${monthObj.roman} ${dayObj.roman}`;
  const meaningCombined = `${surnameObj.meaning}, ${monthObj.meaning} y ${dayObj.meaning}.`;
  const meaningCapitalized = meaningCombined.charAt(0).toUpperCase() + meaningCombined.slice(1);

  return {
    korean: koreanName,
    romanized: romanized,
    meaning: `Significado literal: ${meaningCapitalized}`,
    labelMeaning: meaningCapitalized,
    explanation: `Apellido ${surnameObj.roman} por el último dígito del año, ${monthObj.roman} por el mes y ${dayObj.roman} por el día de nacimiento.`
  };
}

// ─── URL builder for share ───

function normalizeSlug(str) {
  return str
    .normalize('NFD')                   // decompose accents: é → e + ́
    .replace(/[\u0300-\u036f]/g, '')    // strip combining diacritical marks
    .replace(/[''"`]/g, '')             // strip quotes/apostrophes
    .replace(/\s+/g, '-')              // spaces → hyphens
    .toLowerCase();
}

export function buildShareUrl(type, data) {
  // type: 'my-name' | 'saju' | 'meaning'
  const slug = normalizeSlug(data.name);
  const base = `${window.location.origin}/${type}/${slug}`;
  const params = new URLSearchParams();
  if (data.day) params.set('d', data.day);
  if (data.month) params.set('m', data.month);
  if (data.year) params.set('y', data.year);
  if (data.gender) params.set('g', data.gender);
  const qs = params.toString();
  return qs ? `${base}?${qs}` : base;
}

// ─── Detect route type from pathname ───
function getTypeFromPath(pathname) {
  if (pathname.startsWith('/my-name')) return 'my-name';
  if (pathname.startsWith('/saju')) return 'saju';
  if (pathname.startsWith('/meaning')) return 'meaning';
  return null;
}

const TYPE_LABELS = {
  'my-name': 'Transliteración',
  'saju': 'Saju (Fecha de nacimiento)',
  'meaning': 'Tablas de significado'
};

// ─── Component ───
export default function SharedView() {
  const { name: rawName } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  
  const type = getTypeFromPath(location.pathname);
  const name = decodeURIComponent(rawName || '');

  const result = useMemo(() => {
    if (!name) return null;
    const day = searchParams.get('d');
    const month = searchParams.get('m');
    const year = searchParams.get('y');
    const gender = searchParams.get('g');

    switch (type) {
      case 'my-name':
        return generateTransliteration(name);
      case 'saju':
        if (!day || !month || !year) {
          return {
            korean: '',
            romanized: name,
            meaning: null,
            explanation: null,
            noActions: true
          };
        }
        return generateSaju(name, day, month, year, gender);
      case 'meaning':
        if (!day || !month || !year) {
          return {
            korean: '',
            romanized: name,
            meaning: null,
            explanation: null,
            noActions: true
          };
        }
        return generateMeaning(name, day, month, year);
      default:
        return null;
    }
  }, [type, name, searchParams]);

  const [articleContent, setArticleContent] = useState(null);

  useEffect(() => {
    async function fetchArticle() {
      if (!name || !type) return;
      try {
        const res = await fetch(`/api/articles?type=${type}&name=${encodeURIComponent(name)}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.content) {
            setArticleContent(data.content);
          }
        }
      } catch (err) {
        console.error("Error fetching article:", err);
      }
    }
    fetchArticle();
  }, [name, type]);

  if (!result) {
    return (
      <section className="section" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container">
          <h1 className="display-md mb-4">Enlace no válido</h1>
          <p className="body-lg mb-6" style={{ color: 'var(--on-surface-variant)' }}>Este enlace ha expirado o no es válido.</p>
          <Link to="/" className="btn btn-primary">Ir a Koriname.com</Link>
        </div>
      </section>
    );
  }

  const displayName = name.charAt(0).toUpperCase() + name.slice(1);

  // Build proper SEO per type — each must be truly unique
  const seoByType = {
    'my-name': {
      title: `¿Cómo se escribe ${displayName} en Coreano? → ${result.korean}`,
      description: `${displayName} en coreano se escribe ${result.korean}. Aprende cómo se pronuncia tu nombre en el alfabeto Hangul con audio incluido. Prueba gratis en Koriname.com`,
      keywords: `${displayName} en coreano, como se escribe ${displayName} en coreano, ${result.korean}, transliteración coreano, nombre en hangul`
    },
    'saju': {
      title: `Nombre Coreano de ${displayName} según su Fecha de Nacimiento`,
      description: `Según el Saju (사주), el nombre coreano de ${displayName} es ${result.romanized} (${result.korean}). Descubre qué nombre coreano te asigna tu fecha de nacimiento en Koriname.com`,
      keywords: `nombre coreano por fecha de nacimiento, saju ${displayName}, ${result.romanized}, ${result.korean}, nombre coreano por cumpleaños`
    },
    'meaning': {
      title: `${result.romanized} (${result.korean}) — Significado del Nombre Coreano`,
      description: `El nombre coreano ${result.romanized} (${result.korean}) significa: ${result.meaning}. Descubre el significado del tuyo con el método clásico de tablas en Koriname.com`,
      keywords: `significado nombre coreano ${result.romanized}, que significa ${result.korean}, ${displayName} significado coreano, nombre coreano por significado`
    }
  };

  const seo = seoByType[type] || seoByType['my-name'];

  return (
    <>
      <SEO 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
      />

      <section className="section section-alt" style={{ paddingBottom: '4rem' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          {/* Intro */}
          <div className="fade-in text-center mb-6">
            <span className="badge">{TYPE_LABELS[type] || 'Nombre Coreano'}</span>
            <h1 className="display-md mb-2" style={{ marginTop: '1rem' }}>
              <span style={{ color: 'var(--secondary)' }}>{displayName}</span> en Coreano
            </h1>
            <p className="body-lg" style={{ color: 'var(--on-surface-variant)' }}>
              Así suena y se escribe en el alfabeto Hangul
            </p>
          </div>

          {/* Full LabelCreator — same as Home, with shared view mode */}
          <LabelCreator result={result} isSharedView />

          {/* Explanation */}
          {result.explanation && (
            <div className="fade-in animate-delay-200" style={{ backgroundColor: 'var(--surface-container-low)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--outline-variant)', maxWidth: '650px', margin: '3rem auto 0 auto' }}>
              <p className="body-md" style={{ color: 'var(--on-surface)', lineHeight: 1.6, margin: 0, textAlign: 'left' }}>
                <strong style={{ color: 'var(--secondary)', display: 'block', marginBottom: '0.5rem' }}>¿Cómo se obtuvo este nombre?</strong>
                {result.explanation}
              </p>
            </div>
          )}

          {/* Custom Article Content from Database */}
          {articleContent && (
            <div 
              className="fade-in animate-delay-300 article-content" 
              style={{ 
                marginTop: '3rem', 
                padding: '0 1rem', 
                textAlign: 'left',
                lineHeight: '1.8'
              }}
              dangerouslySetInnerHTML={{ __html: articleContent }}
            />
          )}

          {/* CTA */}
          <div className="fade-in animate-delay-300 text-center" style={{ marginTop: '3rem' }}>
            <Link 
              to="/"
              className="btn btn-primary"
              style={{ 
                padding: '1rem 2.5rem', 
                fontSize: '1.05rem',
                borderRadius: '2rem',
                gap: '0.75rem',
                boxShadow: '0 8px 30px rgba(6, 27, 14, 0.2)'
              }}
            >
              <Sparkles size={20} />
              ¡Descubre tu propio nombre en coreano!
              <ArrowRight size={20} />
            </Link>
            
            <p className="body-sm mt-6" style={{ opacity: 0.5 }}>
              Generado con ❤ en <a href="https://koriname.com" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Koriname.com</a>
            </p>
          </div>

        </div>
      </section>
    </>
  );
}
