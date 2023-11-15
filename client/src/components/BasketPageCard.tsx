import { FC } from 'react'
import { BasketItems } from '../types/typings'
import { useAppDispatch } from '../store/store'
import { decreaseItem, increaseItem, removeItemFromBasket } from '../store/slices/basketSlice'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { FaRegTrashAlt } from 'react-icons/fa'

interface BasketPageCardProps {
    item: BasketItems
}

const BasketPageCard: FC<BasketPageCardProps> = ({ item }) => {
    const dispatch = useAppDispatch();
    return <div
        className="flex flex-col sm:flex-row gap-2 md:gap-5 sm:items-center pb-2 sm:pb-5 border-b border-gray-300 justify-between"
    >
        <div>
            <div className='flex gap-2 sm:items-center'>
                <div className="min-w-[80px] w-20 h-20 md:min-w-[128px] md:w-32 md:h-32 mr-2">
                    <img src={item.image} alt={item.name}
                        className="w-full h-full object-contain"
                    />
                </div>
                <div className="sm:max-w-[290px] md:max-w-[320px] flex flex-col gap-2">
                    <h6 className="font-bold text-base md:text-lg text-black leading-4">
                        {item.name}
                    </h6>
                    <p className="text-gray-600 text-sm leading-4">
                        {item.descr}
                    </p>
                    <p className="text-gray-900 text-sm leading-4 hidden sm:block">
                        {item.info}
                    </p>
                    <p className="text-gray-400 text-sm leading-4 hidden sm:block">
                        Додатки: {item.additiveItems?.length ? item.additiveItemsInfo : 0}
                    </p>
                </div>
            </div>
            <div className='flex gap-2 mt-1'>
                <p className="text-gray-900 text-sm leading-4">
                    {item.info}
                </p>
                <p className="text-gray-400 text-sm leading-4">
                    Додатки: {item.additiveItems?.length ? item.additiveItemsInfo : 0}
                </p>
            </div>
        </div>
        <div className='flex gap-2 md:gap-5 items-center justify-end'>
            <p className="text-yellow text-lg font-semibold md:font-bold md:text-xl">
                {item.price * item.quantity} грн.
            </p>
            <div className='flex items-center gap-3 md:gap-3 rounded-lg justify-center'>
                <button className='bg-yellow p-1 md:p-2 rounded-full disabled:bg-gray-300 hover:bg-yellow/75 transition disabled:cursor-not-allowed'
                    disabled={item.quantity < 2}
                    onClick={() => dispatch(decreaseItem(item))}
                >
                    <AiOutlineMinus />
                </button>
                <span className='text-base md:text-lg font-semibold md:font-bold'>{item.quantity}</span>
                <button className='bg-yellow p-1 md:p-2 rounded-full disabled:bg-gray-300 hover:bg-yellow/75 transition disabled:cursor-not-allowed'
                    disabled={item.quantity > 9}
                    onClick={() => dispatch(increaseItem(item))}

                >
                    <AiOutlinePlus />
                </button>
                <button className='block ml-auto hover:scale-110 transition'>
                    <FaRegTrashAlt
                        className="text-rose-500 text-xl sm:text-2xl md:text-3xl"
                        onClick={() => dispatch(removeItemFromBasket(item._id))}
                    />
                </button>
            </div>
        </div>
    </div>
}

export default BasketPageCard