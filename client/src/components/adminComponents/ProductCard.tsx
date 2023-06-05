import { FC } from 'react'
import { BasketItems } from '../../types/typings'

interface ProductCardProps {
    product: BasketItems
    index: number
}

const ProductCard: FC<ProductCardProps> = ({ product, index }) => {
    return <div className='flex flex-col lg:flex-row lg:items-center p-3 border border-yellow rounded-lg justify-between gap-0 lg:gap-2'>
        <div className='flex items-center gap-3 lg:gap-10 lg:basis-3/12'>
            <p className='font-bold text-lg hidden lg:block'>
                {index + 1}
            </p>
            <div className='flex items-center flex-row-reverse gap-3 lg:block'>
                <p className='font-bold'>{product.name}</p>
                <div className='w-[70px] h-[70px]'>
                    <img src={product.image} alt={product.name}
                        className='w-full h-full object-contain'
                    />
                </div>
            </div>
        </div>
        <div className='lg:basis-7/12'>
            <p>{product.descr}</p>
            <p>{product.info}</p>
            <p>Добавки : {product.additiveItemsInfo ? product.additiveItemsInfo : "без добавок"}</p>
        </div>
        <div className='flex gap-3 mt-2 lg:basis-2/12 lg:mt-0'>
        <p className='font-bold'>{product.price * product.quantity} грн</p>
        <p>Кол: {product.quantity}</p>
        </div>
    </div>
}

export default ProductCard