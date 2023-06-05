import { useState } from "react"
import Input from "../components/Input"
import { RootState, useAppDispatch, useAppSelector } from "../store/store"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom"
import Steps from "../components/Steps"
import { CurrentOrder } from "../types/typings"
import { createOrder } from "../store/slices/orderSlice"
import { removeAllItems } from "../store/slices/basketSlice"
import { toast } from "react-hot-toast"
const OrderPage = () => {
    const currentOrder = useAppSelector((state: RootState) => state.order.currentOrder)
    const user = useAppSelector((state: RootState) => state.auth.googleUser)
    const [userName, setUserName] = useState<string>(currentOrder?.userInfo?.name ? currentOrder?.userInfo?.name : "")
    const [phoneNumber, setPhoneNumber] = useState<string>("")
    const [userEmail, setUserEmail] = useState<string>(currentOrder?.userInfo?.email ? currentOrder?.userInfo?.email : "")
    const [address, setAddress] = useState<string>(currentOrder?.userAddress ? currentOrder?.userAddress : "")
    const [payMethod, setPayMethod] = useState<"cash" | "card">("cash")
    const [change, setChange] = useState<string>("")

    const navigate = useNavigate()
    const dispatch = useAppDispatch();


    let totalPrice: number;

    if(payMethod === "card") {
        totalPrice = currentOrder?.totalPrice ? currentOrder.totalPrice : 0
    } else {
        totalPrice = currentOrder?.totalPrice ? currentOrder.totalPrice + 45 : 0
    }



    const validOrder = userName && phoneNumber && address && payMethod && userEmail
        && currentOrder?.mainOrder && (payMethod === "cash" ? change : true)

    const validChange = payMethod === "cash"
        ? Number(change) > (currentOrder?.totalPrice ? currentOrder?.totalPrice : 0)
        : true


    const createUserOrder = async () => {
        try {
            const newOrder: CurrentOrder = {
                userInfo: {
                    name: userName,
                    phone: phoneNumber,
                    email: userEmail,
                },
                comments: currentOrder?.comments || "",
                additionalOrder: currentOrder?.additionalOrder || [],
                mainOrder: currentOrder?.mainOrder || [],
                paymentMethod: payMethod,
                payStatus: "Не оплачено",
                totalPrice,
                userAddress: currentOrder?.userAddress || "",
                change: change || "",
                status: "received",
            };

            await dispatch(createOrder(newOrder));
            dispatch(removeAllItems());
            toast.success("Ваш ордер успішно створено!");
            navigate("/checkout-success");
        } catch (err) {
            toast.error("Что то пошло не так!")
        }
    }

    return (
        <>
            <h4 className="text-green-400 text-xl md:text-2xl lg:text-3xl text-center pt-[130px]">
                При оплате картой доставка бесплатная!
            </h4>
            <p className="text-green-400 text-base md:text-lg lg:text-xl text-center mb-5 md:mb-10">
                Оплата картой осуществляеться в долларах по курсу 38 гривен
            </p>
            <div className="max-w-7xl mx-auto px-4 pb-4 flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-10">
                <div className="max-w-2xl w-full">
                    <div className="flex flex-col xl:flex-row justify-between gap-5 items-center mb-8">
                        <h3 className="text-xl md:text-2xl lg:text-3xl text-yellow font-bold">
                            Заказ на доставку
                        </h3>
                        <Steps
                            active={2}
                        />
                    </div>
                    <div className="flex flex-col gap-4 ">
                        <div className="flex items-center justify-between gap-2">
                            <h6 className="text-lg text-gray-500 hidden md:block">
                                Имя
                            </h6>
                            <Input
                                placeholder="Ваше имя"
                                input={userName}
                                setInput={setUserName}
                                type="text"
                                className={`w-full max-w-lg ${userName ? "bg-gray-300" : ""}`}
                            />
                        </div>
                        <div className="flex items-center justify-between gap-2">
                            <h6 className="text-lg text-gray-500 hidden md:block">
                                Почта
                            </h6>
                            <Input
                                placeholder="Ваша почта"
                                input={userEmail}
                                setInput={setUserEmail}
                                type="text"
                                className={`w-full max-w-lg ${userEmail ? "bg-gray-300" : ""}`}
                            />
                        </div>
                        <div className="flex items-center justify-between gap-2">
                            <h6 className="text-lg text-gray-500 hidden md:block">
                                Номер телефона
                            </h6>
                            <Input
                                placeholder="Номер телефона"
                                input={phoneNumber}
                                setInput={setPhoneNumber}
                                type="text"
                                className={`w-full max-w-lg ${phoneNumber ? "bg-gray-300" : ""}`}
                            />
                        </div>
                        <div className="flex items-center justify-between gap-2">
                            <h6 className="text-lg  text-gray-500 hidden md:block">
                                Ваш Адресс
                            </h6>
                            <Input
                                placeholder="Ваш Адресс"
                                input={address}
                                setInput={setAddress}
                                type="text"
                                className={`w-full max-w-lg ${address ? "bg-gray-300" : ""}`}
                            />
                        </div>
                        <div className="flex justify-between gap-2">
                            <h6 className="text-lg text-gray-500">
                                Время доставки
                            </h6>
                            <p className="text-black text-lg">40-45мин.</p>
                        </div>
                        {!validOrder && <p className="text-red-500 text-base font-bold text-center">
                            Заполните все поля*
                        </p>}
                        <div className="w-full bg-gray-200 py-4 px-4 md:py-10 md:px-8 rounded-lg">
                            {!user && <p className="text-red-700 text-base sm:text-lg leading-4">
                                Так как вы не вошли в свой аккаунт, то для вас доступена оплата только наличными при получении!
                            </p>}
                            <h4 className="text-red-500 font-bold text-lg md:text-xl lg:text-2xl mb-4 md:mb-8">
                                Способы оплаты
                            </h4>
                            <div className="flex gap-10 items-center mb-5">
                                <Button
                                    bgColor={payMethod === "card" ? "bg-gray-400" : "bg-red-500"}
                                    text="Наличные"
                                    textColor="text-black"
                                    onClick={() => setPayMethod("cash")}

                                />
                                {user && <Button
                                    bgColor={payMethod === "cash" ? "bg-gray-400" : "bg-red-500"}
                                    text="Карта"
                                    textColor="text-black"
                                    onClick={() => setPayMethod("card")}
                                />}
                            </div>
                            {payMethod === "cash" && (<div className="flex flex-col xl:flex-row xl:items-center gap-2 md:gap-6">
                                <p className="text-base text-gray-500">
                                    С какой суммы подготовить сдачу?
                                </p>
                                <Input
                                    placeholder="Сумма"
                                    type="text"
                                    input={change}
                                    setInput={setChange}
                                />
                                {!validChange && <p className="text-red-500 text-base">
                                    Сумма должна быть больше итогового заказа!
                                </p>}
                            </div>)
                            }
                            {payMethod === "card" && <p className="text-green-400 text-base">
                                Чтоб оплатить заказ картой, после оформление перейдите во вкладку "Мой профиль" и оплатите заказ
                            </p>}
                        </div>
                        <div className="flex items-center justify-between">
                            <button onClick={() => navigate("/basket")} className="text-gray-500 text-base md:text-lg font-semibold">
                                Назад в корзину
                            </button>
                            <Button
                                bgColor="bg-yellow"
                                text="Оформить заказ"
                                textColor="text-black"
                                onClick={createUserOrder}
                                disabled={!validOrder || !validChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="bg-white w-[290px] sm:min-w-[360px] p-7 shadow-md rounded-lg max-h-[550px]">
                    <h4 className="text-yellow text-lg text-bold mb-6">
                        Состав заказа
                    </h4>
                    <div className="flex flex-col gap-5 mb-16 overflow-x-auto max-h-72 scrollbar-w-2 scrollbar-track-yellow-lighter scrollbar-thumb-yellow scrollbar-thumb-rounded pr-4">
                        {currentOrder?.mainOrder.map((item) => (
                            <div className="flex items-center justify-between gap-2 pb-2 border-b border-gray-300" key={item._id}>
                                <p className="text-base sm:text-lg font-bold text-gray-500 whitespace-nowrap">{item.quantity} x</p>
                                <div className="max-w-[220px]">
                                    <h6 className="text-black text-sm font-bold text-center">
                                        {item.name}
                                    </h6>
                                </div>
                                <p className="text-black text-base font-bold leading-4 text-right">
                                    {item.price * item.quantity} грн
                                </p>
                            </div>
                        ))}
                        {currentOrder?.additionalOrder.map((item) => (
                            <div className="flex items-center justify-between gap-2 pb-2 border-b border-gray-300" key={item._id}>
                                <p className="text-base sm:text-lg font-bold text-gray-500 whitespace-nowrap">{item.quantity} x</p>
                                <div className="max-w-[220px]">
                                    <h6 className="text-black text-sm font-bold text-center">
                                        {item.name}
                                    </h6>
                                </div>
                                <p className="text-black text-base font-bold leading-4 text-right">
                                    {item.price * item.quantity} грн
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between">
                        <h5 className="text-gray-400 text-base">Сумма заказа</h5>
                        <p className="text-black text-lg font-bold">{currentOrder?.totalPrice} грн.</p>
                    </div>
                    <div className="flex justify-between">
                        <h5 className="text-gray-400 text-base">Доставка</h5>
                        <p className="text-black text-lg font-bold">
                            {payMethod === "card" ? "0 грн.": "45 грн."}
                        </p>
                    </div>
                    <div className="flex justify-between">
                        <h5 className="text-gray-400 text-base">Итоговая сумма</h5>
                        <p className="text-black text-lg font-bold">{totalPrice} грн.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderPage
