import {
  IconPlayerSkipBackFilled,
  IconPlayerSkipForwardFilled,
} from "@tabler/icons-react";
import Button from "@/components/UI/button";

export const SkipButton = ({ forward = false, ...rest }) => {
  return (
    <Button
      className="bg-transparent inset-shadow-white/20 hover:inset-shadow-2xs active:inset-shadow-sm"
      {...rest}
    >
      {!forward && <IconPlayerSkipBackFilled className="h-6 w-6 text-white" />}
      {forward && (
        <IconPlayerSkipForwardFilled className="h-6 w-6 text-white" />
      )}
    </Button>
  );
};

export default SkipButton;
