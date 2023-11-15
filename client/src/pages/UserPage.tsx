import { toast } from "react-hot-toast";
import Button from "../components/Button";
import { removeUser } from "../store/slices/authSlice";
import { RootState, useAppDispatch, useAppSelector } from "../store/store"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import UserOrderCard from "../components/UserOrderCard";
import PaginationsButtons from "../components/PaginationsButtons";
import { setUserPaginate } from "../store/slices/paginateSlice";
import { useGetUserOrdersQuery } from "../store/services/products";
import UserOrderLoader from "../components/loaders/UserOrderLoader";


const UserPage = () => {
    const user = useAppSelector((state: RootState) => state.auth.googleUser)
    const currentPage = useAppSelector((state) => state.paginate.userPaginate)
    const userId = user?._id ? user._id : ""
    const { data: userOrders, isLoading } = useGetUserOrdersQuery(userId)

    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const ordersPerPage = 3;

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const totalPages = Math.ceil((userOrders ? userOrders.length : 0) / ordersPerPage)

    const currentOrders = Array.isArray(userOrders) ? userOrders.slice(indexOfFirstOrder, indexOfLastOrder) : [];

    const paginateNext = () => {
        dispatch(setUserPaginate(currentPage + 1))
    }

    const paginatePrev = () => {
        dispatch(setUserPaginate(currentPage - 1))
    }

    useEffect(() => {
        if (!user) {
            return navigate("/")
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })

    }, [navigate, user, dispatch])

    return (
        <div className="pt-[70px] sm:pt-[90px] max-w-7xl mx-auto w-full min-h-[70vh] px-4 mb-5">
            <div className="flex items-center gap-3 mb-5">
                <Button
                    bgColor="bg-yellow"
                    text="На головну"
                    textColor="text-white"
                    width="250px"
                    height="50px"
                    onClick={() => navigate("/")}
                    className="max-w-fit hover:bg-yellow/75"
                />
                {user?.isAdmin && (
                    <Button
                        bgColor="bg-yellow"
                        text="Адмін"
                        textColor="text-white"
                        onClick={() => navigate("/admin")}
                        className="max-w-fit hover:bg-yellow/75"
                    />
                )}
                <Button
                    bgColor="bg-yellow"
                    text="Вихід"
                    textColor="text-white"
                    width="250px"
                    height="50px"
                    onClick={() => {
                        if (window.confirm("Ви дійсно хочете вийти?")) {
                            dispatch(removeUser())
                            toast.success("Вихід виконано успішно!")
                        }
                    }}
                    className="max-w-fit hover:bg-yellow/75"
                />
            </div>
            <div className="relative pb-24">
                <h2 className="text-yellow text-2xl md:text-3xl font-bold mb-1">
                    Мої замовлення
                </h2>
                <h2 className="mb-3 text-base sm:text-lg">
                    {user?.name}, {user?.email}
                </h2>
                {(isLoading || !userOrders) ? (
                    <div className="flex items-center gap-5 flex-wrap">
                        {[...new Array(3)].map((_, i) => (
                            <div key={i}>
                                <UserOrderLoader />
                            </div>
                        ))}
                    </div>
                ) : (userOrders.length && currentOrders.length) ? (
                    <>
                        <div className="flex flex-wrap gap-5">
                            {currentOrders.map((order, i) => (
                                <UserOrderCard
                                    key={order._id}
                                    order={order}
                                    number={i + 1}
                                />
                            ))}
                        </div>
                        <PaginationsButtons
                            currentPage={currentPage}
                            totalPages={totalPages}
                            paginateNext={paginateNext}
                            paginatePrev={paginatePrev}
                        />
                    </>
                ) : (
                    <div>
                        <h6 className="text-red-500 font-semibold text-xl md:text-2xl mb-2">
                            Замовлення поки що відсутні!
                        </h6>
                        <Button
                            bgColor="bg-yellow"
                            text="На головну"
                            textColor="text-white"
                            onClick={() => navigate("/")}
                            className="hover:bg-yellow/75"
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserPage
