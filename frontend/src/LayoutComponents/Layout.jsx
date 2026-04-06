import { Outlet, useNavigate } from "react-router-dom"
import SideBar from "./SideBar"
import AccessDenied from "../securityComponents/AccessDenied"
import { useContext } from "react"
import { ContextData } from "../context/ProviedData"


const Admin = ({allowRoules}) => {
    const{currentUser} = useContext(ContextData)

    if(!currentUser) {window.location.href='/'}
    else if(allowRoules !== 2){
       return <AccessDenied/>
    }
    return(
        <>
            <header>
                <SideBar/>
            </header>
            <main>
                <Outlet/>
            </main>
            <footer>
                Footer
            </footer>

        </>
    )
}


export{Admin}