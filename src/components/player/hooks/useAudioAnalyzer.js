import { useCallback, useEffect, useRef, useState } from "react";

export const useAudioAnalyzer = (audioRef) => {
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const [isAnalyzerReady, setIsAnalyzerReady] = useState(false);

  const initAnalyzer = useCallback(() => {
    if (!audioRef.current || sourceNodeRef.current) return;

    try {
      if (!audioCtxRef.current) {
        const audioCtx = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new audioCtx();
      }

      const analyzer = audioCtxRef.current.createAnalyser();
      analyzer.fftSize = 32;
      analyzer.smoothingTimeConstant = 0.3;
      analyserRef.current = analyzer;

      const source = audioCtxRef.current.createMediaElementSource(
        audioRef.current,
      );
      source.connect(analyzer);
      analyzer.connect(audioCtxRef.current.destination);
      sourceNodeRef.current = source;

      setIsAnalyzerReady(true);
    } catch (err) {
      console.error("Error initializing audio analyzer:", err);
    }
  }, [audioRef]);

  const getFrequencyData = useCallback(() => {
    if (!analyserRef.current) return new Uint8Array(0);

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserRef.current.getByteFrequencyData(dataArray);
    return dataArray;
  }, []);

  useEffect(() => {
    return () => {
      if (sourceNodeRef.current) {
        sourceNodeRef.current.disconnect();
      }

      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return {
    initAnalyzer,
    getFrequencyData,
    isAnalyzerReady,
  };
};
