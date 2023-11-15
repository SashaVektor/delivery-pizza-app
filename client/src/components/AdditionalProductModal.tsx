import { FC, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import Button from './Button'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { RootState, useAppDispatch, useAppSelector } from '../store/store'
import { AdditionalProduct } from '../types/typings'
import { addAditionadlItems, removeAdditionalItem } from '../store/slices/basketSlice'
import { onClose } from '../store/slices/modalSlice'

interface AdditionalProductModalProps {
    item: AdditionalProduct
}

const AdditionalProductModal: FC<AdditionalProductModalProps> = ({ item }) => {
    const additionalProducts = useAppSelector((state: RootState) => state.basket.additionadItems)
    const currentItem = additionalProducts.find((product: AdditionalProduct) => product._id === item?._id)

    const [itemQuantity, setItemQuantity] = useState<number>(item?.quantity ? item?.quantity : 1)
    const dispatch = useAppDispatch();

    const increaseAdditionalItem = () => {
        setItemQuantity((prev) => prev + 1)
    }

    const decreaseAdditionalItem = () => {
        setItemQuantity((prev) => prev - 1)
    }

    const addItemToCard = (item: AdditionalProduct) => {
        const newItem = { ...item, quantity: itemQuantity }
        dispatch(addAditionadlItems(newItem))
        dispatch(onClose())
        toast.success(`${item?.name} добавлен в ${item?.category === "other" ? "пиццу" : "корзину"}`)
    }

    useEffect(() => {
        setItemQuantity(item?.quantity ? item?.quantity : 1)
    }, [item])

    return <>
        <div className='w-40 h-40 md:w-[260px] md:h-[260px] mx-auto'>
            <img src={item?.image} alt={item?.name}
                className='w-full h-full object-contain'
            />
        </div>
        {!currentItem &&
            <>
                <h4 className='text-center text-black mb-1 max-w-[250px] mx-auto'>
                    Яку кількість порцій <span className='text-yellow'>{item?.name}</span> ви бажаєте?
                </h4>
                <p className='text-center text-red-500 mb-5'>
                    {item?.price * itemQuantity} грн.
                </p>
                <div className='flex items-center gap-2 md:gap-5 rounded-lg justify-center mb-5'>
                    <button className='bg-yellow p-2 md:p-4 rounded-full disabled:bg-gray-300 hover:bg-yellow/75 transition disabled:cursor-not-allowed'
                        disabled={itemQuantity < 2}
                        onClick={decreaseAdditionalItem}
                    >
                        <AiOutlineMinus />
                    </button>
                    <span className='text-black text-base md:text-xl font-bold'>{itemQuantity}</span>
                    <button className='bg-yellow p-2 md:p-4 rounded-full disabled:bg-gray-300 hover:bg-yellow/75 transition disabled:cursor-not-allowed'
                        disabled={itemQuantity > 3}
                        onClick={increaseAdditionalItem}
                    >
                        <AiOutlinePlus />
                    </button>
                </div>
            </>
        }
        {currentItem ? (
            <div className='flex flex-col gap-2 items-center'>
                <p>В кошику: {currentItem?.quantity} шт.</p>
                <Button
                    bgColor='bg-yellow'
                    text='Прибрати з кошика'
                    textColor='text-white'
                    onClick={() => {
                        dispatch(removeAdditionalItem(item?._id))
                        toast.error(`${item?.name} прибрано з кошика`)
                        setItemQuantity(1)
                        dispatch(onClose())
                    }}
                    className='mx-auto w-full'
                />
            </div>
        )
            : (<Button
                bgColor='bg-yellow'
                text='Додати'
                textColor='text-white'
                onClick={() => addItemToCard(item)}
                className='mx-auto w-full'
            />)}
    </>
}

export default AdditionalProductModal