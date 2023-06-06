import InfoCard from "../../components/adminComponents/InfoCard"
import { useGetAllUsersQuery, useGetOrdersQuery, useGetProductsQuery } from "../../store/services/products"
import { additionalProducts } from "../../helpers/constants/additionalProducts"
import Spinner from "../../components/Spinner"


const AdminPageInfo = () => {
  const { data: products, isLoading: productLoading } = useGetProductsQuery()
  const { data: orders, isLoading: ordersLoading } = useGetOrdersQuery();
  const { data: users, isLoading: usersLoading } = useGetAllUsersQuery();


  const deliveredOrders = orders?.filter((order) => order.status === "delivered");

  const paidOrders = orders?.filter((order) => order.payStatus === "Оплачено")

  const totalEarnings = paidOrders?.reduce((acc, item) => acc + item.totalPrice, 0)

  if(productLoading || usersLoading || ordersLoading) return <Spinner />

  return (
    <div>
      <h2 className="text-2xl text-red-500 font-bold text-center mb-3">
        Добро пожаловать в админ панель!
      </h2>
      <h4 className="text-xl text-center font-semibold mb-10">
        Тут вы сможете увидеть важную информацию касательно вашего магазина!
      </h4>
      <div className="flex flex-wrap gap-5 justify-center">
        <InfoCard
          bgColor="bg-yellow"
          mainText="Пиццы"
          quanity={products ? products.length : 0}
          textColor="text-white"
        />
        <InfoCard
          bgColor="bg-violet-300"
          mainText="Другие продукты"
          quanity={additionalProducts.length}
          textColor="text-black"
        />
        <InfoCard
          bgColor="bg-red-500"
          mainText="Заказы"
          quanity={orders ? orders.length : 0}
          textColor="text-black"
        />
        <InfoCard
          bgColor="bg-green-400"
          mainText="Выполненые заказы"
          quanity={deliveredOrders ? deliveredOrders.length : 0}
          textColor="text-black"
        />
        <InfoCard
          bgColor="bg-emerald-300"
          mainText="Текущие пользователи"
          quanity={users ? users.length : 0}
          textColor="text-black"
        />
        <InfoCard
          bgColor="bg-teal-400"
          mainText="Оплаченые заказы"
          quanity={paidOrders ? paidOrders.length : 0}
          textColor="text-black"
        />
        <InfoCard
          bgColor="bg-blue-300"
          mainText="Всего заработано / $"
          quanity={totalEarnings ? Math.round(totalEarnings / 38) : 0}
          textColor="text-black"
        />
      </div>
    </div>
  )
}

export default AdminPageInfo
