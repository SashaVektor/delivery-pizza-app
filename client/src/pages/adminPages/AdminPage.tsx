import { Route, Routes } from 'react-router-dom'
import Sidebar from '../../components/adminComponents/Sidebar'
import AdminPageInfo from './AdminPageInfo'
import ViewProducts from './ViewProducts'
import CreateOrder from './CreateProduct'
import Orders from './Orders'
import OrderDetails from './OrderDetails'


const AdminPage = () => {

    return (
        <div className='pt-[100px] sm:pt-[120px] flex'>
            <Sidebar />
            <div className="px-3 py-2 md:px-10 md:py-5 min-h-[80vh] w-full lg:basis-4/5">
                <Routes>
                    <Route path='/' element={<AdminPageInfo />} />
                    <Route path='all-products' element={<ViewProducts />} />
                    <Route path='add-product' element={<CreateOrder />} />
                    <Route path='view-orders' element={<Orders />} />
                    <Route path='order-details/:id' element={<OrderDetails />} />
                </Routes>
            </div>
        </div>
    )
}

export default AdminPage
