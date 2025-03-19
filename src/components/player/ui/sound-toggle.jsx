import { cn } from "@/utils/cn";
import { IconVolume } from "@tabler/icons-react";

// Define las variantes disponibles como un objeto
const VARIANT_NAMES = {
  YELLOW: "yellow",
  BLUE: "blue",
  GREEN: "green",
  RED: "red",
  PURPLE: "purple",
  CYAN: "cyan"
};

// Define las clases para cada variante con estados inactivos más apagados
const VARIANTS = {
  [VARIANT_NAMES.YELLOW]: {
    active: "border-yellow-600 bg-gradient-to-r from-yellow-800 to-yellow-600/40 text-white",
    inactive: "border-white/5 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80"
  },
  [VARIANT_NAMES.BLUE]: {
    active: "border-blue-600 bg-gradient-to-r from-blue-800 to-blue-600/40 text-white",
    inactive: "border-white/5 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80"
  },
  [VARIANT_NAMES.GREEN]: {
    active: "border-green-600 bg-gradient-to-r from-green-800 to-green-600/40 text-white", 
    inactive: "border-white/5 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80"
  },
  [VARIANT_NAMES.RED]: {
    active: "border-red-600 bg-gradient-to-r from-red-800 to-red-600/40 text-white",
    inactive: "border-white/5 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80"
  },
  [VARIANT_NAMES.PURPLE]: {
    active: "border-purple-600 bg-gradient-to-r from-purple-800 to-purple-600/40 text-white",
    inactive: "border-white/5 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80"
  },
  [VARIANT_NAMES.CYAN]: {
    active: "border-cyan-600 bg-gradient-to-r from-cyan-800 to-cyan-600/40 text-white",
    inactive: "border-white/5 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80"
  }
};

/**
 * @typedef {'yellow' | 'blue' | 'green' | 'red' | 'purple' | 'cyan'} VariantType
 */

/**
 * SoundToggle component for toggling audio sources
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Label text
 * @param {React.ReactNode} props.icon - Icon to display
 * @param {VariantType} [props.variant="yellow"] - Color variant
 * @param {boolean} [props.isActive=false] - Active state
 * @param {() => void} props.onClick - Click handler
 */
function SoundToggle({ 
  children, 
  icon = <IconVolume size={16} />,
  variant = VARIANT_NAMES.YELLOW,
  isActive = false,
  onClick
}) {
  const variantClasses = VARIANTS[variant] || VARIANTS[VARIANT_NAMES.YELLOW];
  
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-center gap-2 rounded-md p-1.5 px-3 transition-all duration-300 border",
        isActive ? variantClasses.active : variantClasses.inactive
      )}
    >
      <span className={cn(
        "transition-all", 
        isActive ? "scale-110 opacity-100" : "opacity-70"
      )}>
        {icon}
      </span>
      <span className={cn(
        "text-sm font-medium transition-opacity",
        !isActive && "opacity-70"
      )}>
        {children}
      </span>
    </button>
  );
}

// Exporta tanto el componente como las variantes
SoundToggle.variants = VARIANT_NAMES;
export default SoundToggle;
