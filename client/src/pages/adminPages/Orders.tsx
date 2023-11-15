import { useState } from "react";
import Button from "../../components/Button";
import { useGetOrdersQuery } from "../../store/services/products"
import { UserOrder } from "../../types/typings";
import { statusType } from "../../types/typings";
import OrderCard from "../../components/adminComponents/OrderCard";
import PaginationsButtons from "../../components/PaginationsButtons";
import OrderCardLoader from "../../components/loaders/OrderCard.loader";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { setOrderPaginate } from "../../store/slices/paginateSlice";



const Orders = () => {
  const currentPage = useAppSelector((state: RootState) => state.paginate.ordersPaginate)
  const [status, setStatus] = useState<statusType>("all")
  const [active, setActive] = useState<number>(0);
  const ordersPerPage = 4;
  const dispatch = useAppDispatch();

  const { data: orders, isLoading } = useGetOrdersQuery();

  const sortedOrders = orders && Array.isArray(orders)
    ? orders.map(order => order).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    : [];

  const paidOrders = sortedOrders && sortedOrders?.filter((order) => order.payStatus === "Оплачено");


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

  const paginateNext = () => {
    dispatch(setOrderPaginate(currentPage + 1))
  }

  const paginatePrev = () => {
    dispatch(setOrderPaginate(currentPage - 1))
  }
  
  return (
    <div className="relative flex-1 pb-24">
      <h2 className="text-red-500 text-xl sm:text-2xl md:text-3xl font-bold">
        Наявні замовлення
      </h2>
      <p className="text-green-300 text-lg leading-5 md:text-xl md:leading-6 mb-3 sm:mb-4 md:mb-6">
        Зеленим кольором виділені оплачені замовлення
      </p>
      <div className="flex flex-col lg:flex-row lg:items-center gap-2 mb-4">
        <h4 className="text-lg text-black">
          Види фільтрації:
        </h4>
        <div className="flex gap-2 flex-wrap">
          {isLoading ? (
            [...new Array(5)].map((_, i) => (
              <div className="w-20" key={i}>
                <OrderCardLoader />
              </div>
            ))
          ) : (
            <>
              <Button
                bgColor={active === 0 ? "bg-yellow" : "bg-gray-300"}
                text="Усі"
                textColor="text-black"
                className="px-3 py-1.5 hover:bg-yellow duration-200 transition"
                onClick={() => {
                  setActive(0)
                  setStatus("all")
                  dispatch(setOrderPaginate(1))
                }}
              />
              <Button
                bgColor={active === 1 ? "bg-yellow" : "bg-gray-300"}
                text="Отримані"
                textColor="text-black"
                className="px-3 py-1.5 hover:bg-yellow duration-200 transition"
                onClick={() => {
                  setActive(1)
                  setStatus("Отримано")
                  dispatch(setOrderPaginate(1))
                }}
              />
              <Button
                bgColor={active === 2 ? "bg-yellow" : "bg-gray-300"}
                text="Прийняті"
                textColor="text-black"
                className="px-3 py-1.5 hover:bg-yellow duration-200 transition"
                onClick={() => {
                  setActive(2)
                  setStatus("Прийнято")
                  dispatch(setOrderPaginate(1))
                }}
              />
              <Button
                bgColor={active === 3 ? "bg-yellow" : "bg-gray-300"}
                text="Доставлені"
                textColor="text-black"
                className="px-3 py-1.5 hover:bg-yellow duration-200 transition"
                onClick={() => {
                  setActive(3)
                  setStatus("Доставлено")
                  dispatch(setOrderPaginate(1))
                }}
              />
              <Button
                bgColor={active === 4 ? "bg-yellow" : "bg-gray-300"}
                text="Розраховані"
                textColor="text-black"
                className="px-3 py-1.5 hover:bg-yellow duration-200 transition"
                onClick={() => {
                  setActive(4)
                  setStatus("Доставлено")
                  dispatch(setOrderPaginate(1))
                }}
              />
            </>
          )}
        </div>
      </div>
      <div className="block lg:flex items-center p-2 border border-blue-400 mb-2 rounded-md ">
        <p className='text-black font-bold basis-1/12'>
          №
        </p>
        <p className='text-black font-bold basis-4/12'>
          Створення замовлення
        </p>
        <p className='text-black font-bold basis-3/12'>
          Кількість товарів
        </p>
        <p className='text-black font-bold basis-2/12'>
          Оплата
        </p>
        <p className='text-black font-bold basis-2/12 lg:text-right'>
          Статус
        </p>
      </div>
      <div className="flex flex-col gap-2">
        {isLoading ? (
          [...new Array(4)].map((_, i) => (
            <OrderCardLoader key={i} />
          ))
        ) : currentOrders.length > 0 ? currentOrders.map((order, i: number) => (
          <OrderCard order={order} index={i} key={order._id} />
        )) : (
          <p className="text-red-500 text-lg text-center my-3">
            Замовлення з таким статусом відсутні!
          </p>
        )}
      </div>
      {currentOrders.length
        ? <PaginationsButtons
          currentPage={currentPage}
          paginatePrev={paginatePrev}
          paginateNext={paginateNext}
          totalPages={totalPages}
        />
        : ""}
    </div>
  )
}

export default Orders
