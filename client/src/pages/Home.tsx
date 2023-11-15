import { useEffect } from "react"
import DeliveryInfoCard from "../components/DeliveryInfoCard"
import PizzaCard from "../components/PizzaCard"
import { PizzaItem } from "../types/typings"
import { CiDeliveryTruck } from "react-icons/ci"
import { RiGuideLine } from "react-icons/ri"
import { IoMdFastforward } from "react-icons/io"
import { GiPayMoney } from "react-icons/gi"
import { useGetProductsQuery } from "../store/services/products"
import PizzaLoader from "../components/loaders/PizzaLoader"
import Modal from "../components/Modal"
import PizzaPopup from "../components/PizzaPopup"
import { useAppDispatch, useAppSelector } from "../store/store"
import { setEditProduct } from "../store/slices/productSlice"
import { smoothScrollToCategory } from "../utils/smoothScrollToCategory"
import MobileNavigate from "../components/MobileNavigate"


const Home = () => {
  const { data, isLoading } = useGetProductsQuery()
  const product = useAppSelector((state) => state.product.product)
  const isModalOpen = useAppSelector((state) => state.modal.isProductModalOpen)
  const dispatch = useAppDispatch();

  const pizzas = data?.filter((product) => product.category === "піца").map((pizza) => ({
    ...pizza,
    additiveItems: [],
    additiveItemsInfo: ""
  }))

  const sushi = data?.filter((product) => product.category === "суші")
  const bugrers = data?.filter((product) => product.category === "бургери")
  const soups = data?.filter((product) => product.category === "супи")
  const shawarmas = data?.filter((product) => product.category === "шаурма")

  useEffect(() => {
    if (data) {
      dispatch(setEditProduct(data[0]))
    }
  }, [data, dispatch])

  return (
    <>
      {product?._id ? <Modal
        isOpen={isModalOpen}
        title="Оберіть опції"
      >
        <PizzaPopup
          pizza={product!}
        />
      </Modal> : null}
      <main className="bg-gray-50/50 relative">
        <div className="mx-auto max-w-7xl w-full px-4 pt-[70px] sm:pt-[90px]">
          <div className="hidden sm:flex lg:hidden items-center gap-5 justify-center mb-5">
            <button className="px-4 py-1 bg-yellow rounded-xl text-lg text-white hover:bg-yellow/60 transition cursor-pointer"
              onClick={() => smoothScrollToCategory("pizza")}
            >
              Піца
            </button>
            <button className="px-4 py-1 bg-yellow rounded-xl text-lg text-white hover:bg-yellow/60 transition cursor-pointer"
              onClick={() => smoothScrollToCategory("sushi")}
            >
              Суші
            </button>
            <button className="px-4 py-1 bg-yellow rounded-xl text-lg text-white hover:bg-yellow/60 transition cursor-pointer"
              onClick={() => smoothScrollToCategory("burgers")}
            >
              Бургери
            </button>
            <button className="px-4 py-1 bg-yellow rounded-xl text-lg text-white hover:bg-yellow/60 transition cursor-pointer"
              onClick={() => smoothScrollToCategory("shawarmas")}
            >
              Шаурма
            </button>
            <button className="px-4 py-1 bg-yellow rounded-xl text-lg text-white hover:bg-yellow/60 transition cursor-pointer"
              onClick={() => smoothScrollToCategory("soups")}
            >
              Супи
            </button>
          </div>
          <div className="mb-10 md:mb-16">
            <h3 className="text-2xl md:text-3xl text-yellow mb-3 sm:mb-6 font-semibold text-center">
              Наша Піца
            </h3>
            <div className="flex flex-wrap gap-6 max-w-5xl mx-auto justify-center mb-4 sm:mb-8" id="pizza">
              {(isLoading || !pizzas) ? (
                [...new Array(4)].map((_, i) => (
                  <PizzaLoader key={i} />
                ))
              ) : (
                pizzas.map((pizza: PizzaItem, i: number) => (
                  <PizzaCard key={`${pizza._id} - ${i}`} pizza={pizza} />
                ))
              )}
            </div>
            <h3 className="text-2xl md:text-3xl text-yellow mb-3 sm:mb-6 font-semibold text-center">
              Наші Суші
            </h3>
            <div className="flex flex-wrap gap-6 max-w-5xl mx-auto justify-center mb-4 sm:mb-8" id="sushi">
              {(isLoading || !sushi) ? (
                [...new Array(4)].map((_, i) => (
                  <PizzaLoader key={i} />
                ))
              ) : (
                sushi.map((sushi: PizzaItem, i: number) => (
                  <PizzaCard key={`${sushi._id} - ${i}`} pizza={sushi} />
                ))
              )}
            </div>
            <h3 className="text-2xl md:text-3xl text-yellow mb-3 sm:mb-6 font-semibold text-center">
              Наші Бургери
            </h3>
            <div className="flex flex-wrap gap-6 max-w-5xl mx-auto justify-center mb-4 sm:mb-8" id="burgers">
              {(isLoading || !bugrers) ? (
                [...new Array(4)].map((_, i) => (
                  <PizzaLoader key={i} />
                ))
              ) : (
                bugrers.map((burger: PizzaItem, i: number) => (
                  <PizzaCard key={`${burger._id} - ${i}`} pizza={burger} />
                ))
              )}
            </div>
            <h3 className="text-2xl md:text-3xl text-yellow mb-3 sm:mb-6 font-semibold text-center">
              Наша Шаурма
            </h3>
            <div className="flex flex-wrap gap-6 max-w-5xl mx-auto justify-center mb-4 sm:mb-8" id="shawarmas">
              {(isLoading || !shawarmas) ? (
                [...new Array(4)].map((_, i) => (
                  <PizzaLoader key={i} />
                ))
              ) : (
                shawarmas.map((shawarma: PizzaItem, i: number) => (
                  <PizzaCard key={`${shawarma._id} - ${i}`} pizza={shawarma} />
                ))
              )}
            </div>
            <h3 className="text-2xl md:text-3xl text-yellow mb-3 sm:mb-6 font-semibold text-center">
              Наші Супи
            </h3>
            <div className="flex flex-wrap gap-6 max-w-5xl mx-auto justify-center mb-4 sm:mb-8" id="soups">
              {(isLoading || !soups) ? (
                [...new Array(4)].map((_, i) => (
                  <PizzaLoader key={i} />
                ))
              ) : (
                soups.map((soup: PizzaItem, i: number) => (
                  <PizzaCard key={`${soup._id} - ${i}`} pizza={soup} />
                ))
              )}
            </div>
          </div>
        </div>
        <div className="bg-[#E3ECF5]">
          <div className="mx-auto px-2 sm:px-4 py-5 sm:py-8 md:py-14 max-w-7xl w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-yellow mb-14 md:mb-20">
              Оплата та доставка
            </h2>
            <div className="flex flex-wrap gap-10 items-center justify-center mb-10">
              <DeliveryInfoCard
                icon={<CiDeliveryTruck size={30} className="text-red-500" />}
                text="Зручна та Швидка Оплата"
              />
              <DeliveryInfoCard
                icon={<RiGuideLine size={30} className="text-red-500" />}
                text="Розширений Вибір Опцій та Додатків"
              />
              <DeliveryInfoCard
                icon={<IoMdFastforward size={30} className="text-red-500" />}
                text="Ефективна Система Доставки"
              />
              <DeliveryInfoCard
                icon={<GiPayMoney size={30} className="text-red-500" />}
                text="Відстеження Замовлення в Реальному Часі"
              />
            </div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10163.493307681258!2d30.496287981301407!3d50.44346010026361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cef876af2921%3A0xf863c5ad093747fd!2sDomino&#39;s%20Pizza!5e0!3m2!1sru!2sua!4v1683201264827!5m2!1sru!2sua"
              className="w-full h-96"
              loading="lazy" />
          </div>
        </div>
        <div className="block sm:hidden">
          <MobileNavigate />
        </div>
      </main>
    </>
  )
}

export default Home
