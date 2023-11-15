import { FC } from 'react'
import { BasketItems } from '../../types/typings'

interface ProductCardProps {
    product: BasketItems
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
    return <div className='w-full flex flex-col items-center p-3 pl-4 pt-5 border border-yellow rounded-lg gap-2 md:gap-3 relative'>
        <div className='flex items-center gap-1 md:gap-2 text-center'>
            <p className='text-sm font-semibold md:text-base md:font-bold absolute top-0 left-1'>{product.quantity}x</p>
            <p className='text-sm font-semibold leading-4 md:text-base md:leading-5 md:font-bold'>{product.name}</p>
        </div>
        <div className='text-sm md:text-base text-center'>
            <p>{product.info}</p>
            <p>Добавки : {product.additiveItemsInfo?.length ? product.additiveItemsInfo.replace(",", ", ") : "без додатків"}</p>
        </div>
        <div className='flex gap-2 md:gap-5 items-center'>
            <p className='font-semibold md:font-bold'>{product.price * product.quantity}грн</p>
        </div>
    </div>
}

export default ProductCard