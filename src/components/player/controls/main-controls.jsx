import { SkipButton } from "@/components/player/ui/skip-button";
import { PlayButton } from "@/components/player/ui/play-button";

export const MainControls = ({ controls, isPlaying }) => {
  const { play, nextTrack, previousTrack } = controls;
  return (
    <div className="flex gap-4">
      <SkipButton onClick={previousTrack} />
      <PlayButton onClick={play} isPlaying={isPlaying} />
      <SkipButton forward onClick={nextTrack} />
    </div>
  );
};
