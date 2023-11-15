import { Link, useLocation } from "react-router-dom"
import FooterCard from "./FooterCard"
import { FaViber, FaInstagram, FaTelegram, FaFacebook, FaYoutube, } from "react-icons/fa"
import { BsFillTelephoneFill } from "react-icons/bs"
import Button from "./Button"


const Footer = () => {
  const {pathname} = useLocation();

  return (
    <footer className={`${pathname === "/" ? "pb-20 sm:pb-4" : ""} bg-white p-4 lg:p-12 lg:py-10 border-t border-gray-400`}>
      <div className="max-w-7xl w-full flex flex-col sm:flex-row mx-auto px-4 justify-center gap-5 lg:gap-32">
        <div>
          <Link to="/" className="mb-3 w-[90px] h-[90px] block">
            <img
              src="https://res.cloudinary.com/dxvrhfhtl/image/upload/v1698851907/jm8xyhersfvf6z4oczlc.png"
              alt="logo"
              className="w-full h-full object-contain"
            />
          </Link>
          <h4 className="text-black text-lg font-bold mb-2">
            Ми в соцмережах
          </h4>
          <div className="flex gap-2 md:gap-5 mb-3 md:mb-5 flex-wrap max-w-xs">
            <a href="https://www.youtube.com/" target="_blank" referrerPolicy="no-referrer"
              className="text-gray-400 text-sm transition-all duration-200 hover:text-black">
              Youtube
            </a>
            <a href="https://www.instagram.com/" target="_blank" referrerPolicy="no-referrer"
              className="text-gray-400 text-sm transition-all duration-200 hover:text-black">
              Instagram
            </a>
            <a href="https://www.facebook.com/" target="_blank" referrerPolicy="no-referrer"
              className="text-gray-400 text-sm transition-all duration-200 hover:text-black">
              Facebook
            </a>
            <a href="https://www.telegram.com/" target="_blank" referrerPolicy="no-referrer"
              className="text-gray-400 text-sm transition-all duration-200 hover:text-black">
              Telegram
            </a>
            <p
              className="text-gray-400 text-sm">
              Київ, вулиця Перемоги 31а
            </p>
          </div>
          <p className="text-black text-md font-medium">
            sasha_veklich Усі права захищені © 2023
          </p>
        </div>
        <div>
          <h4 className="text-black text-lg mb-5 font-bold">
            Залишилися питання? А ми завжди на зв'язку:
          </h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 grid-rows-2 gap-2 md:gap-4 mb-4 md:mb-10">
            <FooterCard
              icon={<BsFillTelephoneFill size={22} />}
              path="/"
            />
            <FooterCard
              icon={<FaFacebook size={22} />}
              path="/"
            />
            <FooterCard
              icon={<FaInstagram size={22} />}
              path="/"
            />
            <FooterCard
              icon={<FaTelegram size={22} />}
              path="/"
            />
            <FooterCard
              icon={<FaViber size={22} />}
              path="/"
            />
            <FooterCard
              icon={<FaYoutube size={22} />}
              path="/"
            />
            <Button
              bgColor="border border-gray-300"
              text="Зв'язок з нами"
              width="216px"
              height="52px"
              textColor="text-black"
              className="col-span-2 transition hover:scale-110"
            />
          </div>
          <a
            href="tel:380950083933"
            className="block w-fit text-lg text-yellow transition hover:scale-110"
          >
            +380950083933
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
