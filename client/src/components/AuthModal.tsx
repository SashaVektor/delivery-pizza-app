import { useState } from "react"
import Input from "./Input"
import Button from "./Button"
import { GoogleLogin } from '@react-oauth/google';
import { createUser } from "../utils";
import { toast } from 'react-hot-toast/headless';
import { useAppDispatch } from '../store/store';
import { onClose } from "../store/slices/modalSlice";
import { FaSpinner } from "react-icons/fa";
import { googleUserLogin, registerUser, userLogin } from "../utils/auth";


const AuthModal = () => {
    
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isLoginModal, setIsLoginModal] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    const isCorrectName = name.length > 2

    const isCorrectEmail = email.includes("@") && email.length > 8

    const isCorrectPassword = password.length > 5

    const validLoginForm = isCorrectEmail && isCorrectPassword

    const validRegisterForm = isCorrectName && isCorrectPassword && isCorrectName


    const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isCorrectEmail || !isCorrectPassword) {
            return
        }

        setLoading(true)

        const userInfo = {
            email, password
        }
        try {
            const res = await dispatch(userLogin(userInfo))
            if (res.payload?.email) {
                toast.success("Вхід виконаний успішно!")
            } else {
                toast.error("Невірний логін або пароль!")
            }
        } catch (err) {
            toast.error("Щось пішло не так!")
        } finally {
            setEmail("")
            setPassword("")
            setLoading(false)
        }

    }

    const registerNewUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isCorrectEmail || !isCorrectPassword || !isCorrectName) {
            return
        }

        setLoading(true)

        const newUser = {
            name, email, password
        }

        try {
            const res = await dispatch(registerUser(newUser))
            if (res.payload?.email) {
                toast.success("Реєстрація виконана успішно!")
            } else {
                toast.error("Перевірте правильність даних!")
            }
        } catch (err) {
            toast.error("Щось пішло не так!")
        } finally {
            setEmail("")
            setPassword("")
            setName("")
            setLoading(false)
        }

    }

    return (
        <form className="flex flex-col sm:py-1 gap-3 w-[80dvw] sm:w-[400px]"
            onSubmit={isLoginModal ? loginUser : registerNewUser}>
            {!isLoginModal && (
                <div className='md:border-b border-gray-400 sm:py-1'>
                    <div className="flex flex-col gap-1 mb-1">
                        <h4 className="text-gray-400 hidden md:block">
                            Вкажіть своє ім'я
                        </h4>
                        <Input
                            placeholder="Ваше ім'я"
                            input={name}
                            setInput={setName}
                            type="text"
                            width="w-full"
                        />
                    </div>
                </div>
            )}
            <div className='md:border-b border-gray-400 sm:py-1'>
                <div className="flex flex-col gap-1 mb-1">
                    <h4 className="text-gray-400 hidden md:block">
                        Вкажіть вашу пошту
                    </h4>
                    <Input
                        placeholder="Ваша пошта"
                        input={email}
                        setInput={setEmail}
                        type="email"
                        width="w-full"
                    />
                </div>
            </div>
            <div>
                <div className='md:border-b border-gray-400 sm:py-1'>
                    <div className="flex flex-col gap-1 mb-1">
                        <h4 className="text-gray-400 hidden md:block">
                            Вкажіть ваш пароль
                        </h4>
                        <Input
                            placeholder="Ваш пароль"
                            input={password}
                            setInput={setPassword}
                            type="password"
                            width="w-full"
                        />
                    </div>
                </div>
            </div>
            {!loading ? <div className="flex justify-center">
                <GoogleLogin
                    onSuccess={async (credentialResponse) => {
                        setLoading(true)
                        try {
                            const user = await createUser(credentialResponse)
                            const res = await dispatch(googleUserLogin(user))
                            if(res.payload?.email) {
                                toast.success('Вхід виконаний успішно!')
                                dispatch(onClose()) 
                            } else {
                                toast.success('Щось пішло не так!')
                            } 
                        } catch (err) {
                            toast.success('Щось пішло не так!')
                        } finally {
                            setLoading(false)
                        }
                    }}
                    onError={() => {
                        toast.error("Something went wrong")
                    }}
                />
            </div> : null}
            {!loading ? <Button
                bgColor="bg-yellow"
                text={isLoginModal ? "Вхід" : "Реєстрація"}
                textColor="text-white"
                height='40px'
                className="rounded-lg px-2 py-1 w-full"
                disabled={isLoginModal ? !validLoginForm : !validRegisterForm}
            /> : <div className="flex items-center justify-center">
                <FaSpinner size={30} className="animate-spin" />
            </div>}
            <div className='flex gap-1 items-center text-sm text-black justify-center'>
                <p>{isLoginModal ? "Немає аккаунту?" : "Є аккаунт?"}</p>
                <button className='text-blue-300 hover:text-blue-400 transition'
                    type='button'
                    onClick={isLoginModal
                        ? () => setIsLoginModal(false)
                        : () => setIsLoginModal(true)
                    }>
                    {isLoginModal ? "Зареєструйтеся!" : "Ввійти!"}
                </button>
            </div>
        </form>
    )
}

export default AuthModal
