import { Link } from "react-router-dom"
import logo from "../assets/logo.png"
import FooterCard from "./FooterCard"
import {FaViber, FaInstagram, FaTelegram, FaFacebook, FaYoutube,} from "react-icons/fa"
import {BsFillTelephoneFill} from "react-icons/bs"
import Button from "./Button"


const Footer = () => {
  return (
    <footer className="bg-white p-4 lg:p-12 py-10 border-t border-gray-400">
      <div className="max-w-7xl w-full flex flex-col sm:flex-row mx-auto px-4 justify-center gap-5 lg:gap-32">
        <div>
          <Link to="/" className="mb-8 w-[90px] h-[70px] block">
            <img src={logo} alt="log"
              className="w-full h-full object-contain"
            />
          </Link>
          <div className="flex items-center gap-5 mb-6">
            <Link to="/" className="text-black text-lg font-medium transition-all duration-150 hover:text-black/50">
              Калорийность и состав
            </Link>
            <Link to="/" className="text-black text-lg font-medium transition-all duration-150 hover:text-black/50">
              Правовая информация
            </Link>
          </div>
          <h4 className="text-black text-md font-bold mb-4">
            Мы в соцсетях
          </h4>
          <div className="flex gap-10 mb-10">
            <div className="flex flex-col gap-4">
              <a href="https://www.youtube.com/" target="_blank" referrerPolicy="no-referrer"
                className="text-gray-400 text-sm transition-all duration-200 hover:text-black">
                Youtube
              </a>
              <a href="https://www.instagram.com/" target="_blank" referrerPolicy="no-referrer"
                className="text-gray-400 text-sm transition-all duration-200 hover:text-black">
                Instagram
              </a>
            </div>
            <div className="flex flex-col gap-4">
              <a href="https://www.facebook.com/" target="_blank" referrerPolicy="no-referrer"
                className="text-gray-400 text-sm transition-all duration-200 hover:text-black">
                Facebook
              </a>
              <a href="https://www.telegram.com/" target="_blank" referrerPolicy="no-referrer"
                className="text-gray-400 text-sm transition-all duration-200 hover:text-black">
                Telegram
              </a>
            </div>
            <p
              className="text-gray-400 text-sm">
              Киев, улица Проспект победы 31а
            </p>
          </div>
          <p className="text-black text-md font-medium">
          Avektor Все права защищены © 2023
          </p>
        </div>
        <div>
          <h4 className="text-black text-lg mb-5 font-bold">
          Остались вопросы? А мы всегда на связи:
          </h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 grid-rows-2 gap-4 mb-10">
            <FooterCard 
            icon={<BsFillTelephoneFill size={22}/>}
            path="/"
            />
            <FooterCard 
            icon={<FaFacebook size={22}/>}
            path="/"
            />
            <FooterCard 
            icon={<FaInstagram size={22}/>}
            path="/"
            />
            <FooterCard 
            icon={<FaTelegram size={22}/>}
            path="/"
            />
            <FooterCard 
            icon={<FaViber size={22}/>}
            path="/"
            />
            <FooterCard 
            icon={<FaYoutube size={22}/>}
            path="/"
            />
            <Button 
            bgColor="border border-gray-300"
            text="Связь с нами"
            width="216px"
            height="52px"
            textColor="text-black"
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onClick={() => {}}
            className="col-span-2"
            />
          </div>
          <a
            href="tel:380950083933"
            className="text-xl text-yellow"
          >
            +380950083933
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
