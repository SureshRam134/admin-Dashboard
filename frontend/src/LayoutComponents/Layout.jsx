import { Outlet, useLocation, useNavigate } from "react-router-dom"
import SideBar from "./SideBar"
import AccessDenied from "../securityComponents/AccessDenied"
import { useContext, useState } from "react"
import { ContextData } from "../context/ProviedData"
import TitleBar from "./TitleBar"


const Admin = ({ allowRoules }) => {
    const location = useLocation()
    const { currentUser } = useContext(ContextData)
    const [search, setSearch] = useState('')
    const [userPopup, setUserPopup] = useState(false)

    if (!currentUser) { window.location.href = '/login' }
    else if (allowRoules !== 2) {
        return <AccessDenied />
    }
    const pageTitle = location.state?.title
    if(pageTitle === null) {
        window.location.href='/admin/'
    }
    return (
        <>
            <div className="bg-secondary-light">
                <div className="flex ">
                    <header>
                        <SideBar />
                    </header>
                    <main className="w-full px-[30px]">
                        <TitleBar search={search} setSearch={setSearch} userPopup={userPopup}  setUserPopup={setUserPopup}/>
                        <Outlet context={{search, userPopup, setUserPopup }}/>
                    </main>
                </div>
                <footer>
                    footer
                </footer>


            </div>


        </>
    )
}


export { Admin }