import { useEffect, useRef, useState } from "react";
import { useMouseEffect } from "@/components/player/hooks/useMouseEffect";
import TimeProgress from "@/components/player/controls/time-progress";
import StatusLabel from "@/components/player/controls/status-label";
import {
  IconCampfireFilled,
  IconCloudRain,
  IconComet,
} from "@tabler/icons-react";
import PlayerCard from "@/components/player/ui/player-card";
import { SoundToggles } from "./controls/sound-toggles";
import { MainControls } from "./controls/main-controls";

const SOUND_CONFIG = [
  {
    id: "campfire",
    label: "Fogata",
    icon: <IconCampfireFilled />,
    color: "yellow",
  },
  {
    id: "night",
    label: "Noche",
    icon: <IconComet />,
    color: "purple",
  },
  {
    id: "rain",
    label: "Lluvia",
    icon: <IconCloudRain />,
    color: "blue",
  },
];

export const Player = () => {
  const audioRef = useRef(null);
  const mediaSourceRef = useRef(null);
  const brightRef = useRef(null);
  const cardRef = useRef(null);
  useMouseEffect(brightRef, cardRef);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const [sounds, setSounds] = useState({
    campfire: false,
    night: true,
    rain: false,
  });

  const toggleSound = (soundId) => {
    setSounds((prev) => {
      return {
        ...prev,
        [soundId]: !prev[soundId],
      };
    });
  };

  const play = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleTimeChange = (e) => {
    const time = e.target.value;
    setCurrentTime(time);
  };

  useEffect(() => {
    const mediaSource = new MediaSource();
    mediaSourceRef.current = mediaSource;

    if (audioRef.current) {
      audioRef.current.src = URL.createObjectURL(mediaSource);
    }

    const onSourceOpen = () => {
      console.log("Media source opened");
    };

    mediaSource.addEventListener("sourceopen", onSourceOpen);

    return () => {
      mediaSource.removeEventListener("sourceopen", onSourceOpen);
      URL.revokeObjectURL(audioRef.current?.src);
    };
  }, [audioRef]);

  return (
    <>
      <audio ref={audioRef} />
      {/* <div className="absolute top-1/2 left-1/2 aspect-square w-4xl -translate-1/2 bg-radial from-cyan-200/20 from-0% to-transparent to-50% bg-center"></div> */}

      <PlayerCard ref={cardRef} brightRef={brightRef}>
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-white/10">
          <StatusLabel isPlaying={isPlaying} />
        </div>
        <TimeProgress
          handleTimeChange={handleTimeChange}
          currentTime={currentTime}
        />
        <MainControls isPlaying={isPlaying} play={play} />
        <SoundToggles
          sounds={SOUND_CONFIG}
          toggleStates={sounds}
          toggleSound={toggleSound}
        />
      </PlayerCard>
    </>
  );
};
