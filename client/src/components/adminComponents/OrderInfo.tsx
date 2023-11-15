import { FC } from 'react'

interface OrderInfoProps {
    text: string
    info: string | undefined | null
}

const OrderInfo: FC<OrderInfoProps> = ({ text, info }) => {
    return <div className="flex flex-col">
        <p className="font-bold text-base md:text-lg leading-4 md:leading-5">{text}</p>
        <p className="text-base md:text-lg leading-4 md:leading-5">{info}</p>
    </div>
}

export default OrderInfo