import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { Search, ExternalLink } from 'lucide-react';
import SpeakButton from '../components/SpeakButton';
import { fullDictionary } from '../data/dictionaryData';

export default function Dictionary() {
  const { letter } = useParams();
  const navigate = useNavigate();
  const activeLetter = letter ? letter.toLowerCase() : 'a';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [dbNames, setDbNames] = useState([]);
  const [genderFilter, setGenderFilter] = useState('all'); // all, f, m
  
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  useEffect(() => {
    fetch('/api/articles?dictionary=true')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setDbNames(data);
      })
      .catch(console.error);
  }, []);

  const getGender = (name) => {
    const f = ['a', 'yeon', 'young', 'hee', 'eun', 'in', 'rin', 'ji', 'mi', 'ra', 'na', 'ah'];
    const m = ['jun', 'ho', 'hyuk', 'seok', 'min', 'woo', 'hyun', 'gyu', 'soo', 'bin', 'ha', 'jae'];
    const nameL = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    for (let suf of f) if (nameL.endsWith(suf)) return 'f';
    for (let suf of m) if (nameL.endsWith(suf)) return 'm';
    return 'u';
  };

  const combinedDictionary = useMemo(() => {
    const dict = fullDictionary.map(d => ({ ...d, gender: d.gender || getGender(d.roman) }));
    const dictNames = new Set(dict.map(d => d.roman.normalize("NFD").replace(/[\u0300-\u036f\- ]/g, "").toLowerCase()));
    
    dbNames.forEach(dbn => {
      const dbRomanPure = dbn.title.normalize("NFD").replace(/[\u0300-\u036f\- ]/g, "").toLowerCase();
      if (!dictNames.has(dbRomanPure)) {
        dict.push({
          hangul: dbn.title,
          roman: dbn.title,
          meaning: 'Significado detallado disponible en el artículo completo.',
          style: 'light',
          isArticle: true,
          slug: dbn.name,
          gender: getGender(dbn.title)
        });
        dictNames.add(dbRomanPure);
      } else {
        const existing = dict.find(d => d.roman.normalize("NFD").replace(/[\u0300-\u036f\- ]/g, "").toLowerCase() === dbRomanPure);
        if (existing) {
          existing.isArticle = true;
          existing.slug = dbn.name;
        }
      }
    });
    
    // Sort dict alphabetically
    dict.sort((a, b) => a.roman.localeCompare(b.roman));
    return dict;
  }, [dbNames]);

  // Logic: First filter by gender, then search/letter
  const filteredData = useMemo(() => {
    let result = combinedDictionary;
    
    if (genderFilter !== 'all') {
      result = result.filter(item => item.gender === genderFilter || item.gender === 'u');
    }

    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      return result.filter(item => 
        item.roman.toLowerCase().includes(term) || 
        item.meaning.toLowerCase().includes(term) ||
        item.hangul.toLowerCase().includes(term)
      );
    }
    
    return result.filter(item => item.roman.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().startsWith(activeLetter));
  }, [searchTerm, activeLetter, combinedDictionary, genderFilter]);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() === '') return;
    
    if (filteredData.length === 0) {
      try {
        await fetch('/api/searches', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: searchTerm, type: 'dictionary_not_found' })
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Si busca algo y el activeLetter no hace match y borra todo, navegamos automáticamente a una vista genérica o evitamos error visual.
  // Pero lo dejaremos tal cual para que la URL persista y actúe como filtro primario.

  return (
    <>
      <SEO 
        title={`Diccionario de Nombres Coreanos | Letra ${activeLetter.toUpperCase()}`} 
        description="Explora un extenso directorio de nombres coreanos nativos femeninos y masculinos, traducidos con su significado exacto al español." 
        keywords="nombres coreanos para niños, nombres coreanos femeninos, diccionario de nombres coreanos, nombres coreanos con significado"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Inicio",
                "item": "https://koriname.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Diccionario",
                "item": "https://koriname.com/diccionario"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": `Letra ${activeLetter.toUpperCase()}`,
                "item": `https://koriname.com/diccionario/${activeLetter}`
              }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "DefinedTermSet",
            "name": `Diccionario de Nombres Coreanos - Letra ${activeLetter.toUpperCase()}`,
            "description": `Nombres coreanos que empiezan con la letra ${activeLetter.toUpperCase()}`,
            "hasDefinedTerm": filteredData.map(item => ({
              "@type": "DefinedTerm",
              "name": item.roman,
              "termCode": item.hangul,
              "description": item.meaning
            }))
          }
        ]}
      />
      <section className="section" style={{ paddingBottom: '2rem' }}>
        <div className="container relative">
          <div className="watermark" style={{ top: '-40px', right: '0', fontSize: 'clamp(8rem, 20vw, 15rem)', opacity: 0.05, textAlign: 'right', zIndex: 1, whiteSpace:'nowrap', lineHeight:0.8 }}>이름</div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem', position: 'relative', zIndex: 2, alignItems: 'center' }}>
            <div>
              <span className="badge mb-4 display-inline-block">Directorio A-Z</span>
              <h1 style={{ fontSize: 'clamp(3rem, 6vw, 4rem)', fontWeight: 800, color: 'var(--primary)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
                Diccionario de<br/>Nombres Coreanos
              </h1>
            </div>
            <div>
              <p className="body-lg" style={{ color: 'var(--on-surface-variant)', maxWidth: '400px' }}>
                Explora una amplia variedad de nombres coreanos populares y puros (nativos) con sus respectivos significados.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', gap: '0.25rem', overflowX: 'auto', paddingBottom: '0.5rem', flex: '1 1 auto', scrollbarWidth: 'none' }}>
              {alphabet.map(l => (
                <Link key={l} to={`/diccionario/${l.toLowerCase()}`} style={{
                   minWidth: '36px', height: '36px', borderRadius: '50%', 
                   display: 'flex', alignItems: 'center', justifyContent: 'center', 
                   background: activeLetter === l.toLowerCase() ? 'var(--primary)' : 'transparent',
                   color: activeLetter === l.toLowerCase() ? 'white' : 'var(--on-surface)',
                   textDecoration: 'none',
                   fontWeight: activeLetter === l.toLowerCase() ? 700 : 400,
                   fontSize: '0.85rem',
                   flexShrink: 0,
                   transition: 'all 0.2s'
                }}>
                  {l}
                </Link>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem', scrollbarWidth: 'none' }}>
              <div style={{ display: 'flex', background: 'var(--surface-container)', borderRadius: '30px', padding: '0.3rem' }}>
                <button 
                  onClick={() => setGenderFilter('all')}
                  style={{ padding: '0.4rem 1rem', borderRadius: '30px', border: 'none', background: genderFilter === 'all' ? 'var(--primary)' : 'transparent', color: genderFilter === 'all' ? 'white' : 'var(--on-surface-variant)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                >Todos</button>
                <button 
                  onClick={() => setGenderFilter('f')}
                  style={{ padding: '0.4rem 1rem', borderRadius: '30px', border: 'none', background: genderFilter === 'f' ? '#e91e63' : 'transparent', color: genderFilter === 'f' ? 'white' : 'var(--on-surface-variant)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                >Femeninos</button>
                <button 
                  onClick={() => setGenderFilter('m')}
                  style={{ padding: '0.4rem 1rem', borderRadius: '30px', border: 'none', background: genderFilter === 'm' ? '#2196f3' : 'transparent', color: genderFilter === 'm' ? 'white' : 'var(--on-surface-variant)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                >Masculinos</button>
              </div>
            </div>

            <form onSubmit={handleSearchSubmit} style={{ position: 'relative', width: '320px', maxWidth: '100%' }}>
              <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--outline-variant)' }} />
              <input 
                type="text" 
                placeholder="Buscar nombre o significado..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '0.9rem 1rem 0.9rem 2.8rem', borderRadius: '30px', border: 'none', background: 'var(--surface-container)', fontSize: '0.9rem', color: 'var(--on-surface)', outline: 'none' }}
              />
            </form>
          </div>

          <div className="dict-grid-container fade-in animate-delay-200">
            {filteredData.length > 0 ? filteredData.map((item, idx) => (
              <div key={idx} className={`dict-masonry-card style-${item.style}`}>
                {item.style === 'light-large-hangul' && <div className="huge-bg-hangul">{item.hangul}</div>}
                
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h2 className="korean-text" style={{ fontSize: item.style === 'light-large-hangul' ? '2.5rem' : '3.5rem', fontWeight: 800, marginBottom: '0.5rem', color: item.style === 'dark-green' ? 'white' : 'var(--primary)' }}>
                      {item.hangul}
                    </h2>
                    {item.pop && <span style={{ background: 'var(--secondary-container)', color: 'var(--primary)', padding: '0.2rem 0.6rem', fontSize: '0.7rem', fontWeight: 700, borderRadius: '4px', letterSpacing: '0.05em' }}>POPULAR</span>}
                    <div style={{ display: item.style === 'dark-green' ? 'none' : 'block' }}>
                      <SpeakButton text={item.hangul} />
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: item.style === 'dark-green' ? 'white' : 'var(--on-surface)' }}>
                      {item.roman}
                    </h3>
                    {item.isArticle && (
                      <Link to={`/nombre-coreano/${item.slug}`} className="tooltip" data-tooltip="Leer el artículo completo" style={{ color: 'var(--primary)', display: 'inline-flex', padding: '4px', background: 'var(--secondary-container)', borderRadius: '50%' }}>
                        <ExternalLink size={14} />
                      </Link>
                    )}
                  </div>
                  
                  <p style={{ fontSize: '0.9rem', color: item.style === 'dark-green' ? 'rgba(255,255,255,0.8)' : 'var(--on-surface-variant)', lineHeight: 1.6 }}>
                    {item.meaning}
                  </p>
                </div>
              </div>
            )) : (
              <div style={{ padding: '3rem', textAlign: 'center', gridColumn: '1 / -1', opacity: 0.5 }}>
                 <p className="body-lg">No encontramos resultados.</p>
              </div>
            )}
          </div>
          
        </div>
      </section>

      {/* Footer Banner */}
      <section className="section section-alt mt-8" style={{ padding: '4rem 0', overflow: 'hidden' }}>
        <div className="container relative">
           <div className="watermark" style={{ top: '-10%', right: '5%', fontSize: ' clamp(10rem, 20vw, 15rem)', opacity: 0.03, textAlign: 'right', zIndex: 1, whiteSpace:'nowrap', lineHeight:0.8 }}>사주</div>
           <div style={{display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'center', justifyContent: 'center', zIndex: 2, position: 'relative', textAlign: 'center'}}>
             <div style={{ flex: '1 1 100%', maxWidth: '600px', margin: '0 auto' }}>
               <h2 className="display-sm mb-4" style={{ fontWeight: 800 }}>¿No encuentras<br/>el nombre ideal?</h2>
               <p className="body-md mb-6" style={{color: 'var(--on-surface-variant)'}}>
                 Nuestro generador utiliza algoritmos basados en la sonoridad tradicional y significados históricos para ofrecerte recomendaciones personalizadas según tu apellido o fecha de nacimiento.
               </p>
               <Link to="/" className="btn btn-primary" style={{ display: 'inline-flex' }}>Probar el Generador Gratis</Link>
             </div>
           </div>
        </div>
      </section>
    </>
  );
}
