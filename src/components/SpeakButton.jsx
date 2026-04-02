import { useState } from 'react';
import { Volume2 } from 'lucide-react';

export default function SpeakButton({ text, size = 24, className = '' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported] = useState('speechSynthesis' in window);

  const speak = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isSupported || !text) return;
    
    // Detiene cualquier reproducción actual
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR'; // Establece el idioma a Coreano
    // Buscamos voces en coreano y preferimos una si está disponible
    const voices = window.speechSynthesis.getVoices();
    const koreanVoice = voices.find(v => v.lang.includes('ko'));
    if (koreanVoice) utterance.voice = koreanVoice;
    
    utterance.rate = 0.85; // Un poco más lento para escuchar claramente las sílabas
    
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    
    window.speechSynthesis.speak(utterance);
  };

  if (!isSupported) return null;

  return (
    <button 
      onClick={speak} 
      className={`speak-btn ${isPlaying ? 'playing' : ''} ${className}`}
      title="Escuchar pronunciación"
    >
      <Volume2 size={size} />
    </button>
  );
}
