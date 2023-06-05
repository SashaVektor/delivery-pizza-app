import { FC } from 'react'
import Button from './Button'

interface PaginationsButtonsProps {
    currentPage: number
    totalPages: number
    setCurrentPage: (value: React.SetStateAction<number>) => void
}

const PaginationsButtons: FC<PaginationsButtonsProps> = ({ currentPage, totalPages, setCurrentPage }) => {
    const paginateNext = () => {
        setCurrentPage(currentPage + 1);
    };

    const paginatePrev = () => {
        setCurrentPage(currentPage - 1);
    };

    return <div className="absolute bottom-0 left-0 right-0">
        <div className="flex justify-center mt-4">
            <Button
                bgColor="bg-yellow"
                text="Назад"
                textColor="text-black"
                className="px-4 py-2 mr-2 disabled:bg-gray-400"
                disabled={currentPage === 1}
                onClick={paginatePrev}
            />
            <Button
                bgColor="bg-yellow"
                text="Вперед"
                textColor="text-black"
                className="px-4 py-2 disabled:bg-gray-400"
                disabled={currentPage === totalPages}
                onClick={paginateNext}
            />
        </div>
        <p className="text-center mt-2">
            Страница {currentPage} из {totalPages}
        </p>
    </div>
}

export default PaginationsButtons