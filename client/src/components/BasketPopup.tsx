import React, { FC } from 'react'
import { BasketItems } from '../types/typings'
import Button from './Button'
import { RxCrossCircled } from "react-icons/rx"
import BasketCard from './BasketCard'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/store'
import { removeAllItems, selectTotalPrice } from '../store/slices/basketSlice'
import { toast } from 'react-hot-toast'

interface BasketPopupProps {
    items: BasketItems[]
    isBasketPopupOpen: boolean
    setIsBasketPopupOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const BasketPopup: FC<BasketPopupProps> = ({ items, isBasketPopupOpen, setIsBasketPopupOpen }) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const totalPrice = useAppSelector(selectTotalPrice)


    return (
        <div className={`${isBasketPopupOpen ? "block" : "hidden"} 
    absolute shadow-md bg-white right-0 top-20 border-[2px] border-yellow rounded-md p-2 sm:p-6 pr-3 z-[45]`}>
            {items?.length === 0 ? (
                <div className='flex flex-col gap-5 items-center'>
                    <h2 className='text-yellow text-xl text-bold text-center'>
                        Ваша корзина пуста!
                    </h2>
                    <Button
                        bgColor='bg-yellow'
                        text='К заказу'
                        textColor='text-white'
                        height='50px'
                        width='200px'
                        onClick={() => setIsBasketPopupOpen(false)}
                    />
                </div>

            ) : (
                <div className='relative'>
                    <RxCrossCircled
                        onClick={() => setIsBasketPopupOpen(false)}
                        color="yellow"
                        size={28}
                        className="absolute -right-2 -top-1 sm:-top-3 cursor-pointer"
                    />
                    <h2 className='text-xl py-3 text-yellow font-bold'>Ваша корзина</h2>
                    <div className='flex flex-col gap-4 overflow-y-auto max-h-72 mb-2 scrollbar-w-2 scrollbar-track-yellow-lighter scrollbar-thumb-yellow scrollbar-thumb-rounded'>
                        {items?.map((item: BasketItems) => (
                            <BasketCard
                                key={item._id}
                                item={item}
                            />
                        ))}
                    </div>
                    <div className='mb-2'>
                        <Button
                            bgColor='bg-gray-400'
                            text='Очистить корзину'
                            textColor='text-black'
                            onClick={() => {
                                dispatch(removeAllItems())
                                toast.error("Корзина очищена")
                                window.location.reload()
                            }}
                            className='ml-auto'
                        />
                    </div>
                    <div className='flex justify-between items-center mb-4'>
                        <h6 className='text-black text-md font-light'>
                            Сумма заказа
                        </h6>
                        <p className='text-xl text-yellow font-bold'>
                            {totalPrice} грн.
                        </p>
                    </div>
                    <Button
                        onClick={() => {
                            navigate("/basket")
                            setIsBasketPopupOpen(false)
                        }}
                        bgColor='bg-yellow'
                        text='Следующий шаг'
                        textColor='text-white'
                        width='300px'
                        height='70px'
                        className='mx-auto'
                    />
                </div>
            )}
        </div>
    )
}

export default BasketPopup
