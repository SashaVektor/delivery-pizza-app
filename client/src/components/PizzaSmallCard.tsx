import { FC } from 'react'
import { PizzaItem } from '../types/typings'


interface PizzaSmallCardProps {
    pizza: PizzaItem
}

const PizzaSmallCard: FC<PizzaSmallCardProps> = ({ pizza }) => {

    return <div className='px-5 flex items-center gap-5 shadow-lg rounded-md w-72 bg-white'>
        <div className='w-20 h-20'>
            <img src={pizza.image} alt={pizza.name}
                className='w-full h-full object-contain'
            />
        </div>
        <div>
            <h5 className='text-md font-bold text-black'>{pizza.name}</h5>
            <p className='text-sm text-yellow'>от {pizza.price} грн.</p>
        </div>
    </div>
}

export default PizzaSmallCard