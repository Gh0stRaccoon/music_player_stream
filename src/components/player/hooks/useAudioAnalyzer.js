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
      analyzer.fftSize = 256;
      analyzer.smoothingTimeConstant = 0.1;
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

  const getFrequencySplitted = useCallback(() => {
    const dataArray = getFrequencyData();
    if (dataArray.length === 0) return null;

    // Calcular rangos basados en el tamaño del array
    const totalBins = dataArray.length;

    // Rangos ajustados dinámicamente según el tamaño
    const bassEnd = Math.floor(totalBins * 0.08); // 8% para bajos
    const lowMidEnd = Math.floor(totalBins * 0.25); // 17% para medios bajos
    const midEnd = Math.floor(totalBins * 0.5); // 25% para medios
    const highMidEnd = Math.floor(totalBins * 0.7); // 20% para medios altos

    // Extraer rangos
    const bass = dataArray.slice(0, bassEnd);
    const lowMid = dataArray.slice(bassEnd, lowMidEnd);
    const mid = dataArray.slice(lowMidEnd, midEnd);
    const highMid = dataArray.slice(midEnd, highMidEnd);
    const treble = dataArray.slice(highMidEnd);

    return {
      bass,
      lowMid,
      mid,
      highMid,
      treble,
    };
  }, [getFrequencyData]);

  const getFrequencyAverage = useCallback(() => {
    const { bass, lowMid, mid, highMid, treble } = getFrequencySplitted();
    // Calcular energía promedio por cada rango
    const getAverage = (arr) =>
      arr.reduce((sum, val) => sum + val, 0) / arr.length;

    return {
      bass: getAverage(bass) / 255,
      lowMid: getAverage(lowMid) / 255,
      mid: getAverage(mid) / 255,
      highMid: getAverage(highMid) / 255,
      treble: getAverage(treble) / 255,
      total:
        getAverage([...bass, ...lowMid, ...mid, ...highMid, ...treble]) / 255,
    };
  }, [getFrequencySplitted]);

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
    getFrequencySplitted,
    getFrequencyAverage,
    isAnalyzerReady,
  };
};
