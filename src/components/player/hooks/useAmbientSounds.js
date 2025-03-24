import { useState, useCallback } from "react";

export const useAmbientSounds = (initialSounds = {}) => {
  const [sounds, setSounds] = useState(initialSounds);

  const toggleSound = useCallback((soundId) => {
    setSounds((prev) => {
      return {
        ...prev,
        [soundId]: !prev[soundId],
      };
    });
  }, []);

  return {
    sounds,
    toggleSound,
  };
};
