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

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })

        const updateOrder = async () => {
            try {
                await updateOrderPayment("Оплачено", paidOrder._id, user?.token ? user?.token : "")
                setTimeout(() => {
                    dispatch(removePaidOrder())
                    toast.success("Замовлення успішно оплачено")
                }, 5000)
            } catch (err) {
                toast.error("Щось пішло не так!")
            }
        }

        updateOrder();

    }, [dispatch, navigate, paidOrder, user])
    return (
        <div className='flex flex-col gap-2 items-center justify-center h-[100dvh] w-full'>
            <h2 className='text-xl md:text-2xl lg:text-3xl text-center text-green-400'>
                {paidOrder?.userInfo.name}, вітаємо, оплата пройшла успішно!
            </h2>
            <p className='text-lg md:text-xl lg:text-2xl text-center text-green-400'>
                Ваше замовлення незабаром буде готове і доставлене до вас за адресою!
            </p>
            <Button
                bgColor="bg-yellow"
                text="До кабінету"
                textColor="text-white"
                onClick={() => {
                    navigate("/userpage")
                    dispatch(removePaidOrder())
                }}
                className="hover:bg-yellow/75"
            />
        </div>
    )
}

export default SuccessPaymentPage
