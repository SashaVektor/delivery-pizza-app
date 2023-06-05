import { FC } from 'react'
import { BasketItems } from "../types/typings"
import { GoogleUser } from '../types/typings'
import { User } from '../types/typings'
import Button from './Button'
import { useNavigate } from 'react-router-dom'

interface MobileMenuProps {
    isMobileMenuOpen: boolean
    user: GoogleUser | User | null
    basketItems: BasketItems[]
    path: boolean
    setIsBasketPopupOpen: React.Dispatch<React.SetStateAction<boolean>>
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    isBasketPopupOpen: boolean
    setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const MobileMenu: FC<MobileMenuProps> = ({ isMobileMenuOpen, user, basketItems, path,
    setIsOpen, setIsBasketPopupOpen, isBasketPopupOpen, setIsMobileMenuOpen }) => {
    const navigate = useNavigate()
    return <div className={`${isMobileMenuOpen ? "block" : "hidden"} px-4 py-5 absolute bg-white border border-yellow rounded-lg shadow-md top-10 -right-2 w-[200px] z-[48]`}>
        <div className="flex flex-col gap-4 items-center">
            {!user ? <button className="text-gray-400"
                onClick={() => {
                    setIsOpen(true)
                    setIsMobileMenuOpen(false)
                }}>
                Войти
            </button> : <button
                className="text-gray-400"
                onClick={() => {
                    navigate("/userpage")
                    setIsMobileMenuOpen(false)
                }}
            >
                Мой профиль
            </button>
            }
            {!path && <Button
                bgColor="bg-yellow"
                textColor="text-black"
                width="160px"
                height="40px"
                text={`Корзина | ${basketItems.length}`}
                onClick={() => {
                    setIsBasketPopupOpen(!isBasketPopupOpen)
                    setIsMobileMenuOpen(false)
                }}
            />}
        </div>
    </div>
}

export default MobileMenu