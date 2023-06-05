import { Link, useLocation } from "react-router-dom"
import adminLogo from "../../assets/admin-logo.png"
import { CiPizza } from "react-icons/ci"
import {MdExitToApp, MdOutlineCreate} from "react-icons/md"
import AdminLink from "./AdminLink"
import { AiOutlineOrderedList } from "react-icons/ai"

const Sidebar = () => {
  const {pathname} = useLocation()
  return (
    <aside className='flex flex-col border-r border-gray-400 shadow-md w-[70px] lg:basis-1/5'>
      <Link to="/admin"
        className="border-b border-gray-400"
      >
        <img src={adminLogo}
          alt="admin logo"
          className="w-[150px] h-[100px] object-contain mx-auto"
        />
      </Link>
      <div className='flex flex-col flex-1 gap-4 p-3'>
        <AdminLink
          name="Все продукты"
          path="/admin/all-products"
          active={pathname === "/admin/all-products"}
          icon={<CiPizza size={20} className={pathname === "/admin/all-products" && "text-yellow"}/>}
        />
        <AdminLink
          name="Создать продукт"
          path="/admin/add-product"
          active={pathname === "/admin/add-product"}
          icon={<MdOutlineCreate size={20} className={pathname === "/admin/add-product" && "text-yellow"}/>}
        />
        <AdminLink
          name="Все заказы"
          path="/admin/view-orders"
          active={pathname === "/admin/view-orders"}
          icon={<AiOutlineOrderedList size={20} className={pathname === "/admin/view-orders" && "text-yellow"}/>}
        />
      </div>
      <p className="text-red-500 text-lg font-medium text-center leading-5 pb-3 hidden lg:block">
        support from @sasha_veklich
      </p>
      <Link to="/" className="block lg:hidden mb-3">
        <MdExitToApp size={30} className="mx-auto" />
      </Link>
    </aside>
  )
}

export default Sidebar
