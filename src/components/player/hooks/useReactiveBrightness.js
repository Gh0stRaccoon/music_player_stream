import { useEffect, useRef } from "react";

export const useAudioReactiveBrightness = (brightRef, analyzerOptions) => {
  const { isAnalyzerReady, getFrequencyData } = analyzerOptions;
  const animationRef = useRef(null);

  useEffect(() => {
    if (!isAnalyzerReady || !brightRef?.current) {
      return;
    }

    // Propiedades originales que pueden venir del efecto de mouse
    let originalTransform = brightRef.current.style.transform || "";
    let originalOpacity = parseFloat(brightRef.current.style.opacity) || 0.2;

    const updateBrightness = () => {
      const frequencyData = getFrequencyData();

      if (frequencyData.length === 0) {
        animationRef.current = requestAnimationFrame(updateBrightness);
        return;
      }

      // Calcular energía de audio
      const bassRange = Math.min(10, Math.floor(frequencyData.length * 0.2));

      let bassEnergy = 0;

      for (let i = 0; i < bassRange; i++) {
        bassEnergy += frequencyData[i];
      }
      bassEnergy = bassEnergy / bassRange / 255; // Normalizar entre 0 y 1

      // Aplicar transformación para hacer el efecto más dramático
      const intensity = Math.pow(bassEnergy, 1.5);

      // Valores mínimos y máximos para el brillo
      const minOpacity = originalOpacity;
      const maxOpacity = Math.min(originalOpacity + 0.3, 1.0);

      // Calcular valor final de opacidad
      const finalOpacity = minOpacity + intensity * (maxOpacity - minOpacity);

      if (brightRef.current) {
        // Extraer la posición actual (que viene del efecto de mouse)
        let currentTransform = brightRef.current.style.transform;
        let translateValues = { x: 0, y: 0 };

        // Preservar la transformación de translate existente del efecto de mouse
        const translateMatch = currentTransform.match(/translate\(([^)]+)\)/);
        if (translateMatch && translateMatch[1]) {
          const parts = translateMatch[1]
            .split(",")
            .map((part) => parseFloat(part));
          if (parts.length === 2) {
            translateValues.x = parts[0];
            translateValues.y = parts[1];
          }
        }

        // Aplicar escala basada en intensidad del audio, pero mantener la posición
        const scaleValue = 1 + intensity * 0.15;
        brightRef.current.style.transform = `translate(${translateValues.x}px, ${translateValues.y}px) scale(${scaleValue.toFixed(2)})`;

        // Ajustar opacidad según intensidad del audio
        brightRef.current.style.opacity = finalOpacity.toFixed(2);

        // Ajustar colores según intensidad
        const hue = 240 - intensity * 60; // Azul a cyan
        brightRef.current.style.background = `radial-gradient(circle, hsl(${hue}, 70%, 65%) 0%, hsl(${hue - 30}, 80%, 45%) 100%)`;
      }

      animationRef.current = requestAnimationFrame(updateBrightness);
    };

    // Guardar propiedades originales antes de iniciar
    if (brightRef.current) {
      originalTransform = brightRef.current.style.transform;
      originalOpacity = parseFloat(brightRef.current.style.opacity) || 0.2;
    }

    updateBrightness();

    return () => {
      cancelAnimationFrame(animationRef.current);

      // Restaurar propiedades originales al desmontar
      if (brightRef.current) {
        brightRef.current.style.transform = originalTransform;
        brightRef.current.style.opacity = originalOpacity.toString();
      }
    };
  }, [isAnalyzerReady, getFrequencyData, brightRef]);

  return animationRef.current;
};
