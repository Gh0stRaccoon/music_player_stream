import { IconPlayerSkipBackFilled, IconPlayerSkipForwardFilled } from "@tabler/icons-react"
import Button from "@/components/UI/button"

function SkipButton({ forward = false }) {
    return (
        <Button>
            {!forward &&
                <IconPlayerSkipBackFilled className="h-6 w-6 text-white" />
            }
            {forward &&
                <IconPlayerSkipForwardFilled className="h-6 w-6 text-white" />
            }
        </Button>
    )
}

export default SkipButton