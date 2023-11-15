import { FC } from 'react'
import { RootState, useAppSelector } from '../../store/store'
import { Link } from 'react-router-dom'

interface AdminRouteProps {
  children: JSX.Element
}

const AdminRoute: FC<AdminRouteProps> = ({children}) => {
    const user = useAppSelector((state: RootState) => state.auth.googleUser)

    if(user?.isAdmin){
        return children
    } 

    return (
        <section className='h-[80dvh] pt-[140px]'>
            <div className='max-w-7xl px-4 mx-auto'>
                <h2 className='text-3xl text-red-500 font-bold'>Permisson Denied.</h2>
                <p className='text-2xl text-black font-medium'>This page can only view by an Admin user.</p>
                <br />
                <Link to="/">
                <button className='--btn '>&larr; Back To Home</button>
                </Link>
            </div>
        </section>
    )
}

export default AdminRoute