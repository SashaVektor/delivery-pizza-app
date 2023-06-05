import logo from "../assets/logo.png"
import { Link, useNavigate } from "react-router-dom"
import { CiDeliveryTruck } from "react-icons/ci"
import { AiFillStar } from "react-icons/ai"
import { useState } from "react"
import Input from "./Input"
import Button from "./Button"
import { BsFillSearchHeartFill } from "react-icons/bs"
import Modal from "./Modal"
import AuthModal from "./AuthModal"
import { RootState, useAppSelector } from "../store/store"
import BasketPopup from "./BasketPopup"
import {GiHamburgerMenu} from "react-icons/gi"
import MobileMenu from "./MobileMenu"

const Header = () => {
  const [search, setSearch] = useState<string>("")
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isBasketPopupOpen, setIsBasketPopupOpen] = useState<boolean>(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
  const user = useAppSelector((state: RootState) => state.auth.googleUser)
  const basketItems = useAppSelector((state: RootState) => state.basket.basketItems)

  const navigate = useNavigate();
  const path = window.location.pathname.includes("/basket") || window.location.pathname.includes("/order")


  return (
    <>
      <Modal
        title="Вход на сайт"
        isOpen={user ? false : isOpen}
        setIsOpen={setIsOpen}
      >
        <AuthModal
          setIsOpen={setIsOpen}
        />
      </Modal>
      <header className={`fixed w-full h-[${user ? "110px" : "90px"}] shadow-sm bg-white z-40`}>
        {user && <div className="bg-yellow p-1 text-center text-sm">
          <p>Вы вошли как: {user.name}</p>
        </div>}
        <div className="max-w-7xl mx-auto p-4 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link to="/" className="block w-10 h-10 sm:w-20 sm:h-16">
                <img src={logo} alt="logo" className="w-full h-full object-contain"/>
              </Link>
              <div className="hidden xl:block">
                <h4 className="text-black text-lg mb-1">
                  Доставка пиццы {" "}
                  <span className="text-yellow">Киев</span>
                </h4>
                <div className="flex gap-4 items-center">
                  <div className="flex items-center gap-1">
                    <CiDeliveryTruck className="text-yellow" size={20} />
                    <p className="text-sm">Glovo - </p>
                    <p className="text-sm">4.8</p>
                    <AiFillStar size={16} className="text-yellow" />
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm">Время доставки - </p>
                    <p className="text-sm">от 30 мин</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <Input
                placeholder="Поиск..."
                type="text"
                input={search}
                setInput={setSearch}
                width="w-[200px] sm:w-[300px]"
              />
              <button className="w-[40px] h-[40px] -ml-5 flex items-center justify-center bg-yellow rounded-r-lg disabled:bg-gray-500 disabled:cursor-not-allowed"
                disabled={!search}
                onClick={() => {
                  navigate(`/search/${search}`)
                  setSearch("")
                }}>
                <BsFillSearchHeartFill size={18} className="text-white" />
              </button>
            </div>
            <a
              href="tel:380950083933"
              className="text-xl text-yellow hidden lg:block xs"
            >
              +380950083933
            </a>
            <div className="hidden gap-4 items-center md:flex">
              {!user ? <button className="text-gray-400" onClick={() => setIsOpen(true)}>
                Войти
              </button> : <button
                className="text-gray-400"
                onClick={() => navigate("/userpage")}
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
                onClick={() => setIsBasketPopupOpen(!isBasketPopupOpen)}
              />}
            </div>
            <div className="block md:hidden relative">
              <GiHamburgerMenu size={34} className="text-yellow cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
              <MobileMenu 
              isMobileMenuOpen={isMobileMenuOpen}
              user={user}
              basketItems={basketItems}
              path={path}
              isBasketPopupOpen={isBasketPopupOpen}
              setIsBasketPopupOpen={setIsBasketPopupOpen}
              setIsOpen={setIsOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
              />
            </div>
          </div>
          <BasketPopup
            items={basketItems}
            isBasketPopupOpen={isBasketPopupOpen}
            setIsBasketPopupOpen={setIsBasketPopupOpen}
          />
        </div>
      </header>
    </>
  )
}

export default Header
