import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react"
import { ContextData } from "../context/ProviedData"
import { useDispatch } from "react-redux";
import { logOut } from "../slices/userToken";


const TitleBar = ({ search, setSearch, userPopup, setUserPopup }) => {
    const dispatch = useDispatch();
    const { currentUser } = useContext(ContextData)
    const location = useLocation()
    const navigate = useNavigate()

    const profilehandleFun = (val) => {
            dispatch(logOut(val))
            navigate('/login')
    }

    const handleAddUserToggle = () => {
        setUserPopup(true)
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        },2000)
    }


    return (
        <>
            <div className="px-[30px] py-[35px] w-full flex items-center justify-between">
                <div className="flex items-center ">
                    <h1 className="text-[25.63px] font-semibold text-primary-violet">{location.state?.title || "Dashboard"}</h1>
                    <div className="flex items-center justify-between px-[15px] mx-[100px] w-[330px]  bg-primary-light border-1 border-secondary-gray rounded-full" >
                        <input type="text"
                            className="text-[14.22px] pe-[15px] py-[14px] w-full outline-none border-none"
                            placeholder="Search anything here..."
                            name="search"
                            value={search}
                            onChange={(e) => { setSearch(e.target.value) }}
                        />
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_463_12989)">
                                <path d="M17.8568 16.2345L13.203 11.5807C14.0782 10.377 14.5958 8.8965 14.5958 7.2975C14.5958 3.27375 11.322 0 7.2975 0C3.27375 0 0 3.27375 0 7.2975C0 11.322 3.27375 14.595 7.2975 14.595C8.823 14.595 10.2397 14.1247 11.4128 13.3215L16.0912 18L17.8568 16.2345ZM2.1405 7.2975C2.1405 4.4535 4.45425 2.13975 7.29825 2.13975C10.1423 2.13975 12.456 4.4535 12.456 7.2975C12.456 10.1415 10.1423 12.4552 7.29825 12.4552C4.4535 12.4552 2.1405 10.1415 2.1405 7.2975Z" fill="#89868D" />
                            </g>
                            <defs>
                                <clipPath id="clip0_463_12989">
                                    <rect width="18" height="18" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {
                        location.state?.title === "User" &&
                        <button
                            className=" text-[15px] bg-primary-violet text-primary-light px-[15px] py-[14px] rounded-[8px]" 
                            onClick={handleAddUserToggle}
                            >+Add User
                        </button>
                    }
                    <select name="" id=""
                        onClick={(e) => { profilehandleFun(e.target.value) }}
                        className="text-[15px] bg-primary-violet text-primary-light px-[15px] py-[14px] outline-none border-none rounded-[8px]"
                    >

                        <option value={currentUser.email}>{currentUser.email.slice(0, 8)}</option>
                        <option value="logout">Log out</option>
                    </select>

                </div>

            </div>
        </>
    )
}

export default TitleBar;