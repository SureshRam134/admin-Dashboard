import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './securityComponents/Login'
import ForgetPassword from './securityComponents/ForgetPassword'
import ResetPassword from './securityComponents/ResetPassword'
// import SuperAdminSignup from './securityComponents/SuperAdminSignup'
import Signup from './securityComponents/Signup'
import AccessDenied from './securityComponents/AccessDenied'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        {/* <Route path='/superadmin' element={<SuperAdminSignup/>}/> */}
        <Route path='/forgot' element={<ForgetPassword />} />
        <Route path='/resetpassword/:email/:otp' element={<ResetPassword />} />
        <Route path='*' element={<AccessDenied/>} />
      </Routes>
    </>
  )
}

export default App
