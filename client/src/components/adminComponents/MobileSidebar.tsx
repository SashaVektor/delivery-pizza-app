import { Link, useLocation } from "react-router-dom"
import AdminLink from "./AdminLink"
import { MdExitToApp, MdOutlineDashboardCustomize } from "react-icons/md";
import { CiPizza } from "react-icons/ci";
import { AiOutlineOrderedList } from "react-icons/ai";


const MobileSidebar = () => {
    const { pathname } = useLocation();

    return (
        <div className="rounded-t-lg fixed w-[100dvw] bottom-0 left-0 bg-white drop-shadow-md z-30 py-2 px-3 border-t border-gray-300">
            <div className="flex items-center justify-between gap-5">
                <AdminLink
                    name="Панель"
                    path="/admin"
                    active={pathname === "/admin"}
                    icon={
                        <MdOutlineDashboardCustomize
                            size={24}
                            className={`${pathname === "/admin" ? "text-yellow/80" : "text-black"}`}
                        />}
                />
                <AdminLink
                    name="Продукти"
                    path="/admin/all-products"
                    active={pathname === "/admin/all-products"}
                    icon={
                        <CiPizza
                            size={24}
                            className={`${pathname === "/admin/all-products" ? "text-yellow/80" : "text-black"}`}
                        />}
                />
                <AdminLink
                    name="Замовлення"
                    path="/admin/view-orders"
                    active={pathname === "/admin/view-orders"}
                    icon={
                        <AiOutlineOrderedList
                            size={24}
                            className={`${pathname === "/admin/view-orders" ? "text-yellow/80" : "text-black"}`}
                        />}
                />
                <Link to="/" className="flex flex-col items-center">
                    <MdExitToApp size={24} />
                    <p className="text-base">
                        Вихід
                    </p>
                </Link>
            </div>
        </div>
    )
}

export default MobileSidebar
