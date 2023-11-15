import { BiSushi } from "react-icons/bi";
import { FaHamburger, FaPizzaSlice } from "react-icons/fa";
import { MdSoupKitchen } from "react-icons/md"
import { GiDonerKebab } from "react-icons/gi"
import { smoothScrollToCategory } from "../utils/smoothScrollToCategory";


const MobileNavigate = () => {

    return (
        <div className="rounded-t-lg fixed w-[100dvw] bottom-0 left-0 bg-white drop-shadow-md z-30 py-2 px-3 border-t border-gray-300">
            <div className="flex items-center justify-between gap-5">
                <button
                    className="flex flex-col items-center gap-1"
                    onClick={() => smoothScrollToCategory("pizza")}
                >
                    <FaPizzaSlice size={20} />
                    <span>
                        Піца
                    </span>
                </button>
                <button
                    className="flex flex-col items-center gap-1"
                    onClick={() => smoothScrollToCategory("sushi")}
                >
                    <BiSushi size={22} />
                    <span>
                        Суші
                    </span>
                </button>
                <button
                    className="flex flex-col items-center gap-1"
                    onClick={() => smoothScrollToCategory("burgers")}
                >
                    <FaHamburger size={22} />
                    <span>
                        Бургери
                    </span>
                </button>
                <button
                    className="flex flex-col items-center gap-1"
                    onClick={() => smoothScrollToCategory("shawarmas")}
                >
                    <GiDonerKebab size={22} />
                    <span>
                        Шаурма
                    </span>
                </button>
                <button
                    className="flex flex-col items-center gap-1"
                    onClick={() => smoothScrollToCategory("soups")}
                >
                    <MdSoupKitchen size={22} />
                    <span>
                        Супи
                    </span>
                </button>
            </div>
        </div>
    )
}

export default MobileNavigate
