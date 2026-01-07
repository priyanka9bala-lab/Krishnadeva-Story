export interface StoryScene {
  id: string;
  image: string;
  sceneType?: 'battle' | 'court' | 'landscape' | 'portrait';
  narratorText?: string;
  characterName?: string;
  characterDialogue?: string;
  characterAvatar?: string;
  audioUrl?: string;
  choices?: Choice[];
  nextScene?: string;
  buttonText?: string;
}

export interface Choice {
  id: string;
  text: string;
  nextScene: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
}

export const storyScenes: Record<string, StoryScene> = {
  intro: {
    id: "intro",
    image: "palace_hero",
    sceneType: "landscape",
    narratorText: "It is the year <span class='highlight-key'>1520</span>. You are <span class='highlight-key'>Krishnadeva Raya</span>, the mighty emperor of the glorious Vijayanagar Empire. A battle is approaching!",
    audioUrl: "/audio/narrator_intro.mp3",
    buttonText: "Start Story",
    nextScene: "court_gathering"
  },
  
  court_gathering: {
    id: "court_gathering",
    image: "court_scene",
    sceneType: "court",
    narratorText: "You sit upon your throne, surrounded by your trusted advisors in the grand court of Vijayanagar. You have been hearing about some trouble with a piece of land that rightfully belongs to your empire.",
    buttonText: "Ask your Prime Minister, Timmarusu, about it",
    nextScene: "timmarusu_explains"
  },
  
  timmarusu_explains: {
    id: "timmarusu_explains",
    image: "timmarusu_portrait",
    sceneType: "portrait",
    characterName: "Prime Minister Timmarusu",
    characterDialogue: "Yes my Lord, it is the fertile land of the <span class='highlight-key'>Raichur Doab</span>, between rivers <span class='highlight-key'>Krishna</span> and <span class='highlight-key'>Tungabhadra</span>.",
    audioUrl: "/audio/timmarusu_doab.mp3",
    buttonText: "Ask Timmarusu exactly what the problem is",
    nextScene: "timmarusu_problem"
  },
  
  timmarusu_problem: {
    id: "timmarusu_problem",
    image: "timmarusu_portrait",
    sceneType: "portrait",
    characterName: "Prime Minister Timmarusu",
    characterDialogue: "My King, it has been a point of conflict for centuries! It rightfully belongs to our empire, but is currently held by our enemies, the <span class='highlight-key'>Bahmani Sultanates</span>; specifically <span class='highlight-key'>Adil Shah of Bijapur</span>.",
    audioUrl: "/audio/timmarusu_problem.mp3",
    buttonText: "Continue",
    nextScene: "merchant_plan"
  },
  
  merchant_plan: {
    id: "merchant_plan",
    image: "court_scene",
    sceneType: "court",
    narratorText: "You know the threat of Adil Shah and decide to send a merchant with a large sum of gold to purchase the finest war horses for your army. But, soon, one of your spies brings you disturbing news.",
    buttonText: "Find out what it is!",
    nextScene: "spy_news"
  },
  
  spy_news: {
    id: "spy_news",
    image: "spy_courtyard",
    sceneType: "court",
    characterName: "Spy",
    characterDialogue: "Your Majesty, I bring grave news. The merchant has betrayed you. He has taken your gold and has offered his services to your sworn enemy, Adil Shah!",
    audioUrl: "/audio/spy_news.mp3",
    buttonText: "Continue",
    nextScene: "treachery_reaction"
  },
  
  treachery_reaction: {
    id: "treachery_reaction",
    image: "court_scene",
    sceneType: "court",
    narratorText: "Your blood boils. This is treachery! What will you do?",
    choices: [
      {
        id: "wisdom",
        text: "Act with wisdom: Send a firm demand to Adil Shah to return the traitor and gold",
        nextScene: "demand_rejected"
      },
      {
        id: "attack",
        text: "Launch a surprise attack on Raichur!",
        nextScene: "immediate_attack"
      }
    ]
  },
  
  demand_rejected: {
    id: "demand_rejected",
    image: "court_scene",
    sceneType: "court",
    narratorText: "Adil Shah rejects your demand with contempt. The insult cannot stand!",
    buttonText: "Hear Prime Minister's thoughts",
    nextScene: "timmarusu_counsel"
  },
  
  timmarusu_counsel: {
    id: "timmarusu_counsel",
    image: "timmarusu_portrait",
    sceneType: "portrait",
    characterName: "Prime Minister Timmarusu",
    characterDialogue: "My King, let us plan, gather our full strength, and show the Sultanates the true might of Vijayanagar.",
    audioUrl: "/audio/timmarusu_counsel.mp3",
    buttonText: "Continue",
    nextScene: "war_choice"
  },
  
  war_choice: {
    id: "war_choice",
    image: "court_scene",
    sceneType: "court",
    narratorText: "What do you do?",
    choices: [
      {
        id: "prepare",
        text: "Listen to Timmarusu (prepare for full-scale war)",
        nextScene: "war_preparation"
      },
      {
        id: "immediate",
        text: "Launch immediate attack",
        nextScene: "immediate_attack"
      }
    ]
  },
  
  war_preparation: {
    id: "war_preparation",
    image: "battle_prep",
    sceneType: "battle",
    narratorText: "You heed Timmarusu's counsel. For months, the empire prepares for war. Finally, the battle begins. Your initial attack pushes the enemy back. But then, Adil Shah unleashes his cannons.",
    audioUrl: "/audio/war_prep.mp3",
    buttonText: "Continue to the critical moment",
    nextScene: "crisis_moment"
  },
  
  crisis_moment: {
    id: "crisis_moment",
    image: "river_battle",
    sceneType: "battle",
    narratorText: "This is the moment of crisis. Your empire's fate rests on your next command. What will you do?",
    choices: [
      {
        id: "charge",
        text: "Lead the charge!",
        nextScene: "victory_charge"
      },
      {
        id: "retreat",
        text: "Order a tactical retreat, find another way across and avoid the cannons",
        nextScene: "victory_tactical"
      }
    ]
  },
  
  immediate_attack: {
    id: "immediate_attack",
    image: "river_battle",
    sceneType: "battle",
    narratorText: "You arrive at the Krishna River to find that Adil Shah, though surprised by your speed, has managed to fortify his position. His cannons are aimed at your army. The battle is fierce and bloody, and your soldiers fight with courage.",
    audioUrl: "/audio/immediate_attack.mp3",
    buttonText: "Continue",
    nextScene: "victory_immediate"
  },
  
  victory_charge: {
    id: "victory_charge",
    image: "victory_celebration",
    sceneType: "court",
    narratorText: "You lead a massive counter-attack and won a stunning victory on the battlefield! The <span class='highlight-key'>Raichur Doab</span> is now under your control! You also captured the forts of <span class='highlight-key'>Bidar</span>, <span class='highlight-key'>Gulbarga</span>, and <span class='highlight-key'>Bijapur</span> – MISSION ACCOMPLISHED!",
    audioUrl: "/audio/victory.mp3",
    buttonText: "Test your knowledge to find out what happened next!",
    nextScene: "quiz"
  },
  
  victory_tactical: {
    id: "victory_tactical",
    image: "victory_celebration",
    sceneType: "court",
    narratorText: "You have managed to cross the river and won a stunning victory on the battlefield! The <span class='highlight-key'>Raichur Doab</span> is now under your control! You also captured the forts of <span class='highlight-key'>Bidar</span>, <span class='highlight-key'>Gulbarga</span>, and <span class='highlight-key'>Bijapur</span> – MISSION ACCOMPLISHED!",
    audioUrl: "/audio/victory.mp3",
    buttonText: "Test your knowledge to find out what happened next!",
    nextScene: "quiz"
  },
  
  victory_immediate: {
    id: "victory_immediate",
    image: "victory_celebration",
    sceneType: "court",
    narratorText: "You win a stunning victory on the battlefield! The <span class='highlight-key'>Raichur Doab</span> is now under your control! You also captured the forts of <span class='highlight-key'>Bidar</span>, <span class='highlight-key'>Gulbarga</span>, and <span class='highlight-key'>Bijapur</span> – MISSION ACCOMPLISHED!",
    audioUrl: "/audio/victory.mp3",
    buttonText: "Test your knowledge to find out what happened next!",
    nextScene: "quiz"
  }
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "When did the Battle of Raichur happen?",
    options: [
      { id: "a", text: "1520", isCorrect: true },
      { id: "b", text: "2015", isCorrect: false }
    ]
  },
  {
    id: 2,
    question: "What region was captured?",
    options: [
      { id: "a", text: "Raichur Doab", isCorrect: true },
      { id: "b", text: "Raipur Doab", isCorrect: false }
    ]
  },
  {
    id: 3,
    question: "Where was the Doab located?",
    options: [
      { id: "a", text: "Between rivers Krishna and Tungabhadra", isCorrect: true },
      { id: "b", text: "Between rivers Kaveri and Ganga", isCorrect: false }
    ]
  },
  {
    id: 4,
    question: "Which two kingdoms fought the battle?",
    options: [
      { id: "a", text: "Bahamani and Vijayanagar", isCorrect: true },
      { id: "b", text: "Pandyas and Cholas", isCorrect: false }
    ]
  },
  {
    id: 5,
    question: "Which other forts were captured?",
    options: [
      { id: "a", text: "Bidar, Gulbarga and Bijapur", isCorrect: true },
      { id: "b", text: "Gwalior, Golconda and Agra", isCorrect: false }
    ]
  },
  {
    id: 6,
    question: "What is the name of your Prime Minister?",
    options: [
      { id: "a", text: "Timmarusu", isCorrect: true },
      { id: "b", text: "Tiramisu", isCorrect: false }
    ]
  }
];

export const imageMap: Record<string, string> = {
  palace_hero: "Vijayanagar_palace_hero_scene_81478301.png",
  court_scene: "Court_gathering_scene_f178a056.png",
  timmarusu_portrait: "Timmarusu_prime_minister_portrait_e27b0cc2.png",
  spy_courtyard: "Spy_messenger_courtyard_scene_6a69c517.png",
  battle_prep: "Battle_preparation_scene_5fa46028.png",
  river_battle: "River_crossing_battle_a468dad6.png",
  victory_celebration: "Victory_celebration_scene_e8fed9ff.png",
  map: "Raichur_Doab_map_dcfc4ef8.png"
};
