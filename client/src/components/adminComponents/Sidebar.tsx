import { Link, useLocation } from "react-router-dom"
import { CiPizza } from "react-icons/ci"
import { MdExitToApp } from "react-icons/md"
import AdminLink from "./AdminLink"
import { AiOutlineOrderedList } from "react-icons/ai"
import { MdOutlineDashboardCustomize } from "react-icons/md"

const Sidebar = () => {
  const { pathname } = useLocation()
  return (
    <aside className='hidden sm:flex flex-col bg-violet-300 shadow-md w-[240px] fixed top-0 left-0 h-[100dvh] overflow-y-auto scrollbar-w-2 scrollbar-track-yellow-lighter scrollbar-thumb-yellow scrollbar-thumb-rounded'>
      <div className="border-b border-gray-400 px-2">
        <Link to="/admin"
          className="block w-[150px] h-[80px]"
        >
          <img 
          src="https://res.cloudinary.com/dxvrhfhtl/image/upload/v1700058258/tudgrlzorlz6pjztf77o.png"
            alt="admin logo"
            className="w-full h-full"
          />
        </Link>
      </div>
      <div className='flex flex-col flex-1 gap-2'>
        <AdminLink
          name="Панель"
          path="/admin"
          active={pathname === "/admin"}
          icon={<MdOutlineDashboardCustomize size={24} className="text-black" />}
        />
        <AdminLink
          name="Продукти"
          path="/admin/all-products"
          active={pathname === "/admin/all-products"}
          icon={<CiPizza size={24} className="text-black" />}
        />
        <AdminLink
          name="Замовлення"
          path="/admin/view-orders"
          active={pathname === "/admin/view-orders"}
          icon={<AiOutlineOrderedList size={24} className="text-black" />}
        />
      </div>
      <Link to="/" className="mb-3 flex items-center gap-2 px-3 py-2 hover:bg-yellow/80 transition">
        <p className="text-base sm:text-lg">
          До головної
        </p>
        <MdExitToApp size={26} />
      </Link>
    </aside>
  )
}

export default Sidebar
