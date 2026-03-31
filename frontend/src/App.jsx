import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './securityComponents/Login'
import Signup from './securityComponents/Signup'
import ForgetPassword from './securityComponents/ForgetPassword'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forget' element={<ForgetPassword />} />
      </Routes>
    </>
  )
}

export default App
