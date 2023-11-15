import { FC, useEffect, useState } from 'react'
import { AdditionalProduct, PizzaItem } from '../types/typings'
import Button from './Button'
import { additives } from '../helpers/constants/additives'
import { toast } from 'react-hot-toast'
import { useAppDispatch } from '../store/store'
import { addBasketItem } from '../store/slices/basketSlice'
import { v4 as uuidv4 } from 'uuid';
import { onClose } from '../store/slices/modalSlice'

interface PizzaPopupProps {
    pizza: PizzaItem
}

const PizzaPopup: FC<PizzaPopupProps> = ({ pizza }) => {
    const pizzaCategory = pizza.category === 'піца'
    const info = pizzaCategory ? pizza.info.split(",") : pizza.info
    const dispatch = useAppDispatch()

    const [pizzaSize, setPizzaSize] = useState<number | null>(pizzaCategory ? parseInt(info[0]) : null)
    const [pizzaDough, setPizzaDough] = useState<"традиційне" | "тонке" | null>(pizzaCategory ? "традиційне" : null)
    const [pizzaWeight, setPizzaWeight] = useState<number>(pizzaCategory ? parseInt(info[0]) : parseInt(pizza.info))
    const [isActive, setIsActive] = useState<number>(0)
    const [finalPrice, setFinalPrice] = useState<number>(0)
    const [additiveItems, setAdditiveItems] = useState<AdditionalProduct[]>(pizza.additiveItems || [])

    const priceWithDiscont = pizza.discount ? (pizza.price - (pizza.price * (pizza.discount / 100))) : pizza.price

    useEffect(() => {
        setIsActive(0)
        setFinalPrice(priceWithDiscont)
        setPizzaSize(pizzaCategory ? parseInt(info[0]) : null)
        setPizzaDough(pizzaCategory ? "традиційне" : null)
        setPizzaWeight(pizzaCategory ? parseInt(info[2]) : parseInt(pizza.info))
        setAdditiveItems([])
    }, [pizza])

    const additiveItemsPrice = additiveItems.reduce((acc, item) => acc + item.price, 0)

    const totalPrice = Math.round(finalPrice + additiveItemsPrice)

    const addOrRemoveAdditiveItemToPizza = (item: AdditionalProduct) => {
        const currentItem = additiveItems.find((product) => product.name === item.name)

        if (currentItem) {
            const items = additiveItems.filter((product) => product.name !== item.name)
            setAdditiveItems(items)
        } else {
            setAdditiveItems((prev) => [...prev, item])
        }

    }

    const addToBasket = () => {
        const finalPizza = {
            ...pizza,
            _id: `${uuidv4()}`,
            info: pizzaCategory ? `${pizzaSize}см,${pizzaDough},${pizzaWeight}гр` : `${pizzaWeight} грам`,
            additiveItems,
            additiveItemsInfo: additiveItems.map((item) => item.name).sort().join(","),
            price: totalPrice
        }

        dispatch(addBasketItem(finalPizza))
        setPizzaSize(parseInt(info[0]))
        setPizzaDough("традиційне")
        setAdditiveItems([])
        setIsActive(0)
        setPizzaWeight(parseInt(info[2]))
        setFinalPrice(finalPrice)
        toast.success(`${pizza.name} було додано до замовлення!`)
        dispatch(onClose())
    }

    return <div className='flex flex-col md:flex-row max-w-[80dvw] sm:max-w-[50dvw] md:max-w-full items-center gap-0 md:gap-16'>
        <div className='relative w-full md:w-fit'>
            {pizza.discount ? <div className='px-2 py-1 bg-red-500 absolute top-0 md:-top-3 -left-1 rounded-md'>
                <p className='text-xs sm:text-base'>
                    Знижка {pizza.discount} %
                </p>
            </div> : ""}
            <img src={pizza.image} alt={pizza.name}
                className='min-w-[208px] w-52 h-36 md:min-w-[288px] md:w-72 md:h-72 mx-auto'
            />
        </div>
        <div>
            <h4 className='text-base md:text-xl text-black font-bold leading-4'>
                {pizza.name}
            </h4>
            <div className='flex items-center gap-2 mb-2'>
                {pizzaCategory ? <>
                    <p className='text-sm md:text-lg'>
                        {pizzaSize} см
                    </p>
                    <p className='text-sm md:text-lg'>
                        , {pizzaDough} тесто ,
                    </p>
                </> : null}
                <p className='text-sm md:text-lg'>
                    {pizzaWeight} гр.
                </p>
            </div>
            {pizzaCategory ? <div className='flex gap-2 items-center mb-2'>
                <Button
                    bgColor={isActive === 0 ? "bg-yellow" : "bg-gray-200"}
                    text='Маленька'
                    textColor={isActive === 0 ? "text-white" : "text-black"}
                    onClick={() => {
                        setIsActive(0)
                        setPizzaSize(26)
                        setPizzaWeight(parseInt(info[2]))
                        setFinalPrice(priceWithDiscont)
                    }}
                    className='rounded-lg text-xs md:text-base hover:bg-yellow duration-300 transition'
                />
                <Button
                    bgColor={isActive === 1 ? "bg-yellow" : "bg-gray-200"}
                    text='Середня'
                    textColor={isActive === 1 ? "text-white" : "text-black"}
                    onClick={() => {
                        setIsActive(1)
                        setPizzaSize(34)
                        setPizzaWeight(parseInt(info[2]) * 1.5)
                        setFinalPrice(priceWithDiscont * 1.4)
                    }}
                    className='rounded-lg text-xs md:text-base hover:bg-yellow duration-300 transition'
                />
                <Button
                    bgColor={isActive === 2 ? "bg-yellow" : "bg-gray-200"}
                    text='Велика'
                    textColor={isActive === 2 ? "text-white" : "text-black"}
                    onClick={() => {
                        setIsActive(2)
                        setPizzaSize(40)
                        setPizzaWeight(parseInt(info[2]) * 2)
                        setFinalPrice(priceWithDiscont * 1.8)
                    }}
                    className='rounded-lg text-xs md:text-base hover:bg-yellow duration-300 transition'
                />
            </div> : null}
            {pizzaCategory ? <div className='flex gap-2 items-center mb-4'>
                <Button
                    bgColor={pizzaDough === "традиційне" ? "bg-yellow" : "bg-gray-200"}
                    text='Традиційне'
                    textColor={pizzaDough === "традиційне" ? "text-white" : "text-black"}
                    onClick={() => {
                        setPizzaDough("традиційне")
                    }}
                    className='rounded-lg text-xs md:text-base w-1/2 hover:bg-yellow duration-300 transition'
                />
                <Button
                    bgColor={pizzaDough === "тонке" ? "bg-yellow" : "bg-gray-200"}
                    text='Тонке'
                    textColor={pizzaDough === "тонке" ? "text-white" : "text-black"}
                    onClick={() => {
                        setPizzaDough("тонке")
                    }}
                    className='rounded-lg text-xs md:text-base w-1/2 hover:bg-yellow duration-300 transition'
                />
            </div> : null}
            {pizzaCategory ? <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3 max-h-32 md:max-h-52 overflow-y-auto scrollbar-w-2 scrollbar-track-yellow-lighter scrollbar-thumb-yellow scrollbar-thumb-rounded pr-2'>
                {additives.map((item: AdditionalProduct) => (
                    <div className={`bg-white border 
                    ${additiveItems.some((product) => product.name === item.name)
                            ? "border-yellow"
                            : "border-gray-300"
                        } 
                    shadow-md px-3 md:px-6 py-1 md:py-4 flex flex-col items-center justify-center md:justify-start 
                    rounded-xl w-full
                    h-[120px] md:h-[150px] cursor-pointer hover:bg-gray-50 transition duration-200`}
                        key={item._id}
                        onClick={() => addOrRemoveAdditiveItemToPizza(item)}
                    >
                        <div className='md:flex-1'>
                            <div className='w-12 h-10 md:w-[64px] md:h-[64px] mx-auto'>
                                <img src={item.image} alt={item.name}
                                    className='w-full h-full object-contain'
                                />
                            </div>
                            <h6 className='font-bold text-sm text-black text-center leading-3 my-2 md:my-0'>
                                {item.name}
                            </h6>
                        </div>
                        <p className={`text-xs text-red-400 text-bold`}>
                            {item.price * item.quantity} грн
                        </p>
                    </div>
                ))}
            </div> : null}
            {!pizzaCategory ? <p className='text-gray-300 max-w-xs mb-5 leading-4'>
                {pizza.descr}
            </p> : null}
            <Button
                bgColor='bg-yellow'
                text={`Додати до кошика ${totalPrice} грн.`}
                textColor='text-black'
                onClick={addToBasket}
                className='text-sm md:text-base duration-300 transition hover:scale-105'
            />
        </div>
    </div>
}

export default PizzaPopup