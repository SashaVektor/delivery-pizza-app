import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useGetOrderByIdQuery, useGetOrdersQuery } from "../../store/services/products";
import Button from "../../components/Button";
import OrderInfo from "../../components/adminComponents/OrderInfo";
import ProductCard from "../../components/adminComponents/ProductCard";
import AdditionalProductCard from "../../components/AdditionalProductCard ";
import { useState } from "react";
import { statusType } from "../../types/typings";
import { toast } from "react-hot-toast";
import { updateOrderStatus, updateOrderPayment, deleteOrder } from "../../utils";
import { RootState, useAppSelector } from "../../store/store";
import moment from 'moment-timezone';
import SelectStatus from "../../components/adminComponents/SelectStatus";
import { paymentOptions, statusOptions } from "../../helpers/constants";
import OrderDetaisTextLoader from "../../components/loaders/OrderDetailsTextLoader";
import SelectLoader from "../../components/loaders/SelectLoader";
import ProductInOrderLoader from "../../components/loaders/ProductInOrderLoader";
import AdditionalItemLoader from "../../components/loaders/AdditionalItemLoader";
import { FaSpinner } from "react-icons/fa";


const OrderDetails = () => {
  const { id } = useParams();
  const { data: order, isLoading, isError, refetch: refetchOrder } = useGetOrderByIdQuery(id)
  const { refetch } = useGetOrdersQuery()
  const user = useAppSelector((state: RootState) => state.auth.googleUser)

  const [status, setStatus] = useState<statusType>(order?.status ? order.status : "Отримано")
  const [payment, setPayment] = useState<"Оплачено" | "Не оплачено">(order?.payStatus ? order.payStatus : "Не оплачено")
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
  const [statusLoading, setStatusLoading] = useState<boolean>(false)
  const [paymentLoading, setPaymentLoading] = useState<boolean>(false)


  const navigate = useNavigate();

  const deleteOrderDetails = async (id: string | undefined, token: string | undefined) => {
    if (!id || !token) {
      return
    }

    if (window.confirm("Ви дійсно хочете видалити це завомлення?")) {
      setDeleteLoading(true)
      try {
        const res = await deleteOrder(id, token);
        if (res?.message === "Замовлення видалено успішно!") {
          toast.success("Замовлення видалено успішно!")
          refetch();
          navigate("/admin/view-orders")
        } else {
          toast.error("Щось пішло не так")
        }
      } catch (err) {
        toast.error("Щось пішло не так")
      } finally {
        setDeleteLoading(false)
      }
    }
  }


  const updateOrderInfo = async () => {
    if (status === order?.status) {
      toast.error(`Замовлення вже має цей статус`)
      return
    }
    setStatusLoading(true)
    try {
      const res = await updateOrderStatus(status, id, user?.token ? user.token : "")
      if (res?.message === "Статус успішно змінено!") {
        toast.success(`Статус успішно змінено`)
        refetch()
        refetchOrder()
      } else {
        toast.error("Щось пішло не так")
      }
    } catch (err) {
      toast.error("Щось пішло не так")
    } finally {
      setStatusLoading(false)
    }
  }

  const updatePaymentStatus = async () => {
    if (payment === order?.payStatus) {
      toast.error(`Замовлення вже має цей статус`)
      return
    }
    setPaymentLoading(true)
    try {
      const res = await updateOrderPayment(payment, id, user?.token ? user.token : "")
      if (res?.message === "Статус успішно змінено!") {
        toast.success(`Статус успішно змінено`)
        refetch()
        refetchOrder()
      } else {
        toast.error("Щось пішло не так")
      }
    } catch (err) {
      toast.error("Щось пішло не так")
    } finally {
      setPaymentLoading(false)
    }
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value: statusType = e.target.value as statusType;
    setStatus(value)
  }

  const handlePayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value: "Оплачено" | "Не оплачено" = e.target.value as "Оплачено" | "Не оплачено";
    setPayment(value)
  }

  const date = moment.utc(order?.updatedAt).tz('Europe/Kiev').format('YYYY-MM-DD HH:mm:ss');

  useEffect(() => {
    if (isError && !order) return navigate("/admin/view-orders")
  }, [isError, navigate, order])


  return (
    <div className="flex-1">
      <div className="flex items-center gap-2 flex-wrap">
        {!deleteLoading ? <Button
          bgColor="bg-yellow"
          text="До замовлень"
          textColor="text-white"
          className="px-3 py-2 mb-2 hover:bg-yellow/80"
          disabled={statusLoading || paymentLoading || deleteLoading}
          onClick={() => navigate("/admin/view-orders")}
        /> : null}
        {!deleteLoading ? <Button
          bgColor="bg-rose-600"
          text="Видалити замовлення"
          textColor="text-white"
          className="px-3 py-2 mb-2 hover:bg-rose-700"
          disabled={statusLoading || paymentLoading || deleteLoading}
          onClick={() => deleteOrderDetails(order?._id, user?.token)}
        /> : <div className="flex items-center justify-center">
          <FaSpinner size={30} className="animate-spin" />
        </div>}
      </div>
      <h2 className="text-red-500 text-xl sm:text-2xl md:text-3xl font-bold mb-5">
        Інформація щодо замовлення
      </h2>
      <div className="flex flex-col-reverse xl:flex-row gap-5 md:items-start xl:gap-10 mb-2">
        <div className={`flex flex-col mb-0 lg:mb-5 ${isLoading ? "gap-2" : ""}`}>
          {isLoading ? (
            [...new Array(10)].map((_, i) => (
              <OrderDetaisTextLoader key={i} />
            ))
          ) : (
            <>
              <div className="text-center sm:text-left grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 max-w-xl mb-5">
                <OrderInfo text="Статус" info={order?.status} />
                <OrderInfo text="До оплати" info={`${order?.totalPrice} грн.`} />
                <OrderInfo text="Телефон" info={order?.userInfo.phone} />
                <OrderInfo text="Ім'я замовника" info={order?.userInfo.name} />
                <OrderInfo
                  text="Спосіб оплати"
                  info={`${order?.paymentMethod} - ${order?.change}грн;
                  ${order?.paymentMethod === "cash" ? `решта - ${Number(order.change) - order.totalPrice} грн` : ""}`}
                />
                <OrderInfo text="Інформація щодо оплати" info={order?.payStatus} />
              </div>
              <div className="items-center text-center sm:text-left sm:items-start flex flex-col gap-3 sm:gap-5">
                <OrderInfo text="Пошта замовника" info={order?.userInfo.email} />
                <OrderInfo text="Коментарі до замовлення" info={order?.comments ? order?.comments : "Комментарі відсутні"} />
                <OrderInfo text="Адреса замовника" info={order?.userAddress} />
              </div>
            </>
          )}
          {isLoading ? null : order?.status === "Доставлено" && (
            <>
              <p className="text-green-400 font-semibold mt-2">
                Завершення замовлення о {date}
              </p>
            </>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center flex-wrap">
          {isLoading ? ([...new Array(2)].map((_, i) => (
            <SelectLoader key={i} />
          ))) : (
            <>
              <SelectStatus
                borderColor="yellow"
                header="Замовлення"
                onChange={handleStatusChange}
                onClick={updateOrderInfo}
                options={statusOptions}
                defaultValue={order?.status ? order.status : ""}
                disabled={deleteLoading}
                loading={statusLoading}
              />
              <SelectStatus
                borderColor="red-500"
                header="Оплата"
                onChange={handlePayChange}
                onClick={updatePaymentStatus}
                options={paymentOptions}
                defaultValue={order?.payStatus ? order.payStatus : ""}
                disabled={deleteLoading}
                loading={paymentLoading}
              />
            </>
          )}
        </div>
      </div>
      <h4 className="text-red-500 text-lg mb-2 font-semibold">
        Замовлення:
      </h4>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1.5 sm:gap-3 md:gap-5 mb-3 md:mb-5">
        {isLoading ? ([...new Array(2)].map((_, i) => (
          <ProductInOrderLoader key={i} />
        ))) : order?.mainOrder.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
      <h4 className="text-red-500 text-lg mb-2 font-semibold">
        Додаткові продукти:
      </h4>
      <div className="flex gap-2 items-center flex-wrap">
        {isLoading ? (
          [... new Array(4)].map((_, i) => (
            <AdditionalItemLoader key={i} />
          ))
        ) : order?.additionalOrder?.length ? order?.additionalOrder.map((product) => (
          <AdditionalProductCard item={product} isOrderPage key={product._id} />
        )) : (
          <p>
            В замовленні відсутні додаткові продукти!
          </p>
        )}
      </div>
    </div>
  )
}

export default OrderDetails
