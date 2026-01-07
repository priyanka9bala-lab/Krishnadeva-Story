import SceneCard from '../SceneCard'
import palaceImage from '@assets/generated_images/Vijayanagar_palace_hero_scene_81478301.png'

export default function SceneCardExample() {
  return (
    <div className="p-8 min-h-screen bg-background">
      <SceneCard
        image={palaceImage}
        narratorText="It is the year 1520. You are Krishnadeva Raya, the mighty emperor of the glorious Vijayanagar Empire. A battle is approaching!"
        audioUrl="/audio/narrator_intro.mp3"
      />
    </div>
  )
}
