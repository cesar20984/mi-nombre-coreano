import { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { transliterate } from '../utils/koreanGenerators';

export default function TransliterationGenerator({ onGenerate }) {
  const [name, setName] = useState('');

  const handleGenerate = () => {
    if (!name.trim()) return;

    const korean = transliterate(name);
    onGenerate({
      korean: korean || '이름',
      romanized: name,
      meaning: 'La transliteración fonética de tu nombre a caracteres Hangul.',
      explanation: 'Para lograr este resultado leímos tu nombre sílaba a sílaba en español y encontramos los bloques del alfabeto coreano (Hangul) que generan el mismo sonido o uno idéntico. Así es exactamente como un nativo trataría de pronunciarlo y escribirlo basándose solo en cómo suena al escucharlo, dándole a tu nombre de nacimiento el perfecto look "Hallyu".',
      shareType: 'my-name',
      inputName: name
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
