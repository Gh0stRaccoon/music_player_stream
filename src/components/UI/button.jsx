import { cn } from "@/utils/cn"

function Button({ children, ...rest }) {
    return (
        <button className={cn("rounded-full p-4 bg-gradient-to-br from-cyan-500 to-blue-600 bg-[length:200%_200%] bg-top hover:bg-bottom transition-all duration-300 active:bg-[length:100%_100%] active:bg-center")} {...rest}>
            {children}
        </button>
    )
}

export default Button