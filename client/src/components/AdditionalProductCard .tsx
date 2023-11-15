import { FC } from 'react'
import { AdditionalProduct } from '../types/typings'
import { RootState, useAppDispatch, useAppSelector } from '../store/store'
import { setIsAdditionalProductModalOpen } from '../store/slices/modalSlice'
import { setAdditionalProduct } from '../store/slices/productSlice'

interface AdditionalProductCardProps {
  item: AdditionalProduct
  isOrderPage?: boolean
}

const AdditionalProductCard: FC<AdditionalProductCardProps> = ({ item, isOrderPage }) => {
  const additionalProducts = useAppSelector((state: RootState) => state.basket.additionadItems)
  const currentItem = additionalProducts.find((product: AdditionalProduct) => product._id === item._id)
  const dispatch = useAppDispatch();

  return (
    <div className={`bg-white border ${currentItem ? "border-yellow" : "border-gray-300"} 
  shadow-md px-6 py-4 flex flex-col items-center rounded-xl w-[115px] 
  h-[175px] cursor-pointer relative hover:scale-[102%] transition`}
      onClick={() => {
        if (!isOrderPage) {
          dispatch(setIsAdditionalProductModalOpen())
          dispatch(setAdditionalProduct(item))
        }
      }}
    >
      <p className='absolute top-1 left-3 text-gray-400'>
        {!isOrderPage ? (currentItem?.quantity ? `${currentItem.quantity}x` : null) : `${item.quantity}x`}
      </p>
      <div className='flex-1'>
        <div className='w-[64px] h-[64px] mx-auto'>
          <img src={item.image} alt={item.name}
            className='w-full h-full object-contain'
          />
        </div>
        <h6 className='font-bold text-sm text-black text-center leading-4'>
          {item.name}
        </h6>
      </div>
      <p className={`text-xs text-red-400 text-bold`}>
        {item.price * item.quantity} грн
      </p>
    </div>
  )
}

export default AdditionalProductCard 