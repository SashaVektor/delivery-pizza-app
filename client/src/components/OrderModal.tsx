import { FC, useState } from 'react'
import Input from './Input'
import Button from './Button'
import { AdditionalProduct, BasketItems, CurrentOrder, GoogleUser, User } from '../types/typings'
import { RootState, useAppDispatch, useAppSelector } from '../store/store'
import { addCurrentOrder } from '../store/slices/orderSlice'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { onClose } from '../store/slices/modalSlice'

interface OrderModalProps {
    totalPrice: number
    products: BasketItems[]
    additionalProducts: AdditionalProduct[]
}

const OrderModal: FC<OrderModalProps> = ({ totalPrice, products, additionalProducts }) => {
    const [address, setAddress] = useState<string>("")
    const [house, setHouse] = useState<string>("")
    const [entrance, setEntrance] = useState<string>("")
    const [roomNumber, setRoomNumber] = useState<string>("")
    const [comment, setComment] = useState<string>("")
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const user: GoogleUser | User | null = useAppSelector((state: RootState) => state.auth.googleUser)

    const validAddress = address && house && entrance && roomNumber

    const createOrder = () => {
        const newOrder: CurrentOrder = {
            userInfo: {
                name: user?.name,
                phone: null,
                email: user?.email
            },
            userId: null,
            mainOrder: products,
            additionalOrder: additionalProducts,
            userAddress: `${address}, ${house}, під'їзд - ${entrance}, кв - ${roomNumber}`,
            comments: comment ? comment : "",
            totalPrice,
            paymentMethod: null,
            payStatus: "Не оплачено",
            change: null,
            status: null
        }
        dispatch(addCurrentOrder(newOrder))
        dispatch(onClose())
        navigate("/order")
        toast.success("Ваше замовлення успішно створено")
    }


    return <div className='flex flex-col gap-4 max-w-lg'>
        <p className='text-black text-lg'>
            Україна, місто Київ
        </p>
        <div>
            <div className='grid grid-cols-3 grid-rows-2 gap-3 mb-1'>
                <Input
                    input={address}
                    setInput={setAddress}
                    placeholder='Введіть назву вашої вулиці'
                    type='text'
                    className='col-span-3'
                />
                <Input
                    input={house}
                    setInput={setHouse}
                    placeholder='Дім'
                    type='text'
                    className='col-span-1'
                />
                <Input
                    input={entrance}
                    setInput={setEntrance}
                    placeholder="Під'їзд"
                    type='text'
                    className='col-span-1'
                />
                <Input
                    input={roomNumber}
                    setInput={setRoomNumber}
                    placeholder='Квартира'
                    type='text'
                    className='col-span-1'
                />
            </div>
            <p className='text-gray-300 text-sm'>
                Якщо ви живете в приватному будинку, вкажіть це в коментарях, а в полях під'їзд і квартира поставте "-"*.
            </p>
        </div>
        <textarea
            className='w-full rounded-md outline-none resize-none focus:outline-none border border-gray-400 h-24 px-2.5 py-1.5 sm:px-5 sm:py-3 focus-within:border-yellow'
            placeholder='Коментарі до замовлення'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
        />
        <Button
            text='Підтвердити адресу'
            bgColor='bg-yellow'
            textColor='text-black'
            width='225px'
            height='55px'
            onClick={createOrder}
            disabled={!validAddress}
            className='hover:bg-yellow/75'
        />
    </div>
}

export default OrderModal