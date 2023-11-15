import { FC } from 'react'
import { Link } from 'react-router-dom'

interface AdminLinkProps {
    name: string
    path: string
    active: boolean
    icon: JSX.Element
}

const AdminLink: FC<AdminLinkProps> = ({ name, path, active, icon }) => {
    return <Link to={path} className={`${active ? "text-yellow/80 sm:text-black sm:bg-yellow/80" : ""} flex flex-col sm:flex-row items-center text-base sm:text-lg sm:gap-2 sm:w-full sm:px-3 sm:py-2 sm:hover:bg-yellow/80 sm:transition sm:duration-200`}>
        {icon}
        <span>
            {name}
        </span>
    </Link>
}

export default AdminLink