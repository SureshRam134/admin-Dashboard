import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"



const AccessDenied = () => {
    const token = useSelector(state => state.auth?.token)    
    const navigate = useNavigate()
    useEffect(() => {
        if(!token) {
            setTimeout(()=> {        
                navigate('/login')
            },2000)
        }
    },[token])
     
    return (
        <div>
            <p>Access denied...😬</p>
        </div>
    )    
}

export default AccessDenied