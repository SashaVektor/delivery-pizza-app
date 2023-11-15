import { Link, useLocation, useNavigate } from "react-router-dom"
import Button from "./Button"
import Modal from "./Modal"
import AuthModal from "./AuthModal"
import { RootState, useAppDispatch, useAppSelector } from "../store/store"
import { setIsAuthModalOpen, setIsBasketModalOpen } from "../store/slices/modalSlice"
import BasketModal from "./BasketModal"
import { smoothScrollToCategory } from "../utils/smoothScrollToCategory"
import { BiExit, BiUser } from "react-icons/bi"
import { SlBasket } from "react-icons/sl"

const Header = () => {
  const user = useAppSelector((state: RootState) => state.auth.googleUser)
  const basketItems = useAppSelector((state: RootState) => state.basket.basketItems)
  const isAuthModalOpen = useAppSelector((state: RootState) => state.modal.isAuthModalOpen)
  const { pathname } = useLocation();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const path = window.location.pathname.includes("/basket") || window.location.pathname.includes("/order")


  return (
    <>
      <Modal
        title="Вхід / Реєстрація"
        isOpen={user ? false : isAuthModalOpen}
      >
        <AuthModal />
      </Modal>
      <BasketModal />
      <header className="fixed w-full drop-shadow-sm bg-white z-40 border-t sm:border-0 border-gray-300">
        <div className="max-w-7xl mx-auto p-2 px-4 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <Link to="/" className="block w-10 h-10 sm:w-14 sm:h-14 hover:rotate-[360deg] transition duration-300">
                <img
                  src="https://res.cloudinary.com/dxvrhfhtl/image/upload/v1698851907/jm8xyhersfvf6z4oczlc.png"
                  alt="logo"
                  className="w-full h-full"
                />
              </Link>
              <div className="block">
                <h4 className="text-black text-lg leading-5 sm:leading-7">
                  Доставка піци {" "}
                  <span className="text-yellow">Київ</span>
                </h4>
                <div className="flex gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <p className="text-sm">Час доставки - </p>
                    <p className="text-sm">від 30 хв</p>
                  </div>
                </div>
              </div>
            </div>
            {pathname === "/" ? <div className="hidden lg:flex items-center gap-5">
              <button className="text-lg text-yellow hover:text-yellow/60 transition"
                onClick={() => smoothScrollToCategory("pizza")}
              >
                Піца
              </button>
              <button className="text-lg text-yellow hover:text-yellow/60 transition"
                onClick={() => smoothScrollToCategory("sushi")}
              >
                Суші
              </button>
              <button className="text-lg text-yellow hover:text-yellow/60 transition"
                onClick={() => smoothScrollToCategory("burgers")}
              >
                Бургери
              </button>
              <button className="text-lg text-yellow hover:text-yellow/60 transition"
                onClick={() => smoothScrollToCategory("shawarmas")}
              >
                Шаурма
              </button>
              <button className="text-lg text-yellow hover:text-yellow/60 transition"
                onClick={() => smoothScrollToCategory("soups")}
              >
                Супи
              </button>
            </div> : null}
            <div className="gap-4 sm:gap-2 items-center flex">
              {!user ? <button
                className="sm:text-gray-400 sm:transition sm:hover:bg-gray-50 sm:px-2 sm:py-1 sm:rounded-lg"
                onClick={() => dispatch(setIsAuthModalOpen())}>
                <BiExit className="block sm:hidden text-black" size={26} />
                <p className="hidden sm:block">
                  Вхід
                </p>
              </button> : <button
                className="sm:text-gray-400 sm:transition sm:hover:bg-gray-50 sm:px-2 sm:py-1 sm:rounded-lg"
                onClick={() => navigate("/userpage")}
              >
                <p className="hidden sm:block">
                  Мій кабінет
                </p>
                <BiUser className="block sm:hidden text-black" size={26} />
              </button>
              }
              {!path && <>
                <Button
                  bgColor="bg-yellow"
                  textColor="text-black"
                  width="160px"
                  height="40px"
                  text={`Корзина | ${basketItems.length}`}
                  onClick={() => dispatch(setIsBasketModalOpen())}
                  className="hover:bg-yellow/70 transition duration-300 hidden sm:block"
                />
                <button
                  className="relative block sm:hidden"
                  onClick={() => dispatch(setIsBasketModalOpen())}
                >
                  <div className="absolute -right-1 -top-2 rounded-full w-4 h-4 bg-yellow flex items-center justify-center">
                    <p className="text-xs leading-3 text-white">{basketItems.length}</p>
                  </div>
                  <SlBasket className="block sm:hidden text-black" size={26} />
                </button>
              </>}
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
