import { useEffect } from "react"
import Steps from "../components/Steps"
import { RootState, useAppDispatch, useAppSelector } from "../store/store"
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
import { setIsOrderModalOpen } from "../store/slices/modalSlice"
import AdditionalProductModal from "../components/AdditionalProductModal"
import { setAdditionalProduct } from "../store/slices/productSlice"


const BasketPage = () => {
    const items = useAppSelector((state: RootState) => state.basket.basketItems)
    const item = useAppSelector((state: RootState) => state.product.additionalProduct)
    const additionalItems = useAppSelector((state: RootState) => state.basket.additionadItems)

    const isModalOpen = useAppSelector((state: RootState) => state.modal.isOrderModalOpen)
    const isAdditionalProductModalOpen = useAppSelector((state: RootState) => state.modal.isAdditionalProductModalOpen)

    const dispatch = useAppDispatch();

    const [promo, setPromo] = useState<string>("")
    const [successPromo, setSuccessPromo] = useState<boolean>(false)

    const totalPrice = useAppSelector(selectTotalPrice)
    const totalPriceAdditionalProducts = useAppSelector(selectTotalPriceAdditionalProducts)

    const totalPriceWithAdditionalProducts = totalPrice + totalPriceAdditionalProducts
    const priceWithDiscount = totalPriceWithAdditionalProducts - (totalPriceWithAdditionalProducts * 0.05)

    const sauces = additionalProducts.filter((item: AdditionalProduct) => item.category === "sauces")
    const otherProducts = additionalProducts.filter((item: AdditionalProduct) => item.category !== "sauces")

    useEffect(() => {
        dispatch(setAdditionalProduct(additionalItems[0]))

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [additionalItems, dispatch])

    const addPromo = () => {
        if (promo == "PizzaApp2023") {
            toast.success("Промокод використано")
            setSuccessPromo(true)
            setPromo("")
        }
    }

    return (
        <>
            <Modal
                title="Куди прямує замовлення?"
                isOpen={isModalOpen}
            >
                <OrderModal
                    totalPrice={successPromo ? priceWithDiscount : totalPriceWithAdditionalProducts}
                    products={items}
                    additionalProducts={additionalItems}
                />
            </Modal>
            <Modal
                isOpen={isAdditionalProductModalOpen}
                title={item?.name ? item.name : "Ваш товар"}
            >
                <AdditionalProductModal
                    item={item!}
                />
            </Modal>
            <div className="mx-auto w-full max-w-5xl px-4 pt-[70px] sm:pt-[90px] pb-5">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-gray-300 mb-6">
                    <h2 className="text-yellow text-2xl md:text-3xl font-bold">
                        Ваш Кошик ({items.length})
                    </h2>
                    <div className="hidden sm:block">
                        <Steps active={1} />
                    </div>
                </div>
                <div className="flex flex-col gap-2 sm:gap-4 mb-4 sm:mb-9">
                    {items.length > 0 ? items.map((item: BasketItems) => (
                        <BasketPageCard item={item} key={item._id} />
                    )) : (
                        <h2 className="text-lg md:text-xl text-red-500 text-center my-5 font-bold">
                            Товари у вашому замовленні відсутні!
                        </h2>
                    )}
                </div>
                <h2 className="text-yellow text-lg md:text-xl font-bold mb-4 text-center sm:text-left">
                    Додати до замовлення?
                </h2>
                <div className="flex items-center gap-2 flex-wrap mb-5 justify-center sm:justify-start">
                    {otherProducts.map((item) => (
                        <AdditionalProductCard
                            key={item._id}
                            item={item}
                        />
                    ))}
                </div>
                <h2 className="text-yellow text-lg md:text-xl font-bold mb-4 text-center sm:text-left">
                    Соуси до бортиків та закусок
                </h2>
                <div className="flex items-center gap-2 flex-wrap mb-8 justify-center sm:justify-start">
                    {sauces.map((item) => (
                        <AdditionalProductCard
                            key={item._id}
                            item={item}
                        />
                    ))}
                </div>
                <h2 className="text-red-400 text-lg md:text-xl font-bold mb-1 md:mb-2 text-center sm:text-left">
                    Промокод
                </h2>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 md:gap-5 mb-1">
                    <div className="flex items-center">
                        <Input
                            placeholder="Введіть промокод"
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
                            text="Використати"
                            className="-ml-10 rounded-none rounded-r-md hover:bg-orange-200"
                            onClick={addPromo}
                            disabled={successPromo}
                        />
                    </div>
                    <div className="text-center sm:text-right">
                        <h2 className="font-extrabold text-black text-xl leading-6 md:text-2xl md:leading-7">
                            Вартість замовлення
                        </h2>
                        <p className="font-extrabold text-yellow text-xl leading-6 md:text-2xl md:leading-7">
                            {successPromo ? priceWithDiscount.toFixed(0) : totalPriceWithAdditionalProducts} грн.
                        </p>
                    </div>
                </div>
                <p className="text-gray-400 text-sm mb-8 md:mb-12 text-center sm:text-left">
                    Ваш промокод: PizzaApp2023 / 5% знижка
                </p>
                <div className="flex items-center justify-center sm:justify-between gap-5">
                    <Link to="/" className="text-gray-400 text-lg px-2 py-1 rounded-md hover:bg-gray-50 transition">
                        На головну
                    </Link>
                    <Button
                        width="225px"
                        bgColor="bg-yellow"
                        textColor="text-black"
                        text="Створити замовлення"
                        onClick={() => dispatch(setIsOrderModalOpen())}
                        className="hover:bg-yellow/75"
                    />
                </div>
            </div>
        </>
    )
}

export default BasketPage
