import { useEffect } from "react";

export function useMouseEffect(brightRef, cardRef) {
  useEffect(() => {
    // Use RAF for smoother updates
    let rafId;
    let mouseX = 0;
    let mouseY = 0;

    // Throttled handler only captures position
    const handleMouseMove = throttle((e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // RAF for smooth animation
    const updatePosition = () => {
      if (cardRef.current && brightRef.current) {
        const card = cardRef.current.getBoundingClientRect();

        // Calcular posición relativa del ratón dentro de la tarjeta
        const relativeX = mouseX - card.left;
        const relativeY = mouseY - card.top;

        // Aplicar posición absoluta con transform
        brightRef.current.style.transform = `translate(${relativeX - 96 / 2}px, ${relativeY - 92 / 2}px)`;
      }
      rafId = requestAnimationFrame(updatePosition);
    };

    // Start animation
    updatePosition();
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [brightRef, cardRef]);

  // Throttle function to limit the rate of mousemove handler
  const throttle = (callback, delay = 10) => {
    let lastCall = 0;
    return function (...args) {
      const now = new Date().getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return callback(...args);
    };
  };
}
