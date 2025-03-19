const BrightEffect = ({ props, ref }) => {
  return (
    <div
      ref={ref}
      className="pointer-events-none absolute top-0 left-0 z-20 h-24 w-24 rounded-full bg-white/20 mix-blend-overlay blur-2xl will-change-transform"
      {...props}
    />
  );
};

export default BrightEffect;
