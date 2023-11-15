import { FC, ReactNode } from 'react'

interface DeliveryInfoCardProps {
    icon: ReactNode
    text: string
}

const DeliveryInfoCard: FC<DeliveryInfoCardProps> = ({ icon, text }) => {
    return <div className='bg-white rounded-md px-6 py-10 relative w-64 h-[128px] hover:scale-105 transition cursor-pointer'>
        <div className='absolute -top-10 left-[50%] translate-x-[-50%] w-[77px] h-[77px] flex items-center justify-center rounded-full bg-white'>
            {icon}
        </div>
        <p className='text-black text-md text-center'>
            {text}
        </p>
    </div>
}

export default DeliveryInfoCard