import { FC } from 'react'
import { BasketItems } from '../types/typings'
import { RxCrossCircled } from 'react-icons/rx'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { useAppDispatch } from '../store/store'
import { decreaseItem, increaseItem, removeItemFromBasket } from '../store/slices/basketSlice'
import { toast } from 'react-hot-toast'

interface BasketCardProps {
    item: BasketItems
}

const BasketCard: FC<BasketCardProps> = ({ item }) => {
    const dispatch = useAppDispatch();
    return <div className='flex gap-2 sm:gap-5 items-end pb-3 border-b border-gray-300 mr-3'>
        <div className='flex-1 flex gap-2 sm:gap-5 items-center'>
            <div className='w-[70px] h-[70px]'>
                <img src={item.image} alt={item.name}
                    className='w-full h-full object-contain'
                />
            </div>
            <div className='max-w-[150px]'>
                <h4 className='text-black text-base font-medium leading-4'>
                    {item.name}
                </h4>
                <p className='text-gray-300 text-sm mb-1'>
                    {item.info.slice(0,15)}...
                </p>
                <div className='flex items-center gap-3 rounded-lg'>
                    <button className='bg-yellow p-2 rounded-full disabled:bg-gray-400'
                        disabled={item.quantity > 9}
                        onClick={() => {
                            dispatch(increaseItem(item))
                            toast.success(`${item.name} добавлена в корзину в размере 1`)
                        }}

                    >
                        <AiOutlinePlus />
                    </button>
                    <span className='text-black text-lg font-bold'>{item.quantity}</span>
                    <button className='bg-yellow p-2 rounded-full disabled:bg-gray-400'
                        disabled={item.quantity < 2}
                        onClick={() => {
                            dispatch(decreaseItem(item))
                            toast.error(`${item.name} убрана из корзины в размере 1`)
                        }}
                    >
                        <AiOutlineMinus />
                    </button>
                </div>
            </div>
        </div>
        <div>
            <RxCrossCircled
                size={20}
                color="gray"
                className="mb-3 ml-auto cursor-pointer"
                onClick={() => {
                    dispatch(removeItemFromBasket(item._id))
                    toast.error(`${item.name} было удалено из корзины`)
                }}
            />
            <p className='text-xs text-gray-400 text-right'>
                Добавок: {item.additiveItems?.length}
            </p>
            <p className='text-xl text-yellow font-bold'>
                {item.price * item.quantity} грн.
            </p>
        </div>

    </div>
}

export default BasketCard