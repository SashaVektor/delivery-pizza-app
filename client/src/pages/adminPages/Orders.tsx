import { useState } from "react";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import { useGetOrdersQuery } from "../../store/services/products"
import { UserOrder } from "../../types/typings";
import { statusType } from "../../types/typings";
import OrderCard from "../../components/adminComponents/OrderCard";
import PaginationsButtons from "../../components/PaginationsButtons";



const Orders = () => {
  const { data: orders, isLoading } = useGetOrdersQuery();
  const [status, setStatus] = useState<statusType>("all")
  const [active, setActive] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ordersPerPage = 4;


  // За допомогою map створюємо новий масив, який буде мутабельним. Далі сортуємо за датами
  const sortedOrders = orders && Array.isArray(orders)
    ? orders.map(order => order).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    : [];

  const paidOrders = sortedOrders && sortedOrders?.filter((order) => order.payStatus === "Оплачено");

  if (isLoading) return <Spinner />

  const getFilteredOrders = (orders: UserOrder[], status: statusType) => orders
    .filter((order) => {
      if (status === "all") {
        return order
      } else {
        return order.status === status
      }
    })

  const filteredOrders = getFilteredOrders(sortedOrders, status)

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const totalPages = Math.ceil((active !== 4 ? filteredOrders.length : paidOrders.length) / ordersPerPage)

  const currentOrders = active !== 4
    ? filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder)
    : paidOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <div className="relative h-full">
      <h2 className="text-red-500 text-xl md:text-2xl font-bold mb-2">
        Текущие заказы
      </h2>
      <p className="text-green-300 text-base md:text-lg mb-5">
        Зелёным цветом обозначаються оплаченые заказы
      </p>
      <div className="flex flex-col lg:flex-row sm:items-center gap-2 mb-4">
        <h4 className="text-lg text-black">
          Варианты фильтрации:
        </h4>
        <div className="grid grid-cols-2 sm:flex gap-2">
          <Button
            bgColor={active === 0 ? "bg-yellow" : "bg-gray-400"}
            text="Все"
            textColor="text-black"
            className="px-3 py-1.5"
            onClick={() => {
              setActive(0)
              setStatus("all")
              setCurrentPage(1)
            }}
          />
          <Button
            bgColor={active === 1 ? "bg-yellow" : "bg-gray-400"}
            text="Полученые"
            textColor="text-black"
            className="px-3 py-1.5"
            onClick={() => {
              setActive(1)
              setStatus("received")
              setCurrentPage(1)
            }}
          />
          <Button
            bgColor={active === 2 ? "bg-yellow" : "bg-gray-400"}
            text="Принятые"
            textColor="text-black"
            className="px-3 py-1.5"
            onClick={() => {
              setActive(2)
              setStatus("accepted")
              setCurrentPage(1)
            }}
          />
          <Button
            bgColor={active === 3 ? "bg-yellow" : "bg-gray-400"}
            text="Доставленые"
            textColor="text-black"
            className="px-0 py-1 sm:px-3 sm:py-1.5"
            onClick={() => {
              setActive(3)
              setStatus("delivered")
              setCurrentPage(1)
            }}
          />
          <Button
            bgColor={active === 4 ? "bg-yellow" : "bg-gray-400"}
            text="Оплаченые"
            textColor="text-black"
            className="px-1.5 py-1 sm:px-3 sm:py-1.5"
            onClick={() => {
              setActive(4)
              setStatus("delivered")
              setCurrentPage(1)
            }}
          />
        </div>
      </div>
      <div className="block lg:flex items-center p-2 border border-blue-400 mb-2 rounded-md ">
        <p className='text-black font-bold basis-1/12'>
          №
        </p>
        <p className='text-black font-bold basis-4/12'>
          Дата создания ордера
        </p>
        <p className='text-black font-bold basis-4/12'>
          ID ордера
        </p>
        <p className='text-black font-bold basis-2/12'>
          К оплате
        </p>
        <p className='text-black font-bold basis-1/12'>
          Статус
        </p>
      </div>
      <div className="flex flex-col gap-2 pb-32">
        {currentOrders.length ? currentOrders.map((order, i: number) => (
          <OrderCard order={order} index={i} key={order._id} />
        )) : (
          <p className="text-red-500 text-center mx-3 text-lg">
            Пока что нету заказов с таким статусом!
          </p>
        )}
      </div>
      {currentOrders.length
        ? <PaginationsButtons
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
        : ""}
    </div>
  )
}

export default Orders
