import { FC } from 'react'
import { BasketItems } from '../types/typings'
import { useAppDispatch } from '../store/store'
import { decreaseItem, increaseItem, removeItemFromBasket } from '../store/slices/basketSlice'
import { toast } from 'react-hot-toast'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { RxCrossCircled } from 'react-icons/rx'

interface BasketPageCardProps {
    item: BasketItems
}

const BasketPageCard: FC<BasketPageCardProps> = ({ item }) => {
    const dispatch = useAppDispatch();
    return <div
        className="flex flex-col sm:flex-row gap-5 sm:items-center pb-5 border-b border-gray-300 justify-between w-fit"
    >
        <div className='flex gap-5 items-center'>
            <div className="w-20 h-20">
                <img src={item.image} alt={item.name}
                    className="w-full h-full object-contain"
                />
            </div>
            <div className="max-w-[220px] sm:max-w-[320px] flex flex-col gap-2">
                <h6 className="font-bold text-base md:text-lg text-black leading-4">
                    {item.name}
                </h6>
                <p className="text-gray-600 text-sm leading-3">
                    {item.descr}
                </p>
                <p className="text-gray-500 text-sm leading-3">
                    {item.info}
                </p>
                <p className="text-gray-400 text-sm leading-3">
                    Добавки: {item.additiveItems?.length ? item.additiveItemsInfo : 0}
                </p>
            </div>
        </div>
        <div className='flex gap-5 items-center'>
            <p className="text-yellow font-extrabold text-xl">
                {item.price * item.quantity} грн.
            </p>
            <div className='flex items-center gap-3 rounded-lg justify-center'>
                <button className='bg-yellow p-2 rounded-full disabled:bg-gray-400'
                    disabled={item.quantity > 9}
                    onClick={() => {
                        dispatch(increaseItem(item))
                        toast.success(`${item.name} added to card by 1`)
                    }}

                >
                    <AiOutlinePlus />
                </button>
                <span className='text-black text-lg font-bold'>{item.quantity}</span>
                <button className='bg-yellow p-2 rounded-full disabled:bg-gray-400'
                    disabled={item.quantity < 2}
                    onClick={() => {
                        dispatch(decreaseItem(item))
                        toast.error(`${item.name} removed to card by 1`)
                    }}
                >
                    <AiOutlineMinus />
                </button>
            </div>
            <RxCrossCircled
                color="gray"
                className="cursor-pointer ml-auto w-8 h-8"
                onClick={() => {
                    dispatch(removeItemFromBasket(item._id))
                    toast.error(`${item.name} было удалено из корзины`)
                }}
            />
        </div>
    </div>
}

export default BasketPageCard