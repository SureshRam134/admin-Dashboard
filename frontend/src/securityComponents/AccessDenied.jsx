import { useEffect } from "react"
import { useNavigate } from "react-router-dom"



const AccessDenied = () => {
    const user = localStorage.getItem('token')
    const navigate = useNavigate()
    useEffect(() => {
        if(!user) {
            setTimeout(()=> {
                navigate('/')
            },2000)
        }
    },[user])
   
    return (
        <div>
            <p>Access denied...😬</p>
        </div>
    )
}

export default AccessDenied