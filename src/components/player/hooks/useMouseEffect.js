import { useEffect } from 'react';

export const useMouseEffect = (brightRef, cardRef) => {
  useEffect(() => {
    if (!brightRef?.current || !cardRef?.current) return;

    const handleMouseMove = (event) => {
      const card = cardRef.current;
      const bright = brightRef.current;

      if (!card || !bright) return;

      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left; // x position within the element
      const y = event.clientY - rect.top; // y position within the element

      // Calcular posición relativa (0 a 1)
      const relativeX = Math.min(Math.max(x / rect.width, 0), 1);
      const relativeY = Math.min(Math.max(y / rect.height, 0), 1);

      // Calcular desplazamiento del brillo dentro del componente
      const brightX = (relativeX - 0.5) * rect.width;
      const brightY = (relativeY - 0.5) * rect.height;

      // Guardar la escala actual si existe (del efecto de audio)
      let currentScale = 1;
      const scaleMatch = bright.style.transform.match(/scale\(([^)]+)\)/);
      if (scaleMatch && scaleMatch[1]) {
        currentScale = parseFloat(scaleMatch[1]) || 1;
      }

      // Aplicar transform con la posición pero manteniendo la escala
      bright.style.transform = `translate(${brightX}px, ${brightY}px) scale(${currentScale})`;
    };

    const handleMouseLeave = () => {
      // Al salir, centrar el brillo pero mantener la escala
      if (brightRef.current) {
        const currentScale = brightRef.current.style.transform.match(/scale\(([^)]+)\)/) 
          ? parseFloat(brightRef.current.style.transform.match(/scale\(([^)]+)\)/)[1]) 
          : 1;
          
        brightRef.current.style.transform = `translate(0px, 0px) scale(${currentScale})`;
      }
    };

    // Añadir los event listeners
    const cardElement = cardRef.current;
    cardElement.addEventListener('mousemove', handleMouseMove);
    cardElement.addEventListener('mouseleave', handleMouseLeave);

    // Limpiar los event listeners
    return () => {
      cardElement.removeEventListener('mousemove', handleMouseMove);
      cardElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [brightRef, cardRef]);
};