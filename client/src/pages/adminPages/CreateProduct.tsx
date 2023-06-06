import { useState } from "react"
import Input from "../../components/Input"
import { toast } from "react-hot-toast"
import { RootState, useAppSelector } from "../../store/store"
import axios from "axios"
import Button from "../../components/Button"
import { createPizza } from "../../utils"
import { useNavigate } from "react-router-dom"
import { baseUrl } from "../../helpers/constants"

const CreateProduct = () => {
  const navigate = useNavigate()
  const [name, setName] = useState<string>("")
  const [price, setPrice] = useState<string>("")
  const [discount, setDiscount] = useState<number>(0)
  const [pizzaWeight, setPizzaWeight] = useState<string>("")
  const [pizzaSize, setPizzaSize] = useState<string>("")
  const [pizzaDought, setPizzaDought] = useState<"традиционное" | "тонкое">("традиционное")
  const [descr, setDescr] = useState<string>("")
  const [image, setImage] = useState<string>("")

  const user = useAppSelector((state: RootState) => state.auth.googleUser)

  const token = user?.token ? user.token : ""
  const validDiscount = discount >= 0 && discount < 100
  const validForm = name && price && pizzaSize && pizzaWeight && descr && image && discount && validDiscount;

  const uploadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      const { data } = await axios.post(`${baseUrl}/api/upload`, bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${token}`
        }
      })
      setImage(data.secure_url)
      toast.success('Картинка загружена успешно')
    } catch (err) {
      toast.error("Что-то пошло не так!")
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProduct = {
      name,
      image,
      descr,
      price: Number(price),
      category: "pizza",
      info: `${pizzaSize},${pizzaDought},${pizzaWeight}`,
      discount
    }

    try {
      await createPizza(newProduct, token)
      toast.success("Пицца успешно создана!")
      setDescr(""); setName(""); setImage(""); setPizzaSize("");
      setPizzaWeight(""); setPrice("")
      setTimeout(() => {
        navigate("/admin/all-products")
      }, 1000)
    } catch (err) {
      toast.error("Что-то пошло не так!")
    }
  }

  const handeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value: "традиционное" | "тонкое" = e.target.value as "традиционное" | "тонкое";
    setPizzaDought(value)
  }

  return (
    <div className="flex items-center min-h-[80vh]">
      <div>
        <h2 className="text-red-500 text-lg md:text-2xl font-bold mb-5">
          Создайте новую пиццу!
        </h2>
        <form className="flex flex-col gap-5 w-full sm:max-w-lg" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4 pb-2 border-b border-gray-400">
            <p className="text-gray-300 text-sm md:text-lg whitespace-nowrap">
              Имя пиццы
            </p>
            <Input
              input={name}
              setInput={setName}
              placeholder="Введите имя пиццы"
              type="text"
              className="w-full"
            />
          </div>
          <div className="pb-2 border-b border-gray-400">
            <p className="text-gray-300 text-sm md:text-lg sm:whitespace-nowrap mb-2">
              Цена пиццы / скидка на пиццу %
            </p>
            <div className="flex gap-2">
              <Input
                input={price}
                setInput={setPrice}
                placeholder="Введите цену пиццы, грн."
                type="text"
                className="w-1/2"
              />
              <input
                type="numer"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                placeholder="Введите скидку, %"
                className="w-1/2 h-[40px] outline-none rounded-md border border-gray-400 px-4 py-2"
                
              />
            </div>
            {!validDiscount ? <p className="text-xs text-red-500 text-center">
              Скидка должна быть в границах от 0 до 99
            </p>: ""}
          </div>
          <div className="pb-2 border-b border-gray-400">
            <p className="text-gray-300 text-sm md:text-lg sm:whitespace-nowrap mb-2">
              Информация о пицце (пример ввода в скобках)
            </p>
            <div className="flex flex-col sm:grid sm:grid-cols-3 gap-2">
              <Input
                input={pizzaSize}
                setInput={setPizzaSize}
                placeholder="Диаметр (26см)"
                type="text"
                className="w-full"
              />
              <select className="w-full border border-gray-400 rounded-lg outline-none focus:outline-none px-2 py-1"
                onChange={(e) => handeChange(e)}>
                <option value="традиционное">
                  традиционное
                </option>
                <option value="тонкое">
                  тонкое
                </option>
              </select>
              <Input
                input={pizzaWeight}
                setInput={setPizzaWeight}
                placeholder="Вес (360гр)"
                type="text"
                className="w-full"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 pb-2 border-b border-gray-400">
            <p className="text-gray-300 text-sm md:text-lg whitespace-nowrap">
              Описание продуктов
            </p>
            <textarea
              value={descr}
              onChange={(e) => setDescr(e.target.value)}
              placeholder="Введите продукты, которые содержит пицца"
              className="w-full outline-none rounded-md border border-gray-400 px-4 py-2 focus:outline-none resize-none h-[100px]"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 pb-2 border-b border-gray-400">
            <p className="text-gray-300 text-sm md:text-lg whitespace-nowrap">
              Файл картинки
            </p>
            <Input
              input={image}
              setInput={setImage}
              placeholder="Файл картинки"
              type="text"
              className="w-full"
              disabled
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 pb-2 border-b border-gray-400">
            <p className="text-gray-300 text-sm md:text-lg whitespace-nowrap">
              Загрузка картинки
            </p>
            <input
              type='file'
              onChange={uploadHandler}
              className="w-full"
            />
          </div>
          {!validForm && <p className="text-red-500 text-center font-bold text-sm md:text-lg">
            Заполните все поля!
          </p>
          }
          <Button
            bgColor="bg-yellow"
            text="Создать"
            textColor="text-white"
            disabled={!validForm}
          />
        </form>
      </div>
    </div>
  )
}

export default CreateProduct

