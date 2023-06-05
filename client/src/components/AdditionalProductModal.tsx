import { FC, useState } from 'react'
import { toast } from 'react-hot-toast'
import Button from './Button'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { useAppDispatch } from '../store/store'
import { AdditionalProduct } from '../types/typings'
import {  addAditionadlItems, removeAdditionalItem } from '../store/slices/basketSlice'

interface AdditionalProductModalProps {
    item: AdditionalProduct
    currentItem: AdditionalProduct | undefined
    setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>

}

const AdditionalProductModal: FC<AdditionalProductModalProps> = ({
    item,
    setModalIsOpen, currentItem
}) => {
    const [itemQuantity, setItemQuantity] = useState<number>(item.quantity)
    const dispatch = useAppDispatch();



    const increaseAdditionalItem = (item: AdditionalProduct) => {
        setItemQuantity((prev) => prev + 1)
        toast.success(`${item.name} увеличен на 1`)
    }

    const decreaseAdditionalItem = (item: AdditionalProduct) => {
        setItemQuantity((prev) => prev - 1)
        toast.success(`${item.name} уменьшен на 1`)
    }

    const addItemToCard = (item: AdditionalProduct) => {
        const newItem = { ...item, quantity: itemQuantity }
        dispatch(addAditionadlItems(newItem))
        setModalIsOpen(false)
        toast.success(`${item.name} добавлен в ${item.category === "other" ? "пиццу" : "корзину"}`)
    }

    return <>
        <div className='w-40 h-40 md:w-[260px] md:h-[260px] mx-auto'>
            <img src={item.image} alt={item.name}
                className='w-full h-full object-contain'
            />
        </div>
        {!currentItem &&
            <>
                <h4 className='text-center text-black mb-1 max-w-[250px] mx-auto'>
                    Сколько порций <span className='text-yellow'>{item.name}</span> вы желаете?
                </h4>
                <p className='text-center text-red-500 mb-5'>
                    {item.price * itemQuantity} грн.
                </p>
                <div className='flex items-center gap-5 rounded-lg justify-center mb-5'>
                    <button className='bg-yellow p-4 rounded-full disabled:bg-gray-400'
                        disabled={itemQuantity > 3}
                        onClick={() => increaseAdditionalItem(item)}
                    >
                        <AiOutlinePlus />
                    </button>
                    <span className='text-black text-xl font-bold'>{itemQuantity}</span>
                    <button className='bg-yellow p-4 rounded-full disabled:bg-gray-400'
                        disabled={itemQuantity < 2}
                        onClick={() => decreaseAdditionalItem(item)}
                    >
                        <AiOutlineMinus />
                    </button>
                </div>
            </>
        }
        {currentItem ? (
            <div className='flex flex-col gap-2 items-center'>
                <p>Добавлено в корзину в количестве: {currentItem.quantity}</p>
                <Button
                    bgColor='bg-yellow'
                    text='Убрать из корзины'
                    textColor='text-white'
                    onClick={() => {
                        dispatch(removeAdditionalItem(item._id))
                        toast.error(`${item.name} убран из корзины в полном количестве`)
                        setItemQuantity(1)
                        setModalIsOpen(false)
                    }}
                    className='mx-auto'
                />
            </div>
        )
            : (<Button
                bgColor='bg-yellow'
                text='Добавить'
                textColor='text-white'
                onClick={() => addItemToCard(item)}
                className='mx-auto'
            />)}
    </>
}

export default AdditionalProductModal