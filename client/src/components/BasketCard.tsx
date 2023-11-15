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
    return <div className='flex gap-2 sm:gap-5 items-center pb-1 border-b border-gray-300 mr-3'>
        <div className='flex-1 flex items-center'>
            <div className='min-w-[80px] w-[80px] h-[65px] sm:w-[120px] sm:min-w-[120px] sm:h-[100px] mr-2'>
                <img src={item.image} alt={item.name}
                    className='w-full h-full object-contain'
                />
            </div>
            <div>
                <h4 className='text-black text-base font-medium leading-4 max-w-[250px] mb-2 sm:mb-0'>
                    {item.name}
                </h4>
                <p className='text-gray-300 text-sm mb-1 hidden sm:block'>
                    {item.info}
                </p>
                <div className='flex items-center gap-3 rounded-lg'>
                    <button className='bg-yellow p-1 sm:p-2 rounded-full disabled:bg-gray-300 hover:bg-yellow/75 transition disabled:cursor-not-allowed'
                        disabled={item.quantity < 2}
                        onClick={() => dispatch(decreaseItem(item))}
                    >
                        <AiOutlineMinus />
                    </button>
                    <span className='text-black text-base font-semibold sm:text-lg sm:font-bold'>{item.quantity}</span>
                    <button className='bg-yellow p-1 sm:p-2 rounded-full disabled:bg-gray-300 hover:bg-yellow/75 transition disabled:cursor-not-allowed'
                        disabled={item.quantity > 9}
                        onClick={() => dispatch(increaseItem(item))}

                    >
                        <AiOutlinePlus />
                    </button>
                </div>
            </div>
        </div>
        <div>
            <button
                onClick={() => {
                    dispatch(removeItemFromBasket(item._id))
                    toast.error(`${item.name} было удалено из корзины`)
                }}
                className='hover:scale-110 transition mb-0 sm:mb-1 ml-auto block'
            >
                <RxCrossCircled
                    color="gray"
                    className="text-2xl"
                />
            </button>
            {item.category === 'піца' ? <p className='text-base leading-5 text-gray-400 text-right whitespace-nowrap hidden sm:block'>
                Додатків: {item.additiveItems?.length}
            </p> : null}
            <p className='text-base font-semibold sm:text-xl text-yellow sm:font-bold'>
                {item.price * item.quantity} грн.
            </p>
        </div>

    </div>
}

export default BasketCard