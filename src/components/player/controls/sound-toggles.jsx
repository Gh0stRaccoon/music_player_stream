import SoundToggle from "@/components/player/ui/sound-toggle";
import { memo } from "react";

/**
 * Componente que renderiza una colección de botones de sonido
 *
 * @param {Object} props
 * @param {Array} props.sounds - Array de configuraciones de sonido
 * @param {Function} props.toggleSound - Función para alternar un sonido
 * @param {Object} props.toggleStates - Estado actual de cada sonido
 */
export const SoundToggles = memo(({ sounds, toggleSound, toggleStates }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {sounds.map((sound) => (
        <SoundToggle
          key={sound.id}
          icon={sound.icon}
          variant={sound.color}
          isActive={toggleStates[sound.id]}
          onClick={() => toggleSound(sound.id)}
        >
          {sound.label}
        </SoundToggle>
      ))}
    </div>
  );
});

SoundToggles.displayName = "SoundToggles";
