import AudioPlayer from "../components/AudioPlayer";
import tracks from "../data/tracks.json";

export default function Home() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <AudioPlayer tracks={tracks} />
    </div>
  );
}
