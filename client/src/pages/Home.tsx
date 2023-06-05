import DeliveryInfoCard from "../components/DeliveryInfoCard"
import PizzaCard from "../components/PizzaCard"
import PizzaSmallCard from "../components/PizzaSmallCard"
import { PizzaItem } from "../types/typings"
import { CiDeliveryTruck } from "react-icons/ci"
import { RiGuideLine } from "react-icons/ri"
import { IoMdFastforward } from "react-icons/io"
import { GiPayMoney } from "react-icons/gi"
import { useGetProductsQuery } from "../store/services/products"
import Spinner from "../components/Spinner"


const Home = () => {
  const { data, isLoading, isError } = useGetProductsQuery()

  const pizzas = data?.map((pizza) => ({
    ...pizza,
    additiveItems: [],
    additiveItemsInfo: ""
  })
  )

  if (isError) return <div className="flex items-center justify-center h-[80vh]">
    <h1 className="text-8xl font-bold text-red-500">
      Something went wrong
    </h1>
  </div>

  if (isLoading) return <Spinner />

  return (
    <main className="bg-gray-50">
      <div className="mx-auto max-w-7xl w-full px-4 pt-[130px]">
        <div className="mb-10">
          <h3 className="text-black text-lg font-bold mb-5">
            Новинки
          </h3>
          <div className="flex items-center gap-7 flex-wrap">
            {pizzas?.slice(0, 4).map((pizza: PizzaItem, i: number) => (
              <PizzaSmallCard
                key={`${pizza._id} - ${i}`}
                pizza={pizza}
              />
            ))}
          </div>
        </div>
        <div className="pb-16">
          <h3 className="text-2xl text-yellow mb-10 font-bold">
            Наша Пицца
          </h3>
          <div className="flex flex-wrap gap-8">
            {pizzas?.map((pizza: PizzaItem, i: number) => (
              <PizzaCard key={`${pizza._id} - ${i}`} pizza={pizza} />
            ))}
          </div>
        </div>
      </div>
      <div className="bg-[#E3ECF5]">
        <div className="mx-auto px-4 py-14 max-w-7xl w-full">
          <h2 className="text-2xl font-bold text-center text-yellow mb-20">
            Оплата и доставка
          </h2>
          <div className="flex flex-wrap gap-10 items-center justify-center mb-10">
            <DeliveryInfoCard
              icon={<CiDeliveryTruck size={30} className="text-red-500" />}
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
            />
            <DeliveryInfoCard
              icon={<RiGuideLine size={30} className="text-red-500" />}
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
            />
            <DeliveryInfoCard
              icon={<IoMdFastforward size={30} className="text-red-500" />}
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
            />
            <DeliveryInfoCard
              icon={<GiPayMoney size={30} className="text-red-500" />}
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
            />
          </div>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10163.493307681258!2d30.496287981301407!3d50.44346010026361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cef876af2921%3A0xf863c5ad093747fd!2sDomino&#39;s%20Pizza!5e0!3m2!1sru!2sua!4v1683201264827!5m2!1sru!2sua"
            className="w-full h-96"
            loading="lazy" />
        </div>
      </div>
    </main>
  )
}

export default Home
