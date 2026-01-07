import AudioPlayer from '../AudioPlayer'

export default function AudioPlayerExample() {
  return (
    <div className="p-8">
      <AudioPlayer audioUrl="/audio/placeholder.mp3" autoPlay={false} />
    </div>
  )
}
