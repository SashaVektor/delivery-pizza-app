import Header from './components/Header'
import Footer from './components/Footer'
import { Route, Routes, useLocation } from "react-router-dom"
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import BasketPage from './pages/BasketPage'
import OrderPage from './pages/OrderPage'
import SuccessPage from './pages/SuccessPage'
import UserPage from './pages/UserPage'
import AdminPage from './pages/adminPages/AdminPage'
import AdminRoute from './components/adminComponents/AdminRoute'
import { GoogleOAuthProvider } from '@react-oauth/google'
import SuccessPaymentPage from './pages/SuccessPaymentPage'


const clientId = import.meta.env.VITE_GOOGLE_API_KEY

const App = () => {
  const {pathname} = useLocation();
  const isAdminPage = pathname.startsWith("/admin")
  return (
    <GoogleOAuthProvider clientId={clientId}>
      {!isAdminPage ? <Header /> : null}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/basket' element={<BasketPage />} />
        <Route path='/order' element={<OrderPage />} />
        <Route path='/checkout-success' element={<SuccessPage />} />
        <Route path='/userpage' element={<UserPage />} />
        <Route path='/success-payment' element={<SuccessPaymentPage />}/>
        <Route path='/admin/*' element={<AdminRoute><AdminPage /></AdminRoute>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      {!isAdminPage ? <Footer /> : null}
    </GoogleOAuthProvider>
  )
}

export default App

