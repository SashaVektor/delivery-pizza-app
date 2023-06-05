import { FC, useState } from 'react'
import { AdditionalProduct } from '../types/typings'
import { RootState, useAppSelector } from '../store/store'
import Modal from './Modal'
import AdditionalProductModal from './AdditionalProductModal'

interface AdditionalProductCardProps {
  item: AdditionalProduct
  isOrderPage?: boolean
}

const AdditionalProductCard: FC<AdditionalProductCardProps> = ({ item, isOrderPage }) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const additionalProducts = useAppSelector((state: RootState) => state.basket.additionadItems)
  const currentItem = additionalProducts.find((product: AdditionalProduct) => product._id === item._id)


  return (
    <>
      {!isOrderPage && <Modal
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        title={item.name}
      >
        <AdditionalProductModal
          item={item}
          currentItem={currentItem}
          setModalIsOpen={setModalIsOpen}
        />
      </Modal>}
      <div className={`bg-white border ${currentItem ? "border-yellow" : "border-gray-300"} 
  shadow-md px-6 py-4 flex flex-col items-center rounded-xl w-[115px] 
  h-[175px] cursor-pointer relative`}
        onClick={() => {
          if(!isOrderPage) {
            setModalIsOpen(true)
          }
        }}
      >
        <p className='absolute top-1 left-3 text-gray-400'>{item.quantity}x</p>
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
    </>
  )
}

export default AdditionalProductCard 