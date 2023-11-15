import { useState } from "react"
import InfoCard from "../../components/adminComponents/InfoCard"
import { useGetAllUsersQuery, useGetOrdersQuery, useGetProductsQuery } from "../../store/services/products"
import { additionalProducts } from "../../helpers/constants/additionalProducts"
import AdminInfoLoader from "../../components/loaders/AdminInfoLoader"
import { MdCreate } from "react-icons/md"
import CreateProductModal from "../../components/adminComponents/CreateProductModal"


const AdminPageInfo = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const { data: products, isLoading: productLoading } = useGetProductsQuery()
  const { data: orders, isLoading: ordersLoading } = useGetOrdersQuery();
  const { data: users, isLoading: usersLoading } = useGetAllUsersQuery();

  const isLoading = productLoading || usersLoading || ordersLoading;

  const deliveredOrders = orders?.filter((order) => order.status === "Доставлено");

  const paidOrders = orders?.filter((order) => order.payStatus === "Оплачено")

  const totalEarnings = paidOrders?.reduce((acc, item) => acc + item.totalPrice, 0)

  const pizzas = products?.filter((product) => product.category === "піца").length
  const sushi = products?.filter((product) => product.category === "суші").length
  const bugrers = products?.filter((product) => product.category === "бургери").length
  const soups = products?.filter((product) => product.category === "супи").length
  const shawarmas = products?.filter((product) => product.category === "шаурма").length

  return (
    <div className="flex-1 relative">
      <CreateProductModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
      <h2 className="text-xl sm:text-2xl md:text-3xl text-red-500 font-bold">
        Вітаємо вас в адмін панелі!
      </h2>
      <h4 className="text-lg leading-5 sm:text-xl sm:leading-6 font-semibold mb-4 sm:mb-6 md:mb-8">
        В цій частині ви можете побачити важливу інформацію щодо вашої піцерії!
      </h4>
      <button
        className="flex gap-2 items-center bg-yellow text-white focus-within:outline-none mb-3 rounded-md px-3 py-2 hover:bg-yellow/80 transition"
        onClick={() => setIsVisible(true)}
      >
        <MdCreate size={20} />
        <p>Створити продукт</p>
      </button>
      <div className="flex flex-wrap gap-5">
        {isLoading ? (
          [...new Array(7)].map((_, i) => (
            <AdminInfoLoader key={i} />
          ))
        ) : (<>
          <InfoCard
            bgColor="bg-emerald-500"
            mainText="Заробіток / $"
            quanity={totalEarnings ? Math.round(totalEarnings / 38) : 0}
            textColor="text-black"
          />
          <InfoCard
            bgColor="bg-yellow"
            mainText="Піца"
            quanity={pizzas ? pizzas : 0}
            textColor="text-black"
          />
          <InfoCard
            bgColor="bg-sky-500"
            mainText="Суші"
            quanity={sushi ? sushi : 0}
            textColor="text-black"
          />
          <InfoCard
            bgColor="bg-rose-500"
            mainText="Бургери"
            quanity={bugrers ? bugrers : 0}
            textColor="text-black"
          />
          <InfoCard
            bgColor="bg-blue-300"
            mainText="Супи"
            quanity={soups ? soups : 0}
            textColor="text-black"
          />
          <InfoCard
            bgColor="bg-orange-400"
            mainText="Шаурма"
            quanity={shawarmas ? shawarmas : 0}
            textColor="text-black"
          />
          <InfoCard
            bgColor="bg-violet-300"
            mainText="Інші продукти"
            quanity={additionalProducts.length}
            textColor="text-black"
          />
          <InfoCard
            bgColor="bg-red-500"
            mainText="Замовлення"
            quanity={orders ? orders.length : 0}
            textColor="text-black"
          />
          <InfoCard
            bgColor="bg-green-400"
            mainText="Виконані замовлення"
            quanity={deliveredOrders ? deliveredOrders.length : 0}
            textColor="text-black"
          />
          <InfoCard
            bgColor="bg-emerald-300"
            mainText="Користувачі"
            quanity={users ? users.length : 0}
            textColor="text-black"
          />
          <InfoCard
            bgColor="bg-teal-400"
            mainText="Оплачені замовлення"
            quanity={paidOrders ? paidOrders.length : 0}
            textColor="text-black"
          />
        </>
        )}
      </div>
    </div>
  )
}

export default AdminPageInfo
