import { IconPlayerPauseFilled, IconPlayerPlayFilled } from "@tabler/icons-react"
import Button from "@/components/UI/button"

function PlayButton({ isPlaying, ...rest }) {
    return (
        <Button {...rest} >
            {!isPlaying &&
                <IconPlayerPlayFilled className="h-6 w-6 text-white" />
            }
            {isPlaying && <IconPlayerPauseFilled className="h-6 w-6 text-white" />}
        </Button>
    )
}

export default PlayButton