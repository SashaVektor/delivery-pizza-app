import { useEffect, useState } from "react"
import Input from "../components/Input"
import { RootState, useAppDispatch, useAppSelector } from "../store/store"
import Button from "../components/Button"
import { Link, useNavigate } from "react-router-dom"
import Steps from "../components/Steps"
import { CurrentOrder } from "../types/typings"
import { removeAllItems } from "../store/slices/basketSlice"
import { toast } from "react-hot-toast"
import { createOrder } from "../utils"
import { FaSpinner } from "react-icons/fa"
import { useGetUserOrdersQuery } from "../store/services/products"

const OrderPage = () => {
    const currentOrder = useAppSelector((state: RootState) => state.order.currentOrder)
    const user = useAppSelector((state: RootState) => state.auth.googleUser)
    const [userName, setUserName] = useState<string>(currentOrder?.userInfo?.name ? currentOrder?.userInfo?.name : "")
    const [phoneNumber, setPhoneNumber] = useState<string>("")
    const [userEmail, setUserEmail] = useState<string>(currentOrder?.userInfo?.email ? currentOrder?.userInfo?.email : "")
    const [address, setAddress] = useState<string>(currentOrder?.userAddress ? currentOrder?.userAddress : "")
    const [payMethod, setPayMethod] = useState<"cash" | "card">("cash")
    const [change, setChange] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { refetch } = useGetUserOrdersQuery(user?._id ? user._id : "")

    const navigate = useNavigate()
    const dispatch = useAppDispatch();


    let totalPrice: number;

    if (payMethod === "card") {
        totalPrice = currentOrder?.totalPrice ? currentOrder.totalPrice : 0
    } else {
        totalPrice = currentOrder?.totalPrice ? currentOrder.totalPrice + 45 : 0
    }



    const validOrder = userName && phoneNumber && address && payMethod && userEmail
        && currentOrder?.mainOrder && (payMethod === "cash" ? change : true)

    const validChange = payMethod === "cash"
        ? Number(change) >= (currentOrder?.totalPrice ? currentOrder.totalPrice + 45 : 0)
        : true


    const createUserOrder = async () => {
        const newOrder: CurrentOrder = {
            userInfo: {
                name: userName,
                phone: phoneNumber,
                email: userEmail,
            },
            userId: user?._id ? user._id : null,
            comments: currentOrder?.comments || "",
            additionalOrder: currentOrder?.additionalOrder || [],
            mainOrder: currentOrder?.mainOrder || [],
            paymentMethod: payMethod,
            payStatus: "Не оплачено",
            totalPrice,
            userAddress: currentOrder?.userAddress || "",
            change: change || "",
            status: "Отримано",
        };

        try {
            setIsLoading(true)
            const res = await createOrder(newOrder);
            if (res?.message === "Замовлення успішно створено!") {
                dispatch(removeAllItems());
                toast.success("Ваш ордер успішно створено!");
                navigate("/checkout-success");
                refetch();
            } else {
                toast.error("Щось пішло не так!")
            }
        } catch (err) {
            toast.error("Щось пішло не так!")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [])

    return (
        <div className="mx-auto w-full max-w-7xl px-2 sm:px-4 pt-[65px] sm:pt-[90px] pb-5">
            <h4 className="text-green-400 text-xl md:text-2xl lg:text-3xl mb-4 md:mb-8">
                При оплаті карткою ви отримаєте безкоштовну доставку!
            </h4>
            <div className="flex flex-col-reverse md:flex-row items-center md:items-start gap-5 md:gap-10">
                <div className="max-w-3xl w-full">
                    <div className="flex flex-col xl:flex-row justify-between gap-5 mb-3 lg:mb-6">
                        <h3 className="text-2xl lg:text-3xl text-yellow font-bold">
                            Створення замовлення
                        </h3>
                        <div className="hidden xl:block">
                            <Steps
                                active={2}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <h6 className="text-base md:text-lg">
                                Ваше ім'я
                            </h6>
                            <Input
                                placeholder="Введіть ваще ім'я"
                                input={userName}
                                setInput={setUserName}
                                type="text"
                                className={`w-full ${userName ? "bg-gray-50" : ""}`}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h6 className="text-base md:text-lg">
                                Ваша пошта
                            </h6>
                            <Input
                                placeholder="Введіть вашу пошту"
                                input={userEmail}
                                setInput={setUserEmail}
                                type="text"
                                className={`w-full ${userEmail ? "bg-gray-50" : ""}`}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h6 className="text-base md:text-lg">
                                Номер телефону
                            </h6>
                            <Input
                                placeholder="Введіть ваш номер телефону"
                                input={phoneNumber}
                                setInput={setPhoneNumber}
                                type="text"
                                className={`w-full ${phoneNumber ? "bg-gray-50" : ""}`}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h6 className="text-base md:text-lg">
                                Ваш адреса
                            </h6>
                            <Input
                                placeholder="Введіть вашу адресу"
                                input={address}
                                setInput={setAddress}
                                type="text"
                                className={`w-full ${address ? "bg-gray-50" : ""}`}
                            />
                        </div>
                        <h6 className="text-base md:text-lg">
                            Час доставки - <span className="font-semibold">40-45хв.</span>
                        </h6>
                        <div className="w-full px-3 py-2 md:py-4 md:px-6 rounded-lg border border-gray-300">
                            {!user && <p className="text-red-500 text-base leading-5 sm:text-lg sm:leading-6">
                                Ви не можете використати оплату карткою через те, що ви не ввійшли до свого кабінету!
                            </p>}
                            <h4 className="text-yellow font-bold text-lg md:text-xl lg:text-2xl mb-2 md:mb-4">
                                Способи оплати замовлення
                            </h4>
                            <div className="flex gap-3 items-center mb-4">
                                <Button
                                    bgColor={payMethod === "card" ? "bg-gray-200" : "bg-yellow"}
                                    text="Готівкою"
                                    textColor="text-black"
                                    onClick={() => setPayMethod("cash")}
                                    className="hover:bg-yellow"

                                />
                                {user && <Button
                                    bgColor={payMethod === "cash" ? "bg-gray-200" : "bg-yellow"}
                                    text="Картка"
                                    textColor="text-black"
                                    onClick={() => setPayMethod("card")}
                                    className="hover:bg-yellow"
                                />}
                            </div>
                            {payMethod === "cash" && (<div className="flex flex-col gap-2">
                                <p className=" text-gray-500">
                                    З якої суми бажаєте отримати решту <span className="text-black">
                                        (число повинно бути не менше ніж вартість замовлення)
                                    </span>?
                                </p>
                                <Input
                                    placeholder="Сума"
                                    type="text"
                                    input={change}
                                    setInput={setChange}
                                    className="w-1/2"
                                />
                            </div>)
                            }
                            {payMethod === "card" && <p className="text-green-400">
                                Щоб оплатити замовлення картою, після оформлення перейдіть у вкладку "Мій профіль" і оплатіть замовлення.
                            </p>}
                        </div>
                        {!isLoading ? <div className="flex items-center justify-between">
                            <Link to="/basket" className="text-gray-400 text-base md:text-lg block px-2 py-1 rounded-md hover:bg-gray-50 transition">
                                Назад в корзину
                            </Link>
                            <Button
                                bgColor="bg-yellow"
                                text="Створити замовлення"
                                textColor="text-black"
                                onClick={createUserOrder}
                                disabled={!validOrder || !validChange}
                                className="hover:bg-yellow/75"
                            />
                        </div> : (
                            <div className="flex items-center justify-center">
                                <FaSpinner size={36} className="animate-spin" />
                            </div>
                        )}
                    </div>
                </div>
                <div className="bg-white px-4 py-3 pr-2 min-w-[350px] xl:min-w-[500px] drop-shadow-sm rounded-xl max-h-[500px] border border-gray-300">
                    <h4 className="text-yellow text-lg text-bold mb-6 uppercase">
                        Замовлення
                    </h4>
                    <div className="flex flex-col gap-5 mb-5 overflow-x-auto max-h-32 sm:max-h-60 lg:max-h-80 scrollbar-w-2 scrollbar-track-yellow-lighter scrollbar-thumb-yellow scrollbar-thumb-rounded">
                        {currentOrder?.mainOrder.map((item) => (
                            <div className="flex items-center justify-between gap-2 pb-2 pr-2 border-b border-gray-300" key={item._id}>
                                <p className="font-medium whitespace-nowrap">{item.quantity}x</p>
                                <div>
                                    <h6 className="font-medium text-center">
                                        {item.name.length > 25 ? `${item.name.slice(0, 23)}...` : item.name}
                                    </h6>
                                </div>
                                <p className="font-medium sm:font-bold leading-4 text-right whitespace-nowrap">
                                    {item.price * item.quantity} грн
                                </p>
                            </div>
                        ))}
                        {currentOrder?.additionalOrder.map((item) => (
                            <div className="flex items-center justify-between gap-2 pb-2 pr-2 border-b border-gray-300" key={item._id}>
                                <p className="font-medium whitespace-nowrap">{item.quantity}x</p>
                                <div>
                                    <h6 className="font-medium text-center">
                                        {item.name.length > 25 ? `${item.name.slice(0, 23)}...` : item.name}
                                    </h6>
                                </div>
                                <p className="font-medium sm:font-bold leading-4 text-right whitespace-nowrap">
                                    {item.price * item.quantity} грн
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="hidden sm:flex justify-between">
                        <h5>Сума</h5>
                        <p className="sm:text-lg font-medium sm:font-bold">{currentOrder?.totalPrice} грн.</p>
                    </div>
                    <div className="hidden sm:flex justify-between">
                        <h5>Доставка</h5>
                        <p className="sm:text-lg font-medium sm:font-bold">
                            {payMethod === "card" ? "0 грн." : "45 грн."}
                        </p>
                    </div>
                    <div className="flex justify-between">
                        <h5>До сплати</h5>
                        <p className="sm:text-lg font-medium sm:font-bold">{totalPrice} грн.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderPage
