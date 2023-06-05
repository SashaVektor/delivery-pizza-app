import { FC } from "react"

interface InputProps {
    type: string
    placeholder: string
    input: string | number
    setInput: React.Dispatch<React.SetStateAction<string>> 
    width?: string
    className? : string
    disabled?: boolean
}

const Input: FC<InputProps> = ({type, input, setInput, placeholder, width, className, disabled}) => {
  return (
    <input 
    type={type}
    value={input}
    onChange={e => setInput(e.target.value)}
    className={`h-[40px] ${width} outline-none rounded-md border border-gray-400 px-4 py-2 ${className}`}
    placeholder={placeholder}
    disabled={disabled}
    />
  )
}

export default Input
