import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './securityComponents/Login'
import Signup from './securityComponents/Signup'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  )
}

export default App
