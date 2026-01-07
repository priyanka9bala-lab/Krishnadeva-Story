import AnimatedSceneImage from '../AnimatedSceneImage'
import battleImage from '@assets/generated_images/River_crossing_battle_a468dad6.png'

export default function AnimatedSceneImageExample() {
  return (
    <div className="h-screen w-full">
      <AnimatedSceneImage image={battleImage} sceneType="battle" />
    </div>
  )
}
