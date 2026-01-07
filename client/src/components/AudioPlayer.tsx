import { useState, useRef, useEffect } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AudioPlayerProps {
  audioUrl: string;
  autoPlay?: boolean;
}

export default function AudioPlayer({ audioUrl, autoPlay = false }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.play().catch(() => {
        console.log("Auto-play prevented by browser");
      });
      setIsPlaying(true);
    }
  }, [autoPlay, audioUrl]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const replay = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="flex items-center gap-2 py-2">
      <audio
        ref={audioRef}
        src={audioUrl}
        onEnded={handleEnded}
        className="hidden"
      />
      
      <Button
        size="icon"
        variant="ghost"
        onClick={togglePlay}
        data-testid="button-audio-play"
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>
      
      <Button
        size="icon"
        variant="ghost"
        onClick={replay}
        data-testid="button-audio-replay"
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
      
      <Button
        size="icon"
        variant="ghost"
        onClick={toggleMute}
        data-testid="button-audio-mute"
      >
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </Button>
      
      <span className="text-xs text-muted-foreground ml-2">
        {isPlaying ? "Playing..." : "Paused"}
      </span>
    </div>
  );
}
