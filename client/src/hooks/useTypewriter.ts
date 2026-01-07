import { useState, useEffect } from "react";

export function useTypewriter(text: string, speed: number = 30) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);
    
    if (!text) {
      setIsComplete(true);
      return;
    }

    let currentIndex = 0;
    const intervalId = setInterval(() => {
      currentIndex++;
      setDisplayedText(text.slice(0, currentIndex));
      
      if (currentIndex >= text.length) {
        setIsComplete(true);
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]);

  return { displayedText, isComplete };
}
