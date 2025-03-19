import { cn } from "@/utils/cn";

function Button({ children, className, ...rest }) {
  return (
    <button
      className={cn(
        "rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 bg-[length:200%_200%] bg-top p-4 transition-all duration-300 hover:bg-bottom active:bg-[length:100%_100%] active:bg-center",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
