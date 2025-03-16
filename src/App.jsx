import PlayButton from "@/components/PlayerControls/play-button";
import SkipButton from "@/components/PlayerControls/skip-button";
import { useEffect, useRef, useState } from "react";

function App() {
  const audioRef = useRef(null);
  const mediaSourceRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const play = () => {
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    mediaSourceRef.current = new MediaSource();
  }, []);

  return (
    <>
      <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-cyan-950 text-white">
        <div className="absolute top-1/2 left-1/2 aspect-square w-4xl -translate-1/2 bg-radial from-cyan-200/20 from-0% to-transparent to-50% bg-center"></div>
        <div className="z-20 flex w-3/4 max-w-xs min-w-3xs flex-col items-center justify-center gap-6 rounded-md border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-2xl md:w-full">
          <div className="relative aspect-square w-full rounded-lg bg-white/10">
            <div className="absolute top-1/2 left-1/2 mb-4 -translate-1/2 text-2xl">
              {isPlaying ? <p>Playing</p> : <p>Paused</p>}
            </div>
          </div>
          <div className="flex gap-4">
            <audio ref={audioRef} />
            <SkipButton />
            <PlayButton onClick={play} isPlaying={isPlaying} />
            <SkipButton forward />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
