import BrightEffect from "./bright-effect";

const PlayerCard = ({ children, brightRef, ref, ...props }) => {
  return (
    <div
      ref={ref}
      className="relative z-20 flex w-3/4 max-w-xs min-w-3xs flex-col items-center justify-center gap-6 overflow-hidden rounded-md border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-2xl md:w-full"
      {...props}
    >
      <BrightEffect ref={brightRef} />
      {children}
    </div>
  );
};

export default PlayerCard;
