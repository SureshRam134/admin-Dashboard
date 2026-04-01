import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './securityComponents/Login'
import Signup from './securityComponents/Signup'
import ForgetPassword from './securityComponents/ForgetPassword'
import VerifyOTP from './securityComponents/VerifyOTP'
import ResetPassword from './securityComponents/ResetPassword'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgot' element={<ForgetPassword />} />
        <Route path='/otp' element={<VerifyOTP />} />
        <Route path='/resetpassword' element={<ResetPassword />} />

        
      </Routes>
    </>
  )
}

export default App
