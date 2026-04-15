import { Outlet, useLocation, useNavigate } from "react-router-dom"
import SideBar from "./SideBar"
import AccessDenied from "../securityComponents/AccessDenied"
import TitleBar from "./TitleBar"
import { useSelector } from "react-redux"
import { useState } from "react"



const User = ({ allowRoules }) => {
    const  currentUser = useSelector((state) => state.auth)
    const {roleId, token} = currentUser;
    if (!token) {
        return window.location.href = '/login'
    }
    else if (Number(allowRoules) !== Number(roleId)) {
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
     const currentUser = useSelector((state) => state?.auth)
    const {roleId, token} = currentUser;
    const [search, setSearch] = useState('')
    const [userPopup, setUserPopup] = useState(false)

    const [loading, setLoading] = useState(false)
    console.log(allowRoules)

    if (!token) { window.location.href = '/login' }
    else if (Number(allowRoules) !== Number(roleId)) {
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