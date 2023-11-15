import { FC, useState } from 'react'
import { PizzaItem } from '../types/typings'
import Button from './Button'
import { FaEdit, FaSpinner, FaTrash } from "react-icons/fa"
import { removePizzaItem } from '../utils'
import { toast } from 'react-hot-toast'
import { RootState, useAppDispatch, useAppSelector } from '../store/store'
import { useGetProductsQuery } from '../store/services/products'
import { setEditProduct } from '../store/slices/productSlice'
import { setIsEditProductModalOpen, setIsProductModalOpen } from '../store/slices/modalSlice'

interface PizzaCardProps {
    pizza: PizzaItem
    isAdminCard?: boolean
}


const PizzaCard: FC<PizzaCardProps> = ({ pizza, isAdminCard }) => {
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
    const user = useAppSelector((state: RootState) => state.auth.googleUser)
    const dispatch = useAppDispatch();
    const { refetch } = useGetProductsQuery();

    const removeItem = async (id: string, token: string) => {
        setDeleteLoading(true)
        try {
            if (window.confirm("Ви дійсно хочете видалити цей продукт?")) {
                const res = await removePizzaItem(id, token);
                if (res?.message === "Продукт успішно видалено") {
                    toast.success(`${pizza.name} було видалено!`)
                    refetch();
                } else {
                    toast.error("Сталася помилка!")
                }
            }
        } catch (err) {
            toast.error("Сталася помилка!")
        } finally {
            setDeleteLoading(false)
        }
    }

    const priceWithDiscont = Math.round(pizza.price - (pizza.price * (pizza.discount / 100)))

    return (
        <div className='bg-white p-2 sm:p-3 w-full sm:w-72 border border-gray-300 rounded-xl flex flex-col relative group'>
            <div className='flex-1'>
                <div
                    className='w-56 h-44 sm:w-64 sm:h-64 mb-2 mx-auto group-hover:scale-[105%] transition cursor-pointer'
                    onClick={() => {
                        dispatch(setIsProductModalOpen())
                        dispatch(setEditProduct(pizza))
                    }}
                >
                    <img src={pizza.image} alt={pizza.name}
                        className='w-full h-full sm:object-contain'
                    />
                </div>
                <h3 className='text-yellow mb-3 font-bold text-base sm:text-lg leading-5 sm:leading-6'>
                    {pizza.name}
                </h3>
                <p className='text-sm leading-4 sm:leading-5 sm:text-base text-black mb-6'>
                    {pizza.descr}
                </p>
            </div>
            <div className='flex justify-between items-center justify-self-end'>
                <p className={`font-bold ${pizza.discount > 0 ? "text-red-500" : "text-black"} text-base sm:text-lg`}>
                    від {pizza.discount ? priceWithDiscont : pizza.price} грн.
                </p>
                {!isAdminCard ? <Button
                    bgColor='bg-yellow'
                    text='В корзину'
                    width='126'
                    height='36'
                    textColor='text-white'
                    onClick={() => {
                        dispatch(setIsProductModalOpen())
                        dispatch(setEditProduct(pizza))
                    }}
                    className='hover:bg-yellow/70 transition'
                /> : (
                    <div className='flex items-center gap-3'>
                        {deleteLoading ? <div className="flex items-center justify-center">
                            <FaSpinner size={30} className="animate-spin" />
                        </div> : <button className='hover:scale-110 transition'
                            onClick={() => removeItem(pizza._id, user?.token ? user.token : "")}
                        >
                            <FaTrash
                                size={30}
                                className="text-red-500 cursor-pointer"
                            />
                        </button>}
                        <button className='hover:scale-110 transition'
                            onClick={() => {
                                dispatch(setEditProduct(pizza))
                                dispatch(setIsEditProductModalOpen())
                            }}
                        >
                            <FaEdit
                                size={30}
                                className="text-sky-500 cursor-pointer"
                            />
                        </button>
                    </div>
                )}

            </div>
        </div>
    )
}


export default PizzaCard
