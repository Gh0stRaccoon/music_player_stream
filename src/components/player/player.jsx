import { useEffect, useRef, useState, useCallback } from "react";
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
import { useAudioPlayer } from "./hooks/useAudioPlayer";
import { useAmbientSounds } from "./hooks/useAmbientSounds";
import { useAudioAnalyzer } from "./hooks/useAudioAnalyzer";
import { useAudioReactiveBrightness } from "./hooks/useReactiveBrightness";

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

const initialSounds = {
  campfire: false,
  night: false,
  rain: false,
};

export const Player = () => {
  const brightRef = useRef(null);
  const cardRef = useRef(null);

  useMouseEffect(brightRef, cardRef);
  const {
    audio,
    currentTime,
    duration,
    isLoading,
    isPlaying,
    nextTrack,
    play: playTrack,
    previousTrack,
    setTime,
  } = useAudioPlayer();

  const { initAnalyzer, isAnalyzerReady, getFrequencyData } =
    useAudioAnalyzer(audio);

  useAudioReactiveBrightness(brightRef, { isAnalyzerReady, getFrequencyData });

  const play = () => {
    if (!isAnalyzerReady) {
      initAnalyzer();
    }

    playTrack();
  };

  useEffect(() => {
    if (isPlaying && isAnalyzerReady) {
      const frequencyData = getFrequencyData();
      console.log(frequencyData);
    }
  }, [isPlaying, isAnalyzerReady, getFrequencyData, currentTime]);

  const { sounds, toggleSound } = useAmbientSounds(initialSounds);

  const handleTimeChange = (e) => {
    const time = parseFloat(e.target.value);
    setTime(time);
  };

  return (
    <>
      <audio ref={audio} />

      <PlayerCard ref={cardRef} brightRef={brightRef}>
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-white/10">
          <StatusLabel isPlaying={isPlaying} isLoading={isLoading} />
        </div>
        <TimeProgress
          handleTimeChange={handleTimeChange}
          currentTime={currentTime}
          duration={duration}
        />
        <MainControls
          isPlaying={isPlaying}
          controls={{ play, nextTrack, previousTrack }}
          disabled={isLoading}
        />
        <SoundToggles
          sounds={SOUND_CONFIG}
          toggleStates={sounds}
          toggleSound={toggleSound}
        />
      </PlayerCard>
    </>
  );
};
