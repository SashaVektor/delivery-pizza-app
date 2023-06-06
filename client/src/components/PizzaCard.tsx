import { FC, useState } from 'react'
import { PizzaItem } from '../types/typings'
import Button from './Button'
import Modal from './Modal'
import PizzaPopup from './PizzaPopup'
import { FaTrash } from "react-icons/fa"
import { removePizzaItem } from '../utils'
import { toast } from 'react-hot-toast'
import { RootState, useAppSelector } from '../store/store'

interface PizzaCardProps {
    pizza: PizzaItem
    isAdminCard?: boolean
}


const PizzaCard: FC<PizzaCardProps> = ({ pizza, isAdminCard }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const user = useAppSelector((state: RootState) => state.auth.googleUser)
    

    const removeItem = async (id: string, token: string) => {
        if (window.confirm("Вы действительно хотите удалить продукт?")) {
            removePizzaItem(id, token);
            toast.success(`${pizza.name} была удалена!`)
            setTimeout(() => {
                window.location.reload();
            }, 1000)
        } else {
            return
        }
    }

    const priceWithDiscont = Math.round(pizza.price - (pizza.price * (pizza.discount / 100)))
    

    return (
        <>
            <Modal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                title="Выберите опции"
            >
                <PizzaPopup
                    pizza={pizza}
                    setIsOpen={setIsModalOpen}
                />
            </Modal>
            <div className='bg-white shadow-md p-3 w-56 sm:w-72 rounded-md flex flex-col relative'>
                {pizza.discount ? <div className='px-2 py-1 bg-red-500 absolute top-0 left-0 rounded-md'>
                    <p className='text-xs sm:text-base'>
                        Скидка {pizza.discount} %
                    </p>
                </div>: ""}
                <div className='flex-1'>
                    <div className='w-48 h-48 sm:w-64 sm:h-64 mb-2 mx-auto'>
                        <img src={pizza.image} alt={pizza.name}
                            className='w-full h-full object-contain'
                        />
                    </div>
                    <h3 className='text-gray-400 mb-3 font-bold text-base sm:text-lg'>
                        {pizza.name}
                    </h3>
                    <p className='text-sm sm:text-base text-gray-300 mb-6'>
                        {pizza.descr}
                    </p>
                </div>
                <div className='flex justify-between items-center justify-self-end'>
                    <p className={`font-bold ${pizza.discount > 0 ? "text-red-500" : "text-black"} text-base sm:text-lg`}>
                        от {pizza.discount ? priceWithDiscont : pizza.price} грн.
                    </p>
                    {!isAdminCard ? <Button
                        bgColor='bg-yellow'
                        text='В корзину'
                        width='126'
                        height='36'
                        textColor='text-white'
                        onClick={() => setIsModalOpen(true)}
                    /> : (
                        <FaTrash
                            size={30}
                            className="text-red-600 cursor-pointer"
                            onClick={() => removeItem(pizza._id, user?.token ? user.token : "")}
                        />
                    )}

                </div>
            </div>
        </>
    )
}

export default PizzaCard
