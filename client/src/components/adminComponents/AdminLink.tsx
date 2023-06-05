import { FC } from 'react'
import { Link } from 'react-router-dom'

interface AdminLinkProps {
    name: string
    path: string
    active: boolean
    icon: JSX.Element
}

const AdminLink: FC<AdminLinkProps> = ({ name, path, active, icon }) => {
    return <Link to={path} className={`${active && "border-b border-yellow"} pb-2 flex items-center text-lg gap-2 w-full justify-center`}>
        {icon}
        <span className={`text-black ${active && "text-yellow"} hidden lg:block`}>{name}</span>
    </Link>
}

export default AdminLink