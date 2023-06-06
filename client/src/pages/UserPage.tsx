import { useState } from "react"
import { toast } from "react-hot-toast";
import Button from "../components/Button";
import { removeUser } from "../store/slices/authSlice";
import { RootState, useAppDispatch, useAppSelector } from "../store/store"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getOrders } from "../store/slices/orderSlice";
import { UserOrder } from "../types/typings";
import UserOrderCard from "../components/UserOrderCard";
import PaginationsButtons from "../components/PaginationsButtons";


const UserPage = () => {
    const user = useAppSelector((state: RootState) => state.auth.googleUser)
    const orders = useAppSelector((state: RootState) => state.order.orders)
    const userOrders = orders?.filter((order) => order.userInfo.email === user?.email)
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState<number>(1);
    const ordersPerPage = 3;

    const toHomePage = () => {
        return navigate("/")
    }

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const totalPages = Math.ceil((userOrders ? userOrders.length : 0) / ordersPerPage)

    const currentOrders = userOrders?.slice(indexOfFirstOrder, indexOfLastOrder)

    useEffect(() => {
        if (!user) {
            toHomePage()
            return
        }

        dispatch(getOrders())
    }, [navigate, user, dispatch])

    return (
        <div className="pt-[140px] max-w-7xl mx-auto w-full min-h-[70vh] px-4 mb-5">
            <div className="flex flex-col gap-4 md:gap-8">
                <h2 className="text-yellow text-xl md:text-3xl font-bold">
                    Информация про вас
                </h2>
                <div className="flex gap-3 items-center">
                    <h6 className="text-base md:text-xl text-gray-400">Ваша почта</h6>
                    <span className="text-base md:text-xl text-gray-400">-</span>
                    <p className="text-base md:text-xl ">{user?.email}</p>
                </div>
                <div className="flex gap-3 items-center pb-5 border-b border-gray-300">
                    <h6 className="text-base md:text-xl text-gray-400">Вашe имя</h6>
                    <span className="text-base md:text-xl text-gray-400">-</span>
                    <p className="text-base md:text-xl">{user?.name}</p>
                </div>
                {user?.isAdmin && (
                    <Button
                        bgColor="bg-yellow"
                        text="Админ Панель"
                        textColor="text-white"
                        onClick={() => navigate("/admin")}
                        className="max-w-fit"
                    />
                )}
                <div className="relative pb-24">
                    <h2 className="text-yellow text-xl md:text-3xl font-bold mb-5">
                        Мои заказы
                    </h2>
                    {userOrders.length ? (
                        <>
                            <div className="flex flex-wrap gap-5">
                                {currentOrders.map((order: UserOrder) => (
                                    <UserOrderCard key={order._id} order={order} />
                                ))}
                            </div>
                            <PaginationsButtons
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                totalPages={totalPages}
                            />
                        </>
                    ) : (
                        <div>
                            <h6 className="text-red-500 text-lg mb-5">
                                У вас пока что нету заказов
                            </h6>
                            <Button
                                bgColor="bg-yellow"
                                text="Перейти к покупкам"
                                textColor="text-white"
                                onClick={() => navigate("/")}
                            />
                        </div>
                    )}
                </div>
                <Button
                    bgColor="bg-gray-400"
                    text="Выйти"
                    textColor="text-black"
                    width="250px"
                    height="50px"
                    onClick={() => {
                        dispatch(removeUser())
                        toast.success("Выход успешен")
                    }}
                    className="max-w-fit"
                />
            </div>
        </div>
    )
}

export default UserPage
