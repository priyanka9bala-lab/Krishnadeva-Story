import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RotateCcw, Trophy, ChevronDown } from "lucide-react";
import SceneCard from "@/components/SceneCard";
import ChoiceButton from "@/components/ChoiceButton";
import QuizQuestion from "@/components/QuizQuestion";
import { storyScenes, quizQuestions, imageMap } from "@/data/storyData";

import palaceImage from '@assets/generated_images/Vijayanagar_palace_hero_scene_81478301.png';
import courtImage from '@assets/generated_images/Court_gathering_scene_f178a056.png';
import timmarusuImage from '@assets/generated_images/Timmarusu_prime_minister_portrait_e27b0cc2.png';
import spyImage from '@assets/generated_images/Spy_messenger_courtyard_scene_6a69c517.png';
import battlePrepImage from '@assets/generated_images/Battle_preparation_scene_5fa46028.png';
import riverBattleImage from '@assets/generated_images/River_crossing_battle_a468dad6.png';
import victoryImage from '@assets/generated_images/Victory_celebration_scene_e8fed9ff.png';
import mapImage from '@assets/generated_images/Raichur_Doab_map_dcfc4ef8.png';

const imageAssets: Record<string, string> = {
  palace_hero: palaceImage,
  court_scene: courtImage,
  timmarusu_portrait: timmarusuImage,
  spy_courtyard: spyImage,
  battle_prep: battlePrepImage,
  river_battle: riverBattleImage,
  victory_celebration: victoryImage,
  map: mapImage
};

export default function StoryPage() {
  const [currentScene, setCurrentScene] = useState("intro");
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [showChoices, setShowChoices] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<typeof quizQuestions[0]['options']>([]);
  const choicesContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Only run this logic if we are in quiz mode
    if (quizMode) {
      const originalOptions = quizQuestions[currentQuizIndex].options;
      // Shuffle the options array and update the state
      setShuffledOptions([...originalOptions].sort(() => Math.random() - 0.5));
    }
  }, [currentQuizIndex, quizMode]);

  const scene = storyScenes[currentScene];
  const sceneImage = scene ? imageAssets[scene.image] : palaceImage;

  useEffect(() => {
    setShowChoices(false);
    setShowScrollIndicator(false);
  }, [currentScene]);

  const handleNarrationComplete = () => {
    setShowChoices(true);
    setShowScrollIndicator(true);
  };

  useEffect(() => {
    const handleScroll = (
      
    ) => {
      // If the scroll indicator is currently visible, hide it.
      if (showScrollIndicator) {
        setShowScrollIndicator(false);
      }
    };

    // Add the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showScrollIndicator]); // The effect depends on the indicator's visibility

  const handleChoice = (nextScene: string) => {
    setShowChoices(false);
    setCurrentScene(nextScene);
  };

  const handleNextScene = () => {
    setShowChoices(false);
    if (scene?.nextScene === "quiz") {
      setQuizMode(true);
    } else if (scene?.nextScene) {
      setCurrentScene(scene.nextScene);
    }
  };

  const handleQuizAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuizIndex < quizQuestions.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handleRestart = () => {
    setCurrentScene("intro");
    setQuizMode(false);
    setCurrentQuizIndex(0);
    setScore(0);
    setShowSummary(false);
  };

  if (showSummary) {
    const impactText = "The 1520 Battle of Raichur and annexation of the Raichur Doab was one of the greatest military achievements of King Krishnadeva Raya. Under his reign, Vijayanagar emerged as one of the strongest kingdoms of south India.";
    
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${mapImage})` }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/70" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Card className="p-12 shadow-2xl text-center space-y-8 backdrop-blur-md bg-background/95">
            <div className="flex justify-center">
              <Trophy className="h-24 w-24 text-primary" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-title font-bold text-foreground" data-testid="text-summary-title">
              The Impact of Your Victory
            </h1>
            
            <div className="space-y-4">
              <p className="text-2xl font-semibold text-primary" data-testid="text-quiz-score">
                Your Score: {score} out of {quizQuestions.length}
              </p>
              
              <div className="h-3 bg-muted rounded-full overflow-hidden max-w-md mx-auto">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${(score / quizQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="pt-6 space-y-4">
              <p className="text-xl font-serif leading-relaxed text-foreground">
                {impactText}
              </p>
              
              <p className="text-lg text-muted-foreground">
                Thank you for experiencing this journey through history!
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <Button
                onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSc9NCkvfzKU4g0t_BqOMAtbpC_DpY07XzROTuOXcJHnk6PfLA/viewform', '_blank')}
                size="lg"
                className="text-xl font-bold px-12 py-8 rounded-2xl shadow-lg bg-blue-600 hover:bg-blue-700 text-white border-0"
                data-testid="button-share-experience"
              >
                <Trophy className="mr-3 h-7 w-7" />
                Share Your Experience
              </Button>

              <Button
                onClick={handleRestart}
                size="lg"
                variant="outline"
                className="text-xl px-12 py-6 rounded-2xl shadow-lg"
                data-testid="button-restart"
              >
                <RotateCcw className="mr-3 h-6 w-6" />
                Restart Story
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (quizMode) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-accent/20 py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-title font-bold text-foreground">
              Test Your Knowledge
            </h1>
            <p className="text-lg text-muted-foreground">
              Answer these questions about the Battle of Raichur
            </p>
          </div>

          <QuizQuestion
            questionNumber={currentQuizIndex + 1}
            totalQuestions={quizQuestions.length}
            question={quizQuestions[currentQuizIndex].question}
            options={shuffledOptions} // <-- This uses your new, randomized options
            onAnswer={handleQuizAnswer}
          />
        </div>
      </div>
    );
  }

return (
    <div className="min-h-screen">
      {scene && (
        <>
          <SceneCard
            image={sceneImage}
            narratorText={scene.narratorText}
            characterName={scene.characterName}
            characterDialogue={scene.characterDialogue}
            sceneType={scene.sceneType}
            onNarrationComplete={handleNarrationComplete}
          />

          {showChoices && (
            <div ref={choicesContainerRef} className="fixed bottom-8 left-0 right-0 z-30 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500 choice-container">
              <div className="max-w-2xl mx-auto space-y-4">
                {scene?.choices ? (
                  scene.choices.map((choice, index) => (
                    <ChoiceButton
                      key={choice.id}
                      text={choice.text}
                      onClick={() => handleChoice(choice.nextScene)}
                      variant={index === 0 ? "default" : "primary"}
                    />
                  ))
                ) : scene?.buttonText ? (
                  <ChoiceButton
                    text={scene.buttonText}
                    onClick={handleNextScene}
                    variant="primary"
                  />
                ) : null}
              </div>
            </div>
          )}

          {showScrollIndicator && (
            <div 
              className="fixed bottom-16 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center md:hidden"
              aria-hidden="true"
            >
              <div className="bg-black/40 text-white rounded-full p-2 animate-bounce backdrop-blur-sm">
                <ChevronDown className="h-6 w-6 -mb-4" />
                <ChevronDown className="h-6 w-6" />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}