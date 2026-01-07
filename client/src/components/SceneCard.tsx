// client/src/components/SceneCard.tsx

import { useEffect } from "react";
import { useTypewriter } from "@/hooks/useTypewriter";
import AnimatedSceneImage from "./AnimatedSceneImage";

interface SceneCardProps {
  image: string;
  narratorText?: string;
  characterName?: string;
  characterDialogue?: string;
  sceneType?: 'battle' | 'court' | 'landscape' | 'portrait';
  onNarrationComplete?: () => void;
}

export default function SceneCard({
  image,
  narratorText,
  characterName,
  characterDialogue,
  sceneType = 'landscape',
  onNarrationComplete
}: SceneCardProps) {
  const { displayedText: displayedNarrator, isComplete: narratorComplete } = useTypewriter(narratorText || "");
  const { displayedText: displayedDialogue, isComplete: dialogueComplete } = useTypewriter(characterDialogue || "");

  // This logic correctly determines if ALL required text is finished.
  const textComplete = (narratorText ? narratorComplete : true) && (characterDialogue ? dialogueComplete : true);

  // This is the new, simplified, and correct effect.
  useEffect(() => {
    // If all text is complete and the parent is listening,
    // tell the parent immediately.
    if (textComplete && onNarrationComplete) {
      onNarrationComplete();
    }
  }, [textComplete, onNarrationComplete]);

  return (
    <div className="w-full h-screen flex flex-col lg:flex-row">
      <div className="w-full lg:w-3/5 h-1/2 lg:h-full">
        <AnimatedSceneImage image={image} sceneType={sceneType} />
      </div>

      <div className="w-full lg:w-2/5 h-1/2 lg:h-full bg-background flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
        <div className="max-w-2xl w-full space-y-6">
          {narratorText && (
            <div className="space-y-4">
              <p className="text-xl md:text-2xl lg:text-3xl font-serif leading-relaxed text-foreground" data-testid="text-narrator" dangerouslySetInnerHTML={{ __html: displayedNarrator + (!narratorComplete ? '<span class="animate-pulse">|</span>' : '') }} />
            </div>
          )}

          {characterDialogue && (
            <div className="border-l-4 border-primary pl-6 py-4 space-y-3">
              {characterName && (
                <p className="font-bold text-xl md:text-2xl text-primary" data-testid="text-character-name">
                  {characterName}
                </p>
              )}
              <p className="text-xl md:text-2xl lg:text-3xl font-serif italic leading-relaxed text-foreground break-words" data-testid="text-dialogue" dangerouslySetInnerHTML={{ __html: '"' + displayedDialogue + (!dialogueComplete ? '<span class="animate-pulse">|</span>' : '') + '"' }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}