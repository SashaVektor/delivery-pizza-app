import { FC, useState } from 'react'
import { AdditionalProduct, PizzaItem } from '../types/typings'
import Button from './Button'
import { additives } from '../helpers/constants/additives'
import { toast } from 'react-hot-toast'
import { useAppDispatch } from '../store/store'
import { addBasketItem } from '../store/slices/basketSlice'
import { v4 as uuidv4 } from 'uuid';

interface PizzaPopupProps {
    pizza: PizzaItem
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const PizzaPopup: FC<PizzaPopupProps> = ({ pizza, setIsOpen }) => {
    const info = pizza.info.split(",")
    const dispatch = useAppDispatch()

    const [pizzaSize, setPizzaSize] = useState<number>(parseInt(info[0]))
    const [pizzaDough, setPizzaDough] = useState<"традиционное" | "тонкое">("традиционное")
    const [pizzaWeight, setPizzaWeight] = useState<number>(parseInt(info[2]))
    const [isActive, setIsActive] = useState<number>(0)
    const [finalPrice, setFinalPrice] = useState<number>(pizza.price)
    const [additiveItems, setAdditiveItems] = useState<AdditionalProduct[]>(pizza.additiveItems || [])

    const additiveItemsPrice = additiveItems.reduce((acc, item) => acc + item.price, 0)

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
            info: `${pizzaSize}см,${pizzaDough},${pizzaWeight}гр`,
            additiveItems,
            additiveItemsInfo: additiveItems.map((item) => item.name).sort().join(","),
            price: Math.round(finalPrice + additiveItemsPrice)
        }
        
        dispatch(addBasketItem(finalPizza))
        setPizzaSize(parseInt(info[0]))
        setPizzaDough("традиционное")
        setAdditiveItems([])
        setIsActive(0)
        setPizzaWeight(parseInt(info[2]))
        setFinalPrice(pizza.price)
        toast.success(`${pizza.name} была добавлена в ваш заказ!`)
        setIsOpen(false)
    }

    return <div className='flex items-center gap-8'>
        <div className='w-72 h-72'>
            <img src={pizza.image} alt={pizza.name}
                className='w-full h-full object-contain'
            />
        </div>
        <div>
            <h4 className='text-xl text-black font-bold'>
                {pizza.name}
            </h4>
            <div className='flex items-center gap-2 mb-2'>
                <p className='text-lg text-gray-300'>
                    {pizzaSize} см,
                </p>
                <p className='text-lg text-gray-300'>
                    {pizzaDough} тесто,
                </p>
                <p className='text-lg text-gray-300'>
                    {pizzaWeight} г
                </p>
            </div>
            <div className='flex gap-2 items-center mb-2'>
                <Button
                    bgColor={isActive === 0 ? "bg-yellow" : "bg-gray-200"}
                    text='Маленькая'
                    textColor={isActive === 0 ? "text-white" : "text-black"}
                    onClick={() => {
                        setIsActive(0)
                        setPizzaSize(26)
                        setPizzaWeight(parseInt(info[2]))
                        setFinalPrice(pizza.price)
                    }}
                    className='rounded-lg'
                />
                <Button
                    bgColor={isActive === 1 ? "bg-yellow" : "bg-gray-200"}
                    text='Средняя'
                    textColor={isActive === 1 ? "text-white" : "text-black"}
                    onClick={() => {
                        setIsActive(1)
                        setPizzaSize(34)
                        setPizzaWeight(parseInt(info[2]) * 1.5)
                        setFinalPrice(pizza.price * 1.4)
                    }}
                    className='rounded-lg'
                />
                <Button
                    bgColor={isActive === 2 ? "bg-yellow" : "bg-gray-200"}
                    text='Большая'
                    textColor={isActive === 2 ? "text-white" : "text-black"}
                    onClick={() => {
                        setIsActive(2)
                        setPizzaSize(40)
                        setPizzaWeight(parseInt(info[2]) * 2)
                        setFinalPrice(pizza.price * 1.8)
                    }}
                    className='rounded-lg'
                />
            </div>
            <div className='flex gap-2 items-center mb-4'>
                <Button
                    bgColor={pizzaDough === "традиционное" ? "bg-yellow" : "bg-gray-200"}
                    text='Традиционное'
                    textColor={pizzaDough === "традиционное" ? "text-white" : "text-black"}
                    onClick={() => {
                        setPizzaDough("традиционное")
                    }}
                    className='rounded-lg w-1/2'
                />
                <Button
                    bgColor={pizzaDough === "тонкое" ? "bg-yellow" : "bg-gray-200"}
                    text='Тонкое'
                    textColor={pizzaDough === "тонкое" ? "text-white" : "text-black"}
                    onClick={() => {
                        setPizzaDough("тонкое")
                    }}
                    className='rounded-lg w-1/2'
                />
            </div>
            <div className='grid grid-cols-3 gap-2 mb-3 max-h-52 overflow-y-auto scrollbar-w-2 scrollbar-track-yellow-lighter scrollbar-thumb-yellow scrollbar-thumb-rounded pr-2'>
                {additives.map((item: AdditionalProduct) => (
                    <div className={`bg-white border 
                    ${additiveItems.some((product) => product.name === item.name)
                            ? "border-yellow"
                            : "border-gray-300"
                        } 
                    shadow-md px-6 py-4 flex flex-col items-center rounded-xl w-[115px] 
                    h-[150px] cursor-pointer`}
                        key={item._id}
                        onClick={() => addOrRemoveAdditiveItemToPizza(item)}
                    >
                        <div className='flex-1'>
                            <div className='w-[64px] h-[64px] mx-auto'>
                                <img src={item.image} alt={item.name}
                                    className='w-full h-full object-contain'
                                />
                            </div>
                            <h6 className='font-bold text-sm text-black text-center leading-3'>
                                {item.name}
                            </h6>
                        </div>
                        <p className={`text-xs text-red-400 text-bold`}>
                            {item.price * item.quantity} грн
                        </p>
                    </div>
                ))}
            </div>
            <Button
                bgColor='bg-yellow'
                text={`Добавить в корзину ${Math.round(finalPrice + additiveItemsPrice)} грн.`}
                textColor='text-black'
                onClick={addToBasket}
            />
        </div>
    </div>
}

export default PizzaPopup