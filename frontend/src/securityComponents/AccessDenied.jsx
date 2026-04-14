import { useEffect } from "react"
import { useNavigate } from "react-router-dom"



const AccessDenied = () => {
    const user = localStorage.getItem('tokenProfile')
    const navigate = useNavigate()
    useEffect(() => {
        if(!user) {
            setTimeout(()=> {        
                navigate('/login')
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