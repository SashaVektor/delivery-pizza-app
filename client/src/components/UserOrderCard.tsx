import { FC } from 'react'
import { UserOrder } from '../types/typings'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import getStripe from '../utils/getStripe'
import { updateOrderPayment } from '../utils'
import { RootState, useAppDispatch, useAppSelector } from '../store/store'
import { addPaidOrder } from '../store/slices/orderSlice'
import { baseUrl } from '../helpers/constants'

interface UserOrderCardProps {
    order: UserOrder
    number: number
}

const UserOrderCard: FC<UserOrderCardProps> = ({ order, number }) => {
    const user = useAppSelector((state: RootState) => state.auth.googleUser)
    const dispatch = useAppDispatch();

    const payTheOrder = async (order: UserOrder) => {

        try {
            const stripe = await getStripe();
            const response = await axios.post(`${baseUrl}/create-payment-intent`, order, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 500) return;

            const data = response.data;

            dispatch(addPaidOrder(order))
            toast.loading('Redirecting...');
            const result = await stripe.redirectToCheckout({ sessionId: data.sessionId });

            if (result.error) {
                toast.error("Помилка в оплаті");
            } else {
                await updateOrderPayment("Оплачено", order._id, user?.token ? user.token : "");
                toast.success('Оплата успішна');
            }

        } catch (error) {
            toast.error("Что то пошло не так!")
        }
    }

    return <div className="flex w-[320px] md:w-[380px] h-[300px] sm:h-[380px] md:h-[460px] flex-col justify-between bg-white py-3 px-4 rounded-lg drop-shadow-sm border border-gray-300">
        <div>
            <h4 className="text-yellow text-lg md:text-xl mb-5">
                Замовлення № {number}
            </h4>
            <div className="flex flex-col gap-5 overflow-y-auto max-h-32 sm:max-h-52 md:max-h-72 scrollbar-w-2 scrollbar-track-yellow-lighter scrollbar-thumb-yellow scrollbar-thumb-rounded mb-5">
                {order.mainOrder.map((mainOrder) => (
                    <div
                        className="flex items-center justify-between gap-2 pr-2 sm:gap-5 pb-1 md:pb-2 border-b border-gray-300"
                        key={mainOrder._id}
                    >
                        <p className="font-semibold">{mainOrder.quantity}x</p>
                        <h6 className="font-medium md:font-bold text-center leading-5">
                            {mainOrder.name.length > 22 ? `${mainOrder.name.slice(0, 20)}...` : mainOrder.name}
                        </h6>
                        <p className="font-semibold whitespace-nowrap">
                            {mainOrder.price * mainOrder.quantity}грн
                        </p>
                    </div>
                ))}
                {order.additionalOrder.map((additionalOrder) => (
                    <div
                        className="flex items-center justify-between gap-2 pr-2 sm:gap-5 pb-1 md:pb-2 border-b border-gray-300"
                        key={additionalOrder._id}
                    >
                        <p className="font-semibold">{additionalOrder.quantity}x</p>
                        <h6 className="font-medium md:font-bold text-center leading-5">
                            {additionalOrder.name.length > 22 ? `${additionalOrder.name.slice(0, 20)}...` : additionalOrder.name}
                        </h6>
                        <p className="font-semibold whitespace-nowrap">
                            {additionalOrder.price * additionalOrder.quantity}грн
                        </p>
                    </div>
                ))}
            </div>
        </div>
        <div>
            <div className="flex justify-between mb-2">
                <h5 className="text-gray-400 text-base">Вартість</h5>
                <p className="text-black text-base md:text-lg font-bold">{order?.totalPrice} грн.</p>
            </div>
            <div className="flex justify-center">
                {order?.payStatus === "Не оплачено" && order.paymentMethod === "card" ? (
                    <button className="px-3 py-2 rounded-lg bg-green-400 text-white hover:bg-green-500 transition"
                        onClick={() => payTheOrder(order)}
                    >
                        Сплатити
                    </button>
                ) : (
                    <p className="text-green-400 text-lg h-10">
                        {order.payStatus === "Не оплачено"
                            ? "Оплата при отримані"
                            : "Оплачено"
                        }
                    </p>
                )}
            </div>
        </div>
    </div>
}

export default UserOrderCard