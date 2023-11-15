import { FC } from 'react'
import { UserOrder, statusType } from '../../types/typings'
import { Link } from 'react-router-dom'
import moment from 'moment-timezone'

interface OrderCardProps {
    order: UserOrder
    index: number
}

const OrderCard: FC<OrderCardProps> = ({ order, index }) => {
    const date = moment.utc(order?.createdAt).tz('Europe/Kiev').format('YYYY-MM-DD HH:mm:ss');

    const getOrderStatus = (status: statusType) => {
        if(status === "Отримано") {
            return "text-orange-400"
        } else if(status === "Прийнято") {
            return "text-red-500"
        } else if(status === "Доставлено") {
            return "text-green-400"
        } else {
            return "text-gray-400"
        }
    }

    const mainOrder = order.mainOrder.reduce((acc, sum) => acc + sum.quantity, 0)
    const additionalOrder = order.additionalOrder.reduce((acc, sum) => acc + sum.quantity, 0)

    return <Link to={`/admin/order-details/${order._id}`} 
    className={`${order.payStatus === "Оплачено" && "bg-green-100"}
    block lg:flex items-center p-2 border border-gray-400 rounded-md hover:bg-gray-100 transition font-semibold`}>
        <p className='font-bold basis-1/12'>
            {index + 1}
        </p>
        <p className='basis-4/12'>
            {date}
        </p>
        <p className='basis-3/12'>
            Товари: {mainOrder + additionalOrder} шт.
        </p>
        <p className='basis-2/12'>
            {order.totalPrice} грн.
        </p>
        <p className={`${getOrderStatus(order.status ? order.status : "all")} text-black basis-2/12 lg:text-right`}>
            {order.status}
        </p>
    </Link>
}

export default OrderCard