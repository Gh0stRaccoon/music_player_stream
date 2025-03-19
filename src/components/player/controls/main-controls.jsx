import { SkipButton } from "@/components/player/ui/skip-button";
import { PlayButton } from "@/components/player/ui/play-button";

export const MainControls = ({ play, isPlaying }) => {
  return (
    <div className="flex gap-4">
      <SkipButton />
      <PlayButton onClick={play} isPlaying={isPlaying} />
      <SkipButton forward />
    </div>
  );
};
