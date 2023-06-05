import { FC, useState } from 'react'
import Input from './Input'
import Button from './Button'
import { AdditionalProduct, BasketItems, CurrentOrder, GoogleUser, User} from '../types/typings'
import { RootState, useAppDispatch, useAppSelector } from '../store/store'
import { addCurrentOrder } from '../store/slices/orderSlice'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

interface OrderModalProps {
    totalPrice: number
    setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    products: BasketItems[]
    additionalProducts: AdditionalProduct[]
}

const OrderModal: FC<OrderModalProps> = ({ setModalIsOpen, totalPrice, products, additionalProducts }) => {
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
            mainOrder: products,
            additionalOrder: additionalProducts,
            userAddress: `${address}, ${house}, подьезд - ${entrance}, кв - ${roomNumber}`,
            comments: comment ? comment : "",
            totalPrice,
            paymentMethod: null,
            payStatus: "Не оплачено",
            change: null,
            status: null
        }
        dispatch(addCurrentOrder(newOrder))
        setModalIsOpen(false)
        navigate("/order")
        toast.success("Ваш заказ успешно создан")
    }


    return <div className='flex flex-col gap-4 max-w-lg'>
        <p className='text-black text-lg'>
            Украина, город Киев
        </p>
        <div>
            <div className='grid grid-cols-3 grid-rows-2 gap-3 mb-1'>
                <Input
                    input={address}
                    setInput={setAddress}
                    placeholder='Введите название своей улицы'
                    type='text'
                    className='col-span-3'
                />
                <Input
                    input={house}
                    setInput={setHouse}
                    placeholder='Дом'
                    type='text'
                    className='col-span-1'
                />
                <Input
                    input={entrance}
                    setInput={setEntrance}
                    placeholder='Подьезд'
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
            <p className='text-gray-300 text-sm max-w-xs'>
                Если вы живете в частном доме, укажите это в комментариях,
                а в полях подьезд и квартира поставте "-"*
            </p>
        </div>
        <textarea
            className='w-full rounded-md outline-none resize-none focus:outline-none border border-gray-400 h-24 px-5 py-3'
            placeholder='Комментарий к заказу'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
        />
        {
        !validAddress && <p className='text-red-500 text-base'>
            Пожалуйста, заполните все поля*
        </p>
        }
        <Button
            text='Подтвердить адрес'
            bgColor='bg-yellow'
            textColor='text-black'
            width='225px'
            height='55px'
            onClick={createOrder}
            disabled={!validAddress}
        />
    </div>
}

export default OrderModal