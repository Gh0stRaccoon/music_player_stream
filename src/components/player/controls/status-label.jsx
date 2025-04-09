import { cn } from "@/utils/cn";

function StatusLabel({ isPlaying }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute top-1/2 left-1/2 mb-4 flex h-full w-full -translate-1/2 items-center justify-center text-2xl transition-colors delay-1000 duration-1000",
        !isPlaying && "bg-black/40 delay-75 duration-500",
      )}
    >
      {isPlaying ? (
        <p
          className={cn(
            "transition-opacity delay-1000 duration-1000 ease-out",
            isPlaying ? "opacity-0" : "opacity-100",
          )}
        >
          Playing
        </p>
      ) : (
        <p>Paused</p>
      )}
    </div>
  );
}

export default StatusLabel;
