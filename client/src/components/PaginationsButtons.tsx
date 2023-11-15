import { FC } from 'react'
import Button from './Button'

interface PaginationsButtonsProps {
    currentPage: number
    totalPages: number
    paginatePrev: () => void
    paginateNext: () => void
}

const PaginationsButtons: FC<PaginationsButtonsProps> = ({ currentPage, totalPages, paginateNext, paginatePrev }) => {

    return <div className="absolute bottom-0 left-0 right-0">
        <div className="flex mt-4">
            <Button
                bgColor="bg-yellow"
                text="Назад"
                textColor="text-black"
                className="px-4 py-2 mr-2 disabled:bg-gray-300 hover:bg-yellow/80"
                disabled={currentPage === 1}
                onClick={paginatePrev}
            />
            <Button
                bgColor="bg-yellow"
                text="Вперед"
                textColor="text-black"
                className="px-4 py-2 disabled:bg-gray-300 hover:bg-yellow/80"
                disabled={currentPage === totalPages}
                onClick={paginateNext}
            />
        </div>
        <p className="mt-2">
            Сторінка <span className='font-bold'>{currentPage}</span> з <span className='font-bold'>{totalPages}</span>
        </p>
    </div>
}

export default PaginationsButtons