import { useEffect, useRef, useState, useCallback } from "react";

function getBestVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  
  const deepNarratorVoices = [
    'Google UK English Male',
    'Microsoft David',
    'Daniel',
    'Alex',
    'Google US English Male',
    'Microsoft Mark',
    'Google हिन्दी',
    'Microsoft Ravi - English (India)'
  ];

  for (const voiceName of deepNarratorVoices) {
    const voice = voices.find(v => v.name.includes(voiceName));
    if (voice) return voice;
  }

  const maleVoice = voices.find(v => 
    v.name.toLowerCase().includes('male') &&
    !v.name.toLowerCase().includes('female')
  );
  if (maleVoice) return maleVoice;

  const deepVoices = voices.filter(v => 
    v.name.toLowerCase().includes('david') ||
    v.name.toLowerCase().includes('daniel') ||
    v.name.toLowerCase().includes('alex') ||
    v.name.toLowerCase().includes('mark') ||
    (v.name.toLowerCase().includes('male') && !v.name.toLowerCase().includes('female'))
  );
  if (deepVoices.length > 0) return deepVoices[0];

  return voices.find(v => v.lang.startsWith('en')) || voices[0] || null;
}

function enhanceIndianPronunciation(text: string): string {
  return text
    .replace(/Krishnadeva Raya/gi, 'Krishna-deva Raa-ya')
    .replace(/Timmarusu/gi, 'Timma-rusu')
    .replace(/Vijayanagar/gi, 'Vijaya-nagar')
    .replace(/Raichur/gi, 'Rye-choor')
    .replace(/Doab/gi, 'Dough-ab')
    .replace(/Bahmani/gi, 'Bah-mah-nee')
    .replace(/Adil Shah/gi, 'Aadil Shah')
    .replace(/Bijapur/gi, 'Beeja-poor')
    .replace(/Gulbarga/gi, 'Gul-barga')
    .replace(/Bidar/gi, 'Bee-dar')
    .replace(/Krishna/gi, 'Krish-na')
    .replace(/Tungabhadra/gi, 'Tunga-bhadra');
}

export function useEnhancedTTS(text: string, autoPlay: boolean = true) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  useEffect(() => {
    const loadVoices = () => {
      if (window.speechSynthesis.getVoices().length > 0) {
        setVoicesLoaded(true);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = useCallback(() => {
    if (!text || isMuted || !voicesLoaded) {
      setIsComplete(true);
      return;
    }

    window.speechSynthesis.cancel();
    
    const enhancedText = enhanceIndianPronunciation(text);
    const utterance = new SpeechSynthesisUtterance(enhancedText);
    
    const bestVoice = getBestVoice();
    if (bestVoice) {
      utterance.voice = bestVoice;
    }
    
    utterance.rate = 0.80;
    utterance.pitch = 0.75;
    utterance.volume = 1;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsComplete(false);
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsComplete(true);
    };
    
    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsComplete(true);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [text, isMuted, voicesLoaded]);

  useEffect(() => {
    if (!voicesLoaded) return;
    
    setIsComplete(false);
    
    if (autoPlay && !isMuted) {
      const timer = setTimeout(() => {
        speak();
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
    }

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [text, autoPlay, isMuted, voicesLoaded, speak]);

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsComplete(true);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsComplete(true);
    }
  };

  return { isSpeaking, isMuted, isComplete, speak, stop, toggleMute };
}
