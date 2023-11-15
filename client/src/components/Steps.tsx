import { FC } from 'react'

interface StepsProps {
    active: number
}

const Steps: FC<StepsProps> = ({ active }) => {
    return <div className='flex gap-3 sm:gap-10 items-center flex-col sm:flex-row'>
        <div className='flex flex-col gap-1 items-center'>
            <div className={`${active === 1 ? "bg-yellow text-black" : "border border-yellow text-yellow"} 
            rounded-full w-9 h-9 flex items-center justify-center`}>
                1
            </div>
            <h6 className={`${active === 1 ? "text-black font-medium" : "text-gray-400"} text-sm text-center`}>
                Кошик
            </h6>
        </div>
        <div className='flex flex-col gap-1 items-center'>
            <div className={`${active === 2 ? "bg-yellow text-black" : "border border-yellow text-yellow"} 
            rounded-full w-9 h-9 flex items-center justify-center`}>
                2
            </div>
            <h6 className={`${active === 2 ? "text-black font-medium" : "text-gray-400"} text-sm text-center`}>
                Створення
            </h6>
        </div>
        <div className='flex flex-col gap-1 items-center'>
            <div className={`${active === 3 ? "bg-yellow text-black" : "border border-yellow text-yellow"} 
            rounded-full w-9 h-9 flex items-center justify-center`}>
                3
            </div>
            <h6 className={`${active === 3 ? "text-black font-medium" : "text-gray-400"} text-sm text-center`}>
                Підтвердження
            </h6>
        </div>
    </div>
}

export default Steps