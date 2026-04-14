import { Outlet, useLocation, useNavigate } from "react-router-dom"
import SideBar from "./SideBar"
import AccessDenied from "../securityComponents/AccessDenied"
import { useContext, useState } from "react"
import { ContextData } from "../context/ProviedData"
import TitleBar from "./TitleBar"



const User = ({ allowRoules }) => {
    const { currentUser } = useContext(ContextData)
    if (!currentUser.token || !currentUser) {
        return window.location.href = '/login'
    }
    else if (Number(allowRoules) !== Number(currentUser.roleId)) {
        return <AccessDenied />
    }
    return (
        <>
            <div>
                <header>
                    header
                </header>
                <main>
                    <Outlet />
                </main>
                <footer>
                    footer
                </footer>
            </div>
        </>
    )
}


const Admin = ({ allowRoules }) => {
    const location = useLocation()
    const { currentUser } = useContext(ContextData)
    const [search, setSearch] = useState('')
    const [userPopup, setUserPopup] = useState(false)

    const [loading, setLoading] = useState(false)
    console.log(allowRoules)

    if (!currentUser.token || !currentUser) { window.location.href = '/login' }
    else if (allowRoules !== Number(currentUser.roleId)) {
        return <AccessDenied />
    }
    const pageTitle = location.state?.title
    if (pageTitle === null) {
        window.location.href = '/admin/'
    }
    return (
        <>
            <div className="bg-secondary-light">
                <div className="flex ">
                    <header>
                        <SideBar />
                    </header>
                    <main className="w-full px-[30px]">
                        <TitleBar search={search} setSearch={setSearch} userPopup={userPopup} setUserPopup={setUserPopup} loading={loading} setLoading={setLoading} />
                        <Outlet context={{ search, userPopup, setUserPopup, loading, setLoading }} />
                    </main>
                </div>
                <footer>
                    footer
                </footer>
            </div>


        </>
    )
}


export { Admin, User }