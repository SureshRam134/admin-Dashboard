import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './securityComponents/Login'
import ForgetPassword from './securityComponents/ForgetPassword'
import ResetPassword from './securityComponents/ResetPassword'
// import SuperAdminSignup from './securityComponents/SuperAdminSignup'
import Signup from './securityComponents/Signup'
import AccessDenied from './securityComponents/AccessDenied'
import { Admin } from './LayoutComponents/Layout'
import Users from './AdminComponents/Users'
import Dashboard from './AdminComponents/Dashboard'
import ProviedData from './context/ProviedData'
import Payment from './AdminComponents/Payment'
import Product from './AdminComponents/Product'
import About from './AdminComponents/About'
import Contact from './AdminComponents/Contact'
import Purchase from './AdminComponents/Purchase'
import AdminProfile from './AdminComponents/AdminProfile'

function App() {

  return (
    <>
      <ProviedData>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          {/* <Route path='/superadmin' element={<SuperAdminSignup/>}/> */}
          <Route path='/forgot' element={<ForgetPassword />} />
          <Route path='/resetpassword/:email/:otp' element={<ResetPassword />} />
          <Route path='/admin' element={<Admin allowRoules={2} />}>
            <Route index element={<Dashboard />} />
            <Route path='user' element={<Users />} />
            <Route path='product' element={<Product />} />
            <Route path='payment' element={<Payment />} />
            <Route path='about' element={<About />} />
            <Route path='contact' element={<Contact />} />
            <Route path='purchase' element={<Purchase />} />
            <Route path='profile' element={<AdminProfile />} />
            <Route path='*' element={<AccessDenied />} />
          </Route>

          <Route path='*' element={<AccessDenied />} />
        </Routes>
      </ProviedData>
    </>
  )
}

export default App
