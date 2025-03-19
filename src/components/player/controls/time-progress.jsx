import { cn } from "@/utils/cn";

function TimeProgress({
  currentTime = 0,
  duration = 100,
  handleTimeChange,
  buffered = 0,
}) {
  const bufferProgress = (buffered / duration) * 100;
  const playProgress = (currentTime / duration) * 100;

  return (
    <div className="relative w-full max-w-md">
      {/* Barra de progreso visual */}
      <div className="relative h-2 rounded-lg bg-gray-100">
        <div
          className="absolute top-0 left-0 h-full rounded-full bg-gray-300"
          style={{ width: `${bufferProgress}%` }}
        ></div>
        <div
          className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-l from-blue-400 to-cyan-500"
          style={{ width: `${playProgress}%` }}
        ></div>
        <div
          className={cn(
            "pointer-events-none absolute top-1/2 z-20 h-4 w-4 -translate-1/2 rounded-full border border-cyan-600 bg-cyan-400",
          )}
          style={{ left: `${playProgress}%` }}
        ></div>
      </div>

      {/* Control deslizante oculto */}
      <input
        type="range"
        min="0"
        max={duration}
        value={currentTime}
        onChange={handleTimeChange}
        className="pointer-events-auto absolute top-0 h-2 w-full cursor-pointer opacity-0"
      />
    </div>
  );
}

export default TimeProgress;
