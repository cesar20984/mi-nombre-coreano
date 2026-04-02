import SpeakButton from '../components/SpeakButton';

export default function Tattoos() {
  const tattooIdeas = [
    { hangul: '소망', roman: 'Somang', desc: 'Esperanza o deseo profundo.' },
    { hangul: '평화', roman: 'Pyeonghwa', desc: 'Paz.' },
    { hangul: '자유', roman: 'Jayu', desc: 'Libertad.' },
    { hangul: '운명', roman: 'Unmyeong', desc: 'Destino.' },
    { hangul: '영원', roman: 'Yeongwon', desc: 'Eternidad.' },
    { hangul: '가족', roman: 'Gajok', desc: 'Familia.' },
    { hangul: '나 자신을 사랑하라', roman: 'Na jasin-eul saranghara', desc: '"Ámate a ti mismo" (Love yourself).' },
    { hangul: '포기하지마', roman: 'Pogi hajima', desc: '"No te rindas".' }
  ];

  return (
    <section className="section">
      <div className="watermark">타투</div>
      <div className="container">
        
        <div className="text-center mb-8 fade-in">
          <span className="badge">Tinta & Letras</span>
          <h1 className="display-md mb-4">Palabras para Tatuajes</h1>
          <p className="body-lg" style={{ color: 'var(--secondary)', maxWidth: '600px', margin: '0 auto' }}>
            El Hangul es un alfabeto arquitectónico y muy elegante. Aquí tienes ideas de palabras estéticas y significativas para llevar en la piel.
          </p>
        </div>

        <div className="dictionary-grid fade-in animate-delay-200">
          {tattooIdeas.map((idea, idx) => (
            <div key={idx} className="dict-item" style={{ textAlign: 'center', padding: '3rem 1.5rem', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                <SpeakButton text={idea.hangul} size={24} />
              </div>
              <div 
                className="dict-hangul korean-text" 
                style={{ fontSize: '3rem', marginBottom: '1rem', letterSpacing: '-0.05em' }}
              >
                {idea.hangul}
              </div>
              <div className="dict-roman" style={{ color: 'var(--on-surface-variant)' }}>{idea.roman}</div>
              <div className="body-sm" style={{ color: 'var(--secondary)', fontWeight: 600 }}>{idea.desc}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
