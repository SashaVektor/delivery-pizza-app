import { FC } from 'react'

interface InfoCardProps {
    bgColor: string
    textColor: string
    mainText: string
    quanity: number
}

const InfoCard: FC<InfoCardProps> = ({ bgColor, textColor, mainText, quanity }) => {
    return <div className={`rounded-lg px-5 py-3 ${bgColor} w-[200px] shadow-md flex flex-col justify-between hover:scale-105 transition duration-200`}>
        <div>
            <p className={`${textColor} text-xl font-medium leading-5 mb-3`}>
                {mainText}
            </p>
        </div>
        <div className='flex justify-between items-center'>
            <p className={`text-lg ${textColor}`}>
                Кількість:
            </p>
            <p className={`text-xl font-bold ${textColor}`}>
                {quanity}
            </p>
        </div>
    </div>
}

export default InfoCard