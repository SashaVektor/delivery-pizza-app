import { FC } from 'react'

interface OrderInfoProps {
    text: string
    info: string | undefined | null
}

const OrderInfo: FC<OrderInfoProps> = ({ text, info }) => {
    return <div className="flex flex-col sm:flex-row gap-0 sm:gap-2 items-center">
        <p className="font-bold text-center sm:text-left">{text}</p>
        <p className="text-center sm:text-left">{info}</p>
    </div>
}

export default OrderInfo