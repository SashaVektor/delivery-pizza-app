import { useState, useRef, useEffect } from "react"
import Input from "../Input"
import { toast } from "react-hot-toast"
import { RootState, useAppDispatch, useAppSelector } from "../../store/store"
import axios from "axios"
import Button from "../Button"
import { editPizzaItem } from "../../utils"
import { baseUrl } from "../../helpers/constants"
import { FaSpinner } from "react-icons/fa"
import { BsTrash } from "react-icons/bs"
import { useGetProductsQuery } from "../../store/services/products"
import { onClose } from "../../store/slices/modalSlice"

const EditProductForm = () => {
    const product = useAppSelector((state: RootState) => state.product.product)
    const dispatch = useAppDispatch();

    const [name, setName] = useState<string>("")
    const [price, setPrice] = useState<string>("")
    const [descr, setDescr] = useState<string>("")
    const [image, setImage] = useState<string>("")
    const [discount, setDiscount] = useState<string>("0")
    const [imageLoading, setIsImageLoading] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const { refetch } = useGetProductsQuery()

    useEffect(() => {
        setName(product?.name ? product.name : "")
        setPrice(product?.price ? product.price.toString() : "")
        setDescr(product?.descr ? product.descr : "")
        setImage(product?.image ? product.image : "")
        setDiscount(product?.discount ? product.discount.toString() : "0")
    }, [product])

    const hiddenFileInput = useRef<null | HTMLInputElement>(null);

    const user = useAppSelector((state: RootState) => state.auth.googleUser)

    const token = user?.token ? user.token : ""
    const validForm = name && price && descr && image && discount;

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
        const data = {
            id: product?._id,
            name,
            image,
            descr,
            price: Number(price),
            discount: Number(discount)
        }

        try {
            const res = await editPizzaItem(data, token)
            if (res?.message === "Продукт успішно змінено!") {
                toast.success("Продукт успішно змінено!")
                dispatch(onClose())
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

    const handleClick = () => {
        hiddenFileInput?.current?.click();
    };

    return (
        <div className="flex flex-col flex-1 px-4 sm:px-6 pb-4">
            <form className="flex-1 flex flex-col gap-3 w-full sm:max-w-lg" onSubmit={handleSubmit}>
                <div className="flex-1 flex flex-col gap-3">
                    <div className="flex flex-col gap-1 sm:gap-2">
                        <p className="text-gray-300 text-sm md:text-lg whitespace-nowrap">
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
                        <p className="text-gray-300 text-sm md:text-lg sm:whitespace-nowrap mb-2">
                            Ціна товару / знижка на товар (0-99)
                        </p>
                        <div className="flex gap-2 items-center">
                            <Input
                                input={price}
                                setInput={setPrice}
                                placeholder="Введіть ціну товару"
                                type="text"
                                className="w-1/2"
                            />
                            <Input
                                input={discount}
                                setInput={setDiscount}
                                placeholder="Введіть знижку на товар (0-99)"
                                type="text"
                                className="w-1/2"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 sm:gap-2">
                        <p className="text-gray-300 text-sm md:text-lg whitespace-nowrap">
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
                        <p className="text-gray-300 text-sm md:text-lg whitespace-nowrap">
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
                    text="Редагувати"
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

export default EditProductForm