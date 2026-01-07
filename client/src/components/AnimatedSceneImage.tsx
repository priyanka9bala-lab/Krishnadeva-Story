interface AnimatedSceneImageProps {
  image: string;
  sceneType?: 'battle' | 'court' | 'landscape' | 'portrait';
}

export default function AnimatedSceneImage({ image, sceneType = 'landscape' }: AnimatedSceneImageProps) {
  const getAnimationClass = () => {
    switch (sceneType) {
      case 'battle':
        return 'animate-battle-scene';
      case 'court':
        return 'animate-court-scene';
      case 'portrait':
        return 'animate-portrait';
      default:
        return 'animate-landscape-scene';
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden group">
      <div className={`w-full h-full ${getAnimationClass()}`}>
        <img
          src={image}
          alt="Story scene"
          className="w-full h-full object-cover"
          data-testid="img-scene"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 pointer-events-none" />
      
      {sceneType === 'battle' && (
        <>
          <div className="absolute inset-0 animate-dust-particles pointer-events-none opacity-30" 
               style={{ 
                 background: 'radial-gradient(circle at 30% 40%, rgba(139, 69, 19, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(101, 67, 33, 0.2) 0%, transparent 50%)',
                 animation: 'dustFloat 8s ease-in-out infinite'
               }} 
          />
          <div className="absolute inset-0 animate-battle-flash pointer-events-none opacity-20"
               style={{
                 background: 'radial-gradient(circle at var(--flash-x, 50%) var(--flash-y, 50%), rgba(255, 200, 100, 0.4) 0%, transparent 30%)',
                 animation: 'battleFlash 3s ease-in-out infinite'
               }}
          />
        </>
      )}
      
      {sceneType === 'court' && (
        <div className="absolute inset-0 animate-golden-shimmer pointer-events-none opacity-20"
             style={{
               background: 'linear-gradient(45deg, transparent 30%, rgba(255, 215, 0, 0.3) 50%, transparent 70%)',
               backgroundSize: '200% 200%',
               animation: 'shimmer 6s ease-in-out infinite'
             }}
        />
      )}
    </div>
  );
}
