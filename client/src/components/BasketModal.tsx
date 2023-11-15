import { IoIosArrowBack } from "react-icons/io";
import { onClose } from "../store/slices/modalSlice";
import { RootState, useAppDispatch, useAppSelector } from "../store/store"
import { useNavigate } from "react-router-dom";
import { removeAllItems, selectTotalPrice } from "../store/slices/basketSlice";
import Button from "./Button";
import toast from "react-hot-toast";
import BasketCard from "./BasketCard";

const BasketModal = () => {
    const items = useAppSelector((state: RootState) => state.basket.basketItems)
    const isVisible = useAppSelector((state: RootState) => state.modal.isBasketModalOpen)
    const totalPrice = useAppSelector(selectTotalPrice)

    const totalQuanity = items.reduce((acc, item) => acc + item.quantity, 0)

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
            dispatch(onClose())
        }
    };

    return (
        <div
            onClick={handleModalClick}
            className={`${isVisible ? "right-0" : "-right-[150%]"} h-[100dvh] duration-300 fixed top-0 w-[100dvw] flex justify-end bg-black/50 z-[45] overflow-y-auto overflow-x-hidden`}
        >
            <div className='flex flex-col bg-white pt-2 sm:pt-4 relative max-w-[90dvw] sm:max-w-2xl h-[100dvh] overflow-y-auto overflow-x-hidden scrollbar-w-2 scrollbar-track-yellow-lighter scrollbar-thumb-yellow scrollbar-thumb-rounded'>
                <div className="flex px-4 sm:px-6 items-center justify-between gap-6 sm:gap-10 mb-3">
                    <h2 className="text-2xl font-semibold text-primary text-yellow">
                        Ваш кошик
                    </h2>
                    <button className="hover:scale-125 transition duration-200"
                        onClick={() => dispatch(onClose())}
                    >
                        <IoIosArrowBack size={26} className="text-primary" />
                    </button>
                </div>
                <div className="flex-1 flex flex-col pl-2 sm:pl-2 sm:px-6 pr-0 sm:pr-0">
                    {items?.length === 0 ? (
                        <div className='flex flex-col items-center mt-10 px-8'>
                            <div className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] mb-10">
                                <img
                                    src="https://res.cloudinary.com/dxvrhfhtl/image/upload/v1699882452/mtymtocpzaijmsebmfpq.jpg"
                                    alt="empty basket"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <h2 className='text-yellow text-xl md:text-2xl text-bold text-center mb-2'>
                                Ваш кошик порожній!
                            </h2>
                            <Button
                                bgColor='bg-yellow'
                                text='На головну'
                                textColor='text-white'
                                height='30px'
                                width='200px'
                                onClick={() => dispatch(onClose())}
                                className='hover:bg-yellow/80 duration-300 transition'
                            />
                        </div>

                    ) : (
                        <div className="flex flex-col flex-1">
                            <div className="flex-1">
                                <div className='flex flex-col gap-4 overflow-y-auto overflow-x-hidden max-h-[65dvh] scrollbar-w-2 scrollbar-track-yellow-lighter scrollbar-thumb-yellow scrollbar-thumb-rounded'>
                                    {items?.map((item) => (
                                        <BasketCard
                                            key={item._id}
                                            item={item}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="pb-5 px-3">
                                <Button
                                    bgColor='bg-sky-400'
                                    text='Очистити кошик'
                                    textColor='text-white'
                                    onClick={() => {
                                        dispatch(removeAllItems())
                                        toast.error("Кошик очищено")
                                    }}
                                    className='ml-auto hover:bg-sky-500 mb-2'
                                />
                                <div className='flex justify-between items-center'>
                                    <h6 className='text-black text-base sm:text-lg font-semibold'>
                                        Кількість товарів
                                    </h6>
                                    <p className='text-lg sm:text-xl text-black font-bold'>
                                        {totalQuanity}
                                    </p>
                                </div>
                                <div className='flex justify-between items-center mb-4'>
                                    <h6 className='text-black text-base sm:text-lg font-semibold'>
                                        Вартість замовлення
                                    </h6>
                                    <p className='text-lg sm:text-xl text-black font-bold'>
                                        {totalPrice} грн.
                                    </p>
                                </div>
                                <Button
                                    onClick={() => {
                                        navigate("/basket")
                                        dispatch(onClose())
                                    }}
                                    bgColor='bg-yellow'
                                    text='Оформити замовлення'
                                    textColor='text-white'
                                    width='300px'
                                    height='40px'
                                    className='mx-auto hover:bg-yellow/80 duration-300 transition'
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default BasketModal
