import { useNavigate, useParams } from "react-router-dom"
import { useGetOrderByIdQuery } from "../../store/services/products";
import Spinner from "../../components/Spinner";
import Button from "../../components/Button";
import OrderInfo from "../../components/adminComponents/OrderInfo";
import ProductCard from "../../components/adminComponents/ProductCard";
import AdditionalProductCard from "../../components/AdditionalProductCard ";
import { useState } from "react";
import { statusType } from "../../types/typings";
import { toast } from "react-hot-toast";
import { translateOrderStatus, updateOrderStatus, updateOrderPayment } from "../../utils";
import { RootState, useAppSelector } from "../../store/store";
import moment from 'moment-timezone';
import SelectStatus from "../../components/adminComponents/SelectStatus";
import { paymentOptions, statusOptions } from "../../helpers/constants";


const OrderDetails = () => {
  const { id } = useParams();
  const { data: order, isLoading, isError } = useGetOrderByIdQuery(id)
  const user = useAppSelector((state: RootState) => state.auth.googleUser)

  const [status, setStatus] = useState<statusType>(order?.status ? order.status : "received")
  const [payment, setPayment] = useState<"Оплачено" | "Не оплачено">(order?.payStatus ? order.payStatus : "Не оплачено")
  

  const navigate = useNavigate();

  const updateOrderInfo = async () => {
    if (status === order?.status) {
      toast.error(`Заказ уже имеет статус - ${translateOrderStatus(status)}`)
      return
    }
    try {
      await updateOrderStatus(status, id, user?.token ? user.token : "")
      toast.success(`Статус успешно сменен на ${translateOrderStatus(status)}`)
      setTimeout(() => {
        window.location.reload()
      }, 500)
      navigate("/admin/view-orders")
    } catch (err) {
      toast.error("Что-то пошло не так")
    }
  }

  const updatePaymentStatus = async () => {
    if (payment === order?.payStatus) {
      toast.error(`Заказ уже имеет статус - ${payment}`)
      return
    }
    try {
      await updateOrderPayment(payment, id, user?.token ? user.token : "")
      toast.success(`Статус успешно сменен на ${payment}`)
      setTimeout(() => {
        window.location.reload()
      }, 500)
      navigate("/admin/view-orders")
    } catch (err) {
      toast.error("Что-то пошло не так")
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


  if (isError && !order) return <div className="flex items-center justify-center h-[80vh] w-full">
    <h2>Такого товара не существует!</h2>
  </div>

  if (isLoading) return <Spinner />
  return (
    <div>
      <h2 className="text-red-500 text-2xl font-bold mb-2 text-center sm:text-left">
        Информация про заказ
      </h2>
      <Button
        bgColor="bg-yellow"
        text="Вернуться назад"
        textColor="text-white"
        className="px-3 py-2 mb-4 mx-auto sm:mx-0"
        onClick={() => navigate("/admin/view-orders")}
      />
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-10 mb-2">
        <div className="flex flex-col mb-0 lg:mb-5">
          <OrderInfo text="ID ордера" info={order?._id} />
          <OrderInfo text="Статус" info={translateOrderStatus(order?.status)} />
          <OrderInfo text="К оплате" info={`${order?.totalPrice} грн.`} />
          <OrderInfo text="Имя клиента" info={order?.userInfo.name} />
          <OrderInfo text="Почта клиента" info={order?.userInfo.email} />
          <OrderInfo text="Номер телефона" info={order?.userInfo.phone} />
          <OrderInfo text="Адрес клиента" info={order?.userAddress} />
          <OrderInfo
            text="Способ оплаты"
            info={`${order?.paymentMethod} ${order?.paymentMethod === "cash" ? `| сдача с ${order.change} грн` : ""}`}
          />
          <OrderInfo text="Комментарии к ордеру" info={order?.comments ? order?.comments : "Комментариев нету"} />
          <OrderInfo text="Информация об оплате" info={order?.payStatus} />
          {order?.status === "delivered" && (
            <>
              <p className="text-green-400 text-lg font-bold text-center sm:text-left">
                Время завершения заказа {date}
              </p>
            </>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-center">

          <SelectStatus
            borderColor="yellow"
            header="Сменить статус заказа"
            onChange={handleStatusChange}
            onClick={updateOrderInfo}
            options={statusOptions}
          />
          <SelectStatus
            borderColor="red-500"
            header="Оплата"
            onChange={handlePayChange}
            onClick={updatePaymentStatus}
            options={paymentOptions}
          />
        </div>
      </div>
      <h4 className="text-red-500 text-lg mb-2">
        Основные продукты:
      </h4>
      <div className="flex flex-col gap-2 mb-5">
        {order?.mainOrder.map((product, i) => (
          <ProductCard product={product} key={product._id} index={i} />
        ))}
      </div>
      <h4 className="text-red-500 text-lg mb-2">
        Дополнительные продукты:
      </h4>
      <div className="flex gap-2 items-center flex-wrap">
        {order?.additionalOrder?.length ? order?.additionalOrder.map((product) => (
          <AdditionalProductCard item={product} isOrderPage key={product._id} />
        )) : (
          <p className="text-green-400">
            В заказе нету дополнительных продуктов!
          </p>
        )}
      </div>
    </div>
  )
}

export default OrderDetails
