import { FC } from 'react'
import { UserOrder, statusType } from '../../types/typings'
import { Link } from 'react-router-dom'
import { translateOrderStatus } from '../../utils'
import moment from 'moment-timezone'

interface OrderCardProps {
    order: UserOrder
    index: number
}

const OrderCard: FC<OrderCardProps> = ({ order, index }) => {
    const date = moment.utc(order?.createdAt).tz('Europe/Kiev').format('YYYY-MM-DD HH:mm:ss');

    const getOrderStatus = (status: statusType) => {
        if(status === "received") {
            return "text-orange-400"
        } else if(status === "accepted") {
            return "text-red-500"
        } else if(status === "delivered") {
            return "text-green-400"
        } else {
            return "text-gray-400"
        }
    }

    return <Link to={`/admin/order-details/${order._id}`} 
    className={`${order.payStatus === "Оплачено" && "bg-green-100"}
    block lg:flex items-center p-2 border border-gray-400 rounded-md`}>
        <p className='font-bold basis-1/12'>
            {index + 1}
        </p>
        <p className='basis-4/12'>
            {date}
        </p>
        <p className='basis-4/12'>
            {order._id}
        </p>
        <p className='basis-2/12'>
            {order.totalPrice} грн.
        </p>
        <p className={`${getOrderStatus(order.status ? order.status : "all")} text-black basis-1/12 font-bold`}>
            {translateOrderStatus(order.status ? order.status : "all")}
        </p>
    </Link>
}

export default OrderCard