import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ChoiceButtonProps {
  text: string;
  onClick: () => void;
  variant?: "default" | "primary";
}

function playClickSound() {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = 800;
  oscillator.type = 'sine';
  
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.1);
}

export default function ChoiceButton({ text, onClick, variant = "default" }: ChoiceButtonProps) {
  const handleClick = () => {
    playClickSound();
    onClick();
  };

  return (
    <Button
      onClick={handleClick}
      className="w-full md:max-w-2xl mx-auto min-h-16 px-6 py-4 text-base md:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all backdrop-blur-sm whitespace-normal text-left"
      variant={variant === "primary" ? "default" : "secondary"}
      data-testid={`button-choice-${text.substring(0, 20).toLowerCase().replace(/\s+/g, '-')}`}
    >
      <span className="flex-1 break-words pr-2">{text}</span>
      <ArrowRight className="h-5 w-5 flex-shrink-0" />
    </Button>
  );
}
