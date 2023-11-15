import { useState, useRef, Dispatch, SetStateAction } from "react"
import Input from "../Input"
import { toast } from "react-hot-toast"
import { RootState, useAppSelector } from "../../store/store"
import axios from "axios"
import Button from "../Button"
import { createPizza } from "../../utils"
import { baseUrl } from "../../helpers/constants"
import { FaSpinner } from "react-icons/fa"
import { BsTrash } from "react-icons/bs"
import { useGetProductsQuery } from "../../store/services/products"

const CreateProduct = ({ setIsVisible }: { setIsVisible: Dispatch<SetStateAction<boolean>> }) => {
  const [name, setName] = useState<string>("")
  const [price, setPrice] = useState<string>("")
  const [pizzaWeight, setPizzaWeight] = useState<string>("")
  const [pizzaSize, setPizzaSize] = useState<string>("")
  const [pizzaDought, setPizzaDought] = useState<"традиційне" | "тонке">("традиційне")
  const [category, setCategory] = useState<"піца" | "суші" | "бургери" | "супи" | "шаурма">("піца")
  const [descr, setDescr] = useState<string>("")
  const [image, setImage] = useState<string>("")
  const [imageLoading, setIsImageLoading] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const { refetch } = useGetProductsQuery()

  const hiddenFileInput = useRef<null | HTMLInputElement>(null);

  const user = useAppSelector((state: RootState) => state.auth.googleUser)

  const token = user?.token ? user.token : ""
  const validForm = name && price && descr && image && pizzaWeight 
  && ((category === "піца") ? pizzaDought && pizzaSize : true);

  const uploadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    setIsImageLoading(true)
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
      toast.success('Зображення завантажено успішно')
    } catch (err) {
      toast.error("Щось пішло не так!")
    } finally {
      setIsImageLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    const newProduct = {
      name,
      image,
      descr,
      price: Number(price),
      category,
      info: category === "піца" ? `${pizzaSize},${pizzaDought},${pizzaWeight}` : pizzaWeight,
    }

    try {
      const res = await createPizza(newProduct, token)
      if (res?.message === "Продукт створено успішно!") {
        toast.success("Продукт створено успішно!")
        setDescr(""); setName(""); setImage(""); setPizzaSize("");
        setPizzaWeight(""); setPrice("")
        setIsVisible(false)
        refetch();
      } else {
        toast.error("Щось пішло не так!")
      }
    } catch (err) {
      toast.error("Щось пішло не так!")
    } finally {
      setLoading(false)
    }
  }

  const handeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value: "традиційне" | "тонке" = e.target.value as "традиційне" | "тонке";
    setPizzaDought(value)
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value: "піца" | "суші" | "бургери" | "супи" | "шаурма" = e.target.value as "піца" | "суші" | "бургери" | "супи" | "шаурма";
    setCategory(value)
  }

  const handleClick = () => {
    hiddenFileInput?.current?.click();
  };

  return (
    <div className="flex flex-col flex-1 px-4 sm:px-6 pb-4">
      <form className="flex-1 flex flex-col gap-3 w-full sm:max-w-lg" onSubmit={handleSubmit}>
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex flex-col gap-1 sm:gap-2">
            <p className="text-gray-300 text-base md:text-lg whitespace-nowrap">
              Назва продукту
            </p>
            <Input
              input={name}
              setInput={setName}
              placeholder="Введіть назву продукту"
              type="text"
              className="w-full"
            />
          </div>
          <div>
            <p className="text-gray-300 text-base md:text-lg sm:whitespace-nowrap mb-2">
              Ціна товару / категорія товару
            </p>
            <div className="flex gap-2 items-center">
              <Input
                input={price}
                setInput={setPrice}
                placeholder="Введіть ціну товару, грн."
                type="text"
                className="w-1/2"
              />
              <select className="w-1/2 h-10 border border-gray-400 rounded-lg outline-none focus:outline-none px-2 py-1"
                onChange={(e) => handleCategoryChange(e)}>
                <option value="піца">
                  піца
                </option>
                <option value="суші">
                  суші
                </option>
                <option value="бургери">
                  бургери
                </option>
                <option value="супи">
                  супи
                </option>
                <option value="шаурма">
                  шаурма
                </option>
              </select>
            </div>
          </div>
          <div>
            <p className="text-gray-300 text-base md:text-lg sm:whitespace-nowrap mb-2">
              Информація щодо продукту (приклад)
            </p>
            <div className={`flex flex-col sm:grid ${category === "піца" ? "sm:grid-cols-3" : ""} gap-2`}>
              {category === "піца" ? <>
                <Input
                  input={pizzaSize}
                  setInput={setPizzaSize}
                  placeholder="Діаметр (26см)"
                  type="text"
                  className="w-full"
                />
                <select className="w-full border border-gray-400 rounded-lg outline-none focus:outline-none px-2 py-1"
                  onChange={(e) => handeChange(e)}>
                  <option value="традиційне">
                    традиційне
                  </option>
                  <option value="тонке">
                    тонке
                  </option>
                </select>
              </> : null}
              <Input
                input={pizzaWeight}
                setInput={setPizzaWeight}
                placeholder="Вага (360гр)"
                type="text"
                className="w-full"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 sm:gap-2">
            <p className="text-gray-300 text-base md:text-lg whitespace-nowrap">
              Склад продукту (через кому)
            </p>
            <textarea
              value={descr}
              onChange={(e) => setDescr(e.target.value)}
              placeholder="Введіть склад продукту"
              className="w-full outline-none rounded-md border border-gray-400 px-3 py-2 focus:outline-none resize-none h-[100px] focus-within:border-yellow"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-gray-300 text-base md:text-lg whitespace-nowrap">
              {image ? "Ваше зображення" : "Завантажте зображення"}
            </p>
            <input
              type='file'
              onChange={uploadHandler}
              className="w-full hidden"
              ref={hiddenFileInput}
            />
            {!imageLoading
              ? image ? null : <Button
                text="Завантажте зображення"
                bgColor="bg-sky-400"
                textColor="text-white"
                disabled={imageLoading}
                onClick={handleClick}
                className="hover:bg-sky-500 w-fit"
                type="button"
              /> : <FaSpinner size={24} className="animate-spin" />}
            {image ? <div className="relative rounded-lg w-24 h-24 sm:w-36 sm:h-36 border border-gray-200">
              <img
                src={image}
                alt="image"
                className="w-full h-full object-contain"
              />
              <button
                className="absolute -top-2 -right-2 hover:scale-125 transition"
                type="button"
                onClick={() => setImage("")}
              >
                <BsTrash size={22} className="text-red-500" />
              </button>
            </div>
              : null}
          </div>
        </div>
        {!loading ? <Button
          bgColor="bg-yellow"
          text="Створити"
          textColor="text-white"
          disabled={!validForm}
          className="hover:bg-yellow/80"
        /> : (
          <div className="flex items-center justify-center mb-5">
            <FaSpinner size={30} className="animate-spin" />
          </div>
        )}
      </form>
    </div>
  )
}

export default CreateProduct

