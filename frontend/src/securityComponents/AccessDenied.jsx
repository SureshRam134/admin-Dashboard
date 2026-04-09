import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ContextData } from "../context/ProviedData"



const AccessDenied = () => {
    const { currentUser } = useContext(ContextData) 
    const navigate = useNavigate()
    useEffect(() => {
        if(!currentUser) {
            setTimeout(()=> {        
                navigate('/login')
            },2000)
        }
    },[currentUser])
     
    return (
        <div>
            <p>Access denied...😬</p>
        </div>
    )    
}

export default AccessDenied