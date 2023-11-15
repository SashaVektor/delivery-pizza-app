import { FC, SetStateAction, Dispatch } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import CreateProduct from './CreateProductForm'

interface CreateProductModalProps {
    isVisible: boolean,
    setIsVisible: Dispatch<SetStateAction<boolean>>
}

const CreateProductModal: FC<CreateProductModalProps> = ({ isVisible, setIsVisible }) => {
    const handleModalClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
            setIsVisible(false)
        }
    }

    return <div
        onClick={handleModalClick}
        className={`${isVisible ? "right-0" : "-right-[150%]"} h-[100dvh] duration-300 fixed top-0 w-[100dvw] flex justify-end bg-black/50 z-[45] overflow-y-auto overflow-x-hidden`}
    >
        <div className='flex flex-col bg-white pt-2 sm:pt-4 relative max-w-[90dvw] sm:max-w-2xl h-[100dvh] overflow-y-auto overflow-x-hidden scrollbar-w-2 scrollbar-track-yellow-lighter scrollbar-thumb-yellow scrollbar-thumb-rounded'>
            <div className="flex px-4 sm:px-6 items-center justify-between gap-6 sm:gap-10 mb-3 sm:mb-5">
                <h2 className="text-xl sm:text-2xl font-semibold text-primary">
                    Створити новий продукт
                </h2>
                <button className="hover:scale-125 transition duration-200"
                    onClick={() => setIsVisible(false)}
                >
                    <IoIosArrowBack size={26} className="text-primary" />
                </button>
            </div>
            <div className="flex-1 flex flex-col">
                <CreateProduct 
                setIsVisible={setIsVisible}
                />
            </div>
        </div>
    </div>
}

export default CreateProductModal