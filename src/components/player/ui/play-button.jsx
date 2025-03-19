import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import { cn } from "@/utils/cn";
import Button from "@/components/UI/button";

export const PlayButton = ({ isPlaying, ...rest }) => {
  return (
    <Button
      className={cn(
        isPlaying &&
          "shadow-[0px_0px_10px] ring-1 shadow-cyan-200/20 ring-cyan-200/50",
      )}
      {...rest}
    >
      {!isPlaying && <IconPlayerPlayFilled className="h-6 w-6 text-white" />}
      {isPlaying && <IconPlayerPauseFilled className="h-6 w-6 text-white" />}
    </Button>
  );
};

export default PlayButton;
