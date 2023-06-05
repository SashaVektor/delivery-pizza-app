import { useNavigate } from "react-router-dom"
import { RootState, useAppDispatch, useAppSelector } from "../store/store"
import { useEffect } from "react"
import { updateOrderPayment } from "../utils"
import { toast } from "react-hot-toast"
import { removePaidOrder } from "../store/slices/orderSlice"
import Button from "../components/Button"


const SuccessPaymentPage = () => {
    const paidOrder = useAppSelector((state: RootState) => state.order.paidOrder)
    const user = useAppSelector((state: RootState) => state.auth.googleUser)
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!paidOrder || !user) {
            navigate("/")
            return
        }
        const updateOrder = async () => {
            try {
                await updateOrderPayment("Оплачено", paidOrder._id, user?.token ? user?.token : "")
                setTimeout(() => {
                    dispatch(removePaidOrder())
                    toast.success("Заказ успешно оплачен")
                }, 5000)
            } catch (err) {
                toast.error("Что то пошло не так!")
            }
        }

        updateOrder();

    }, [dispatch, navigate, paidOrder, user])
    return (
        <div className='flex flex-col gap-2 items-center justify-center h-screen w-full'>
            <h2 className='text-xl md:text-2xl lg:text-3xl text-center text-green-400'>
                {paidOrder?.userInfo.name}, поздавляем, оплата прошла успешно!
            </h2>
            <p className='text-lg md:text-xl lg:text-2xl text-center text-green-400'>
                Ваш заказ в скоре будет готов и доставлен к вам по адрессу
            </p>
            <Button
                bgColor="bg-yellow"
                text="Домой"
                textColor="text-white"
                onClick={() => {
                    navigate("/userpage")
                    dispatch(removePaidOrder())
                    toast.success("Заказ успешно оплачен")
                }}
            />
        </div>
    )
}

export default SuccessPaymentPage
