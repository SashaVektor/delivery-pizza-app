import { FC } from "react"

interface ButtonProps {
    bgColor: string
    text: string
    textColor: string
    width?: string
    height?: string
    className?: string
    onClick?: () => void 
    type?: "button" | "reset" | "submit"
    disabled?: boolean
}

const Button: FC<ButtonProps> = ({ bgColor, text, type,textColor, width, height, className, onClick, disabled }) => {
    return (
        <button
            className={`block ${bgColor} ${textColor} w-[${width}] h-[${height}] 
            rounded-md px-3 py-2 outline-none disabled:bg-gray-300 disabled:cursor-not-allowed ${className} transition`}
            onClick={onClick}
            disabled={disabled}
            type={type ? type : "submit"}
        >
            {text}
        </button>
    )
}

export default Button
