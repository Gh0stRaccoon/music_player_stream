import { useRef, useState, useCallback, useEffect } from "react";

export function useAudioPlayer() {
  const audioRef = useRef(new Audio());
  // player status
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const [playlist, setPlaylist] = useState([]);

  // load specific track
  const loadTrack = useCallback(
    (trackIndex) => {
      const audio = audioRef.current;
      if (!audio) return Promise.reject("No audio element");

      setIsLoading(true);

      return new Promise((resolve) => {
        const track = playlist[trackIndex];

        const handleCanPlay = () => {
          setIsLoading(false);
          audio.removeEventListener("canplay", handleCanPlay);
          resolve();
        };

        audio.addEventListener("canplay", handleCanPlay);

        audio.src = track.src;
        audio.load();
      });
    },
    [playlist],
  );

  // load current track by state
  const loadCurrentTrack = useCallback(() => {
    return loadTrack(currentTrackIndex);
  }, [currentTrackIndex, loadTrack]);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (!isPlaying) {
        await loadCurrentTrack();
        audio.volume = 0.25;
        await audio.play();
      } else {
        audio.pause();
      }

      setIsPlaying((prev) => !prev);
    } catch (err) {
      console.error("Error al controlar la reproducción:", err);
    }
  }, [isPlaying, loadCurrentTrack]);

  const nextTrack = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Pausar la reproducción actual
    audio.pause();

    // Calcular el nuevo índice
    const nextIndex = (currentTrackIndex + 1) % playlist.length;

    // Actualizar el estado
    setCurrentTrackIndex(nextIndex);
    setCurrentTime(0);

    // Cargar directamente la nueva pista con el índice calculado
    loadTrack(nextIndex).then(() => {
      if (isPlaying) {
        audio
          .play()
          .catch((err) =>
            console.error("Error al reproducir la nueva pista:", err),
          );
      }
    });
  }, [currentTrackIndex, isPlaying, loadTrack, playlist.length]);

  const previousTrack = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Si llevamos más de 10 segundos, reiniciar la pista actual
    if (audio.currentTime >= 10) {
      audio.currentTime = 0;

      if (!isPlaying) {
        audio.play().catch((err) => console.error("Error al reproducir:", err));
        setIsPlaying(true);
      }
      return;
    }

    // Pausar la reproducción actual
    audio.pause();

    // Calcular el nuevo índice
    const prevIndex =
      (currentTrackIndex - 1 + playlist.length) % playlist.length;

    // Actualizar el estado
    setCurrentTrackIndex(prevIndex);
    setCurrentTime(0);

    // Cargar directamente la nueva pista con el índice calculado
    loadTrack(prevIndex).then(() => {
      if (isPlaying) {
        audio
          .play()
          .catch((err) =>
            console.error("Error al reproducir la pista anterior:", err),
          );
      }
    });
  }, [currentTrackIndex, isPlaying, loadTrack, playlist.length]);

  const setTime = useCallback((time) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  useEffect(() => {
    loadCurrentTrack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);

    const updateDuration = () => {
      if (!isNaN(audio.duration) && audio.duration !== Infinity) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      nextTrack();
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("durationchange", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("durationchange", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [nextTrack]);

  useEffect(() => {
    const getPlaylist = async () => {
      try {
        const response = await fetch("/playlist.json");
        const data = await response.json();
        setPlaylist(data);
      } catch (err) {
        console.error("Error al obtener la lista de reproducción:", err);
      }
    };

    getPlaylist();
  }, []);

  return {
    audio: audioRef,
    isPlaying,
    currentTime,
    duration,
    isLoading,
    currentTrackIndex,
    play,
    nextTrack,
    previousTrack,
    setTime,
    loadTrack,
  };
}
