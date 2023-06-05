import { FC } from "react"

interface ButtonProps {
    bgColor: string
    text: string
    textColor: string
    width?: string
    height?: string
    className?: string
    onClick?: () => void 

    disabled?: boolean
}

const Button: FC<ButtonProps> = ({ bgColor, text, textColor, width, height, className, onClick, disabled }) => {
    return (
        <button
            className={`block ${bgColor} ${textColor} w-[${width}] h-[${height}] 
            rounded-md px-5 py-2 outline-none disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    )
}

export default Button
