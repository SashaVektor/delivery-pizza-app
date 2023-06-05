import { FC } from 'react'
import {RxCross1} from "react-icons/rx"

interface ModalProps {
  children: React.ReactNode
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  title : string
}

const Modal: FC<ModalProps> = ({children, isOpen, setIsOpen, title}) => {
  return <div className={`${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-100%]"} flex items-center justify-center fixed w-full  min-h-screen bg-yellow/40 -top-[120px] bottom-0 left-0 transition-all duration-300 z-50`}>
    <div className='bg-white rounded-lg shadow-sm p-4 md:p-6 mt-20 mx-4 md:mx-5'>
        <div className='flex justify-between items-center mb-5 gap-5'>
            <h2 className='text-yellow text-lg md:text-xl font-bold'>
                {title}
            </h2>
            <button onClick={() => setIsOpen(false)}>
                <RxCross1 />
            </button>
        </div>
          {children}
    </div>
  </div>
}

export default Modal