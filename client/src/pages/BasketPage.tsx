import Steps from "../components/Steps"
import { RootState, useAppSelector } from "../store/store"
import { AdditionalProduct, BasketItems } from "../types/typings"
import { selectTotalPrice, selectTotalPriceAdditionalProducts } from "../store/slices/basketSlice"
import { toast } from "react-hot-toast"
import Input from "../components/Input"
import { useState } from "react"
import Button from "../components/Button"
import { Link } from "react-router-dom"
import BasketPageCard from "../components/BasketPageCard"
import { additionalProducts } from "../helpers/constants/additionalProducts"
import AdditionalProductCard from "../components/AdditionalProductCard "
import Modal from "../components/Modal"
import OrderModal from "../components/OrderModal"


const BasketPage = () => {
    const items = useAppSelector((state: RootState) => state.basket.basketItems)
    const additionalItems = useAppSelector((state: RootState) => state.basket.additionadItems)

    const [promo, setPromo] = useState<string>("")
    const [successPromo, setSuccessPromo] = useState<boolean>(false)
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

    const totalPrice = useAppSelector(selectTotalPrice)
    const totalPriceAdditionalProducts = useAppSelector(selectTotalPriceAdditionalProducts)

    const totalPriceWithAdditionalProducts = totalPrice + totalPriceAdditionalProducts
    const priceWithDiscount = totalPriceWithAdditionalProducts - (totalPriceWithAdditionalProducts * 0.05)

    const sauces = additionalProducts.filter((item: AdditionalProduct) => item.category === "sauces")
    const otherProducts = additionalProducts.filter((item: AdditionalProduct) => item.category !== "sauces")

    const addPromo = () => {
        if (promo == "PizzaApp2023") {
            toast.success("Промокод успешно применен")
            setSuccessPromo(true)
            setPromo("")
        }
    }

    return (
        <>
            <Modal
                title="Куда доставить?"
                isOpen={modalIsOpen}
                setIsOpen={setModalIsOpen}
            >
                <OrderModal
                    setModalIsOpen={setModalIsOpen}
                    totalPrice={successPromo ? priceWithDiscount : totalPriceWithAdditionalProducts}
                    products={items}
                    additionalProducts={additionalItems}
                />
            </Modal>
            <div className="mx-auto w-full max-w-3xl px-4 pt-[120px] sm:pt-[160px] mb-5">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-gray-300 mb-6">
                    <h2 className="text-yellow text-xl md:text-3xl font-bold">
                        Корзина
                    </h2>
                    <Steps active={1} />
                </div>
                <div className="flex flex-col gap-4 mb-9 items-center">
                    {items.length > 0 ? items.map((item: BasketItems) => (
                        <BasketPageCard item={item} key={item._id} />
                    )) : (
                        <h2 className="text-lg md:text-xl text-red-500 text-center my-5 font-bold">
                            У вас нету пицц в заказе!
                        </h2>
                    )}
                </div>
                <h2 className="text-yellow text-lg md:text-xl font-bold mb-4">
                    Добавить к заказу?
                </h2>
                <div className="flex items-center justify-center gap-2 flex-wrap mb-5">
                    {otherProducts.map((item) => (
                        <AdditionalProductCard
                            key={item._id}
                            item={item}
                        />
                    ))}
                </div>
                <h2 className="text-yellow text-lg md:text-xl font-bold mb-4">
                    Соусы к бортикам и закускам
                </h2>
                <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
                    {sauces.map((item) => (
                        <AdditionalProductCard
                            key={item._id}
                            item={item}
                        />
                    ))}
                </div>
                <h2 className="text-red-400 text-lg md:text-xl font-bold mb-2 md:mb-6 text-center md:text-left">
                    Промокод
                </h2>
                <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-5 mb-1">
                    <div className="flex items-center">
                        <Input
                            placeholder="Введите промокод"
                            width="220px"
                            type="text"
                            setInput={setPromo}
                            input={promo}
                        />
                        <Button
                            width="133px"
                            height="40px"
                            bgColor="bg-yellow"
                            textColor="text-black"
                            text="Применить"
                            className="-ml-10 rounded-none rounded-r-md"
                            onClick={addPromo}
                            disabled={successPromo}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <h2 className="font-extrabold text-black text-xl md:text-3xl">
                            Сумма заказа:
                        </h2>
                        <p className="font-extrabold text-yellow text-xl md:text-3xl">
                            {successPromo ? priceWithDiscount.toFixed(0) : totalPriceWithAdditionalProducts} грн.
                        </p>
                    </div>
                </div>
                <p className="text-gray-400 text-sm mb-8 md:mb-12 text-center md:text-left">
                    Ваш промокод: PizzaApp2023 / 5% скидка
                </p>
                <div className="flex items-center justify-center md:justify-between gap-5">
                    <Link to="/" className="text-gray-400 text-lg">
                        Вернуться в магазин
                    </Link>
                    <Button
                        width="225px"
                        bgColor="bg-yellow"
                        textColor="text-black"
                        text="Оформить заказ"
                        onClick={() => setModalIsOpen(true)}
                    />
                </div>
            </div>
        </>
    )
}

export default BasketPage
