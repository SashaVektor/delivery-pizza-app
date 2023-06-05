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
}

const UserOrderCard: FC<UserOrderCardProps> = ({ order }) => {
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
                toast.error("Ошибка в оплате");
            } else {
                await updateOrderPayment("Оплачено", order._id, user?.token ? user.token : "");
                toast.success('Оплата успішна');
            }

        } catch (error) {
            toast.error("Что то пошло не так!")
        }
    }

    return <div className="flex flex-col justify-between bg-white p-5 rounded-lg shadow" key={order._id}>
        <div>
            <h4 className="text-yellow text-lg md:text-xl mb-5">
                Заказ № ${order._id}
            </h4>
            <div className="flex flex-col gap-5 overflow-x-auto max-h-72 scrollbar-w-2 scrollbar-track-yellow-lighter scrollbar-thumb-yellow scrollbar-thumb-rounded pr-4 mb-5">
                {order.mainOrder.map((mainOrder) => (
                    <div className="flex items-center justify-between gap-2 sm:gap-4 pb-2 border-b border-gray-300" key={mainOrder._id}>
                        <p className="text-md sm:text-xl font-bold text-gray-500">{mainOrder.quantity} x</p>
                        <div className="max-w-[220px]">
                            <h6 className="text-black text-base font-bold">
                                {mainOrder.name}
                            </h6>
                        </div>
                        <p className="text-black text-base md:text-lg font-bold">
                            {mainOrder.price * mainOrder.quantity} грн
                        </p>
                    </div>
                ))}
                {order.additionalOrder.map((additionalOrder) => (
                    <div className="flex items-center justify-between gap-2 sm:gap-4 pb-2 border-b border-gray-300" key={additionalOrder._id}>
                        <p className="text-md sm:text-xl font-bold text-gray-500">{additionalOrder.quantity} x</p>
                        <div className="max-w-[220px]">
                            <h6 className="text-black text-base font-bold">
                                {additionalOrder.name}
                            </h6>
                        </div>
                        <p className="text-black text-base md:text-lg font-bold">
                            {additionalOrder.price * additionalOrder.quantity} грн
                        </p>
                    </div>
                ))}
            </div>
        </div>
        <div>
            <div className="flex justify-between mb-2">
                <h5 className="text-gray-400 text-base">Сумма заказа</h5>
                <p className="text-black text-base md:text-lg font-bold">{order?.totalPrice} грн.</p>
            </div>
            <div className="flex justify-center">
                {order?.payStatus === "Не оплачено" && order.paymentMethod === "card" ? (
                    <button className="px-3 py-2 rounded-lg bg-green-400 text-white"
                        onClick={() => payTheOrder(order)}
                    >
                        Оплатить
                    </button>
                ) : (
                    <p className="text-green-400 text-lg">
                        {order.payStatus === "Не оплачено"
                            ? "Оплата при получении"
                            : "Оплачено"
                        }
                    </p>
                )}
            </div>
        </div>
    </div>
}

export default UserOrderCard