import { FC } from 'react'
import { useState } from "react"
import Input from "./Input"
import Button from "./Button"
import { GoogleLogin } from '@react-oauth/google';
import { createUser } from "../utils";
import { registerUser, userLogin } from "../store/slices/authSlice";
import { toast } from 'react-hot-toast/headless';
import { RootState, useAppDispatch, useAppSelector } from '../store/store';
import { googleUserLogin } from '../store/slices/authSlice';

interface AuthModalProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthModal: FC<AuthModalProps> = ({ setIsOpen }) => {
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isLoginModal, setIsLoginModal] = useState<boolean>(true)
    const dispatch = useAppDispatch()

    const error = useAppSelector((state: RootState) => state.auth.error)

    const isCorrectName = name.length > 1

    const isCorrectEmail = email.includes("@") && email.length > 8

    const isCorrectPassword = password.length > 5

    const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isCorrectEmail || !isCorrectPassword) {
            return
        }
        const userInfo = {
            email, password
        }
        await dispatch(userLogin(userInfo))
        setEmail("")
        setPassword("")
    }

    const registerNewUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isCorrectEmail || !isCorrectPassword) {
            return
        }
        const newUser = {
            name, email, password
        }
        await dispatch(registerUser(newUser))
        setEmail("")
        setPassword("")
        setName("")
    }

    return (
        <form className="flex flex-col gap-1 md:gap-3 items-center justify-center"
            onSubmit={isLoginModal ? loginUser : registerNewUser}>
            {!isLoginModal && (
                <div className='md:border-b border-gray-400 p-2'>
                    <div className="flex gap-10 items-center mb-1">
                        <h4 className="text-gray-400 text-md hidden md:block">
                            Укажите свое имя
                        </h4>
                        <Input
                            placeholder="Ваша почта"
                            input={name}
                            setInput={setName}
                            type="text"
                            width="260px"
                        />
                    </div>
                    {!isCorrectName &&
                        <h4 className="text-red-500">
                            Укажите имя*
                        </h4>
                    }
                </div>
            )}
            <div className='md:border-b border-gray-400 p-2'>
                <div className="flex gap-10 items-center mb-1 ">
                    <h4 className="text-gray-400 text-md hidden md:block">
                        Укажите свою почту
                    </h4>
                    <Input
                        placeholder="Ваша почта"
                        input={email}
                        setInput={setEmail}
                        type="email"
                        width="260px"
                    />
                </div>
                {!isCorrectEmail &&
                    <h4 className="text-red-500">
                        Неправильный формат почты*
                    </h4>
                }
            </div>
            <div>
                <div className='md:border-b border-gray-400 p-2'>
                    <div className="flex gap-10 items-center mb-1">
                        <h4 className="text-gray-400 text-md hidden md:block">
                            Укажите свой пароль
                        </h4>
                        <Input
                            placeholder="Ваш пароль"
                            input={password}
                            setInput={setPassword}
                            type="password"
                            width="260px"
                        />
                    </div>
                    {!isCorrectPassword &&
                        <h4 className="text-red-500">
                            Неправильный формат пароля*
                        </h4>
                    }
                </div>
                {error && <h2 className='text-red-500 text-base font-bold text-center mt-3'>
                    {isLoginModal ? "Неправильный логин или пароль!" : "Данный email уже зарегестрирован!"}
                </h2>}
            </div>
            <p className="text-black text-lg font-medium">
                OR
            </p>
            <GoogleLogin
                onSuccess={async (credentialResponse) => {
                    const user = await createUser(credentialResponse)
                    await dispatch(googleUserLogin(user))
                    setIsOpen(false)
                }}
                onError={() => {
                    toast.error("Something went wrong")
                }}
            />
            <div className="flex gap-10 items-center">
                <Button
                    bgColor="bg-yellow"
                    text={isLoginModal ? "Войти" : "Зарегестрироваться"}
                    textColor="text-white"
                    className="rounded-xl w-[200px] h-[55px]"

                />
                <p className="hidden md:block text-md text-gray-300 max-w-[320px]">
                    Продолжая, вы соглашаетесь со сбором и обработкой персональных данных и пользовательским соглашением
                </p>
            </div>
            <div className='flex gap-1 items-center text-sm text-black'>
                <p>{isLoginModal ? "Нету аккаунта?" : "Есть аккаунт?"}</p>
                <button className='text-blue-300'
                    type='button'
                    onClick={isLoginModal
                        ? () => setIsLoginModal(false)
                        : () => setIsLoginModal(true)
                    }>
                    {isLoginModal ? "Зарегестрируйтесь!" : "Войдите!"}
                </button>
            </div>
        </form>
    )
}

export default AuthModal
