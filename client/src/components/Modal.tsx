import { FC } from 'react'
import { RxCross1 } from "react-icons/rx"
import { useAppDispatch } from '../store/store'
import { onClose } from '../store/slices/modalSlice'

interface ModalProps {
  children: React.ReactNode
  isOpen: boolean
  title: string
}

const Modal: FC<ModalProps> = ({ children, isOpen, title }) => {
  const dispatch = useAppDispatch();
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      dispatch(onClose())
    }
  };

  return <div
    className={`${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-100%]"} flex items-center justify-center fixed w-full h-[100dvh] bg-yellow/40 bottom-0 left-0 transition-all duration-300 z-50`}
    onClick={handleModalClick}
  >
    <div className='bg-white rounded-lg shadow-sm p-4 md:p-6 mx-4 md:mx-5 max-w-3xl max-h-[90dvh] overflow-y-auto overflow-x-hidden scrollbar-w-2 scrollbar-track-yellow-lighter scrollbar-thumb-yellow scrollbar-thumb-rounded'>
      <div className='flex justify-between items-center mb-3 gap-5'>
        <h2 className='text-yellow text-xl md:text-2xl font-bold'>
          {title}
        </h2>
        <button onClick={() => dispatch(onClose())} className='hover:scale-125 transition duration-300'>
          <RxCross1 />
        </button>
      </div>
      {children}
    </div>
  </div>
}

export default Modal