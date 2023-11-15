import { Route, Routes } from 'react-router-dom'
import Sidebar from '../../components/adminComponents/Sidebar'
import AdminPageInfo from './AdminPageInfo'
import ViewProducts from './ViewProducts'
import Orders from './Orders'
import OrderDetails from './OrderDetails'
import MobileSidebar from '../../components/adminComponents/MobileSidebar'


const AdminPage = () => {

    return (
        <div className='relative'>
            <Sidebar />
            <div className="pb-20 sm:pb-2 px-2 sm:px-3 py-2 md:py-5 sm:pl-[260px] flex flex-col h-[100dvh] max-h-[100dvh] w-full overflow-y-auto scrollbar-w-2 scrollbar-track-yellow-lighter scrollbar-thumb-yellow scrollbar-thumb-rounded">
                <Routes>
                    <Route path='/' element={<AdminPageInfo />} />
                    <Route path='all-products' element={<ViewProducts />} />
                    <Route path='view-orders' element={<Orders />} />
                    <Route path='order-details/:id' element={<OrderDetails />} />
                </Routes>
            </div>
            <div className='block sm:hidden'>
                <MobileSidebar />
            </div>
        </div>
    )
}

export default AdminPage
