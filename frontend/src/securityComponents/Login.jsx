import { useState } from 'react'
import '../style/Login.css'
import { NavLink } from 'react-router-dom'
import axiosURL from '../api/AxiosURL'
import { useContext } from "react"
import { ContextData } from "../context/ProviedData"

function Login() {
    const { currentUser } = useContext(ContextData)
    const navigateFunction = (data) => {
        if(data) {
            if(data.roleId === 2) window.location.href='/admin/'
            else if(data.roleId === 3) window.location.href='/user/'
        }
        else{
            window.location.href='/login'
        }

    }

    const initial = {
        email: "",
        password: "",
    }
    const [logUser, setLogUser] = useState(initial)
    const [logErr, setLogErr] = useState(initial)
    const [hiddenPass, setHiddenPass] = useState(false)

    const inputHandleFun = e => {
        const { name, value } = e.target;
        setLogUser({ ...logUser, [name]: value })
        setLogErr({ ...logErr, [name]: "" })
    }

    const handleSubmitFun = async e => {
        e.preventDefault();
        const { email, password } = logUser;
        const newErrObj = {}
        if (!email) newErrObj.email = "Please Enter Email"
        if (!password) newErrObj.password = "Please Enter Password"

        if (Object.keys(newErrObj).length > 0) {
            setLogErr(newErrObj)
            return;
        }

        try {
            const data = {
                email: logUser.email,
                password: logUser.password,
            }
            const res = await axiosURL.post("/user/login", data)
            alert(res.data.message)
            const tokenData = res.data.result
            localStorage.setItem("tokenProfile", JSON.stringify(tokenData))
            navigateFunction(tokenData)
            setLogUser(initial)
            setLogErr(initial)

        } catch (error) {
            if (error.response.status === 400) alert(error.response.data.message)
            else console.log("Server error:", error);
        }
    }

    const showPasswordFun = () => {
        setHiddenPass(!hiddenPass)
    }

    
    if(currentUser) {
        return navigateFunction()
    }

    return (

        <div className='px-[20px] py-[50px] md:px-[10px] md:py-[9px] lg:px-[10px] lg:py-[9px] xl:px-[30px] xl:py-[9px] bg-secondary-light shadow-lg' >
            <div className='grid grid-cols-1 md:grid-cols-2 xl:flex md:gap-3 lg:gap-4 items-center bg-primary-light px-[15px] py-[60px] md:px-[15px] md:py-[20px] xl:px-[20px] xl:py-[20px] rounded-[30px] shadow-md shadow-gray-500/20 xl:h-[97vh]'>
                <div className='lg:pe-2 w-full md:w-[250px] lg:w-[280px] xl:w-[330px] mx-auto items-center '>
                    <h1 className='text-2xl md:text-[22px] lg:text-[25px] xl:text-[28.83px] font-lato font-bold'>Login</h1>
                    <p className='text-xs md:text-[11px] lg:text-[12px] xl:text-[12.64px] font-normal font-lato text-primary-light-gray mb-[15px] md:mb-[17px] lg:mb-[18px] xl:mb-[15px]'>How do i get started lorem ipsum dolor at?</p>
                    <form action=""
                        onSubmit={handleSubmitFun}
                        className=' md:flex flex-col '
                    >
                        <div className='relative flex flex-col'>
                            <label htmlFor="email"
                                className='text-[14.22px] mb-[7px] md:mb-[10px] lg:mb-[12px] xl:mb-[5px] text-secondary-light-gray font-lato'
                            >Email</label>
                            <input
                                className='w-full text-[14.22px] px-[15px] py-[13px] mb-[16px] md:text-[13px] md:px-[12px] md:py-[10px] md:mb-[17px] lg:mb[20px]  xl:text-[14.22px] xl:px-[15px] xl:py-[11px] xl:mb-[15px] rounded-lg border-[1px] border-secondary-gray bg-secondary-light text-secondary-light-gray font-lato outline-none focus:ring-1 focus:ring-blue-500'
                                id='email'
                                type="text"
                                placeholder='Enter your email'
                                name='email'
                                value={logUser.email}
                                onChange={inputHandleFun} />
                            {logErr && <span className='absolute text-primary-Err text-xs top-[77px] md:text-[11px] md:top-[72px] lg:top-[74px]  xl:top-[71px]'>{logErr.email}</span>}
                        </div>

                        <div className='relative flex flex-col'>
                            <label htmlFor="password"
                                className='text-[14.22px] mb-[7px] md:mb-[10px] lg:mb-[12px] xl:mb-[5px] text-secondary-light-gray font-lato'
                            >Password</label>
                            <input
                                className='w-full text-[14.22px] px-[15px] py-[13px] mb-[16px] md:text-[13px] md:px-[12px] md:py-[10px] md:mb-[17px] lg:mb[20px]  xl:text-[14.22px] xl:px-[15px] xl:py-[11px] xl:mb-[15px] rounded-lg border-[1px] border-secondary-gray bg-secondary-light text-secondary-light-gray font-lato outline-none focus:ring-1 focus:ring-blue-500'
                                type={!hiddenPass ? "password" : "text"}
                                placeholder='................'
                                name='password'
                                value={logUser.password}
                                onChange={inputHandleFun} />

                            {!hiddenPass ?
                                <span className='absolute right-[13%]  top-[50%] md:top-[50%] xl:top-[48%] '>
                                    <svg onClick={showPasswordFun} className='absolute' width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_336_11859)">
                                            <path d="M1.09141 0.143596C0.798908 -0.0870294 0.374221 -0.0335919 0.143596 0.258908C-0.0870294 0.551408 -0.0335919 0.976096 0.258908 1.20672L16.9089 14.2567C17.2014 14.4873 17.6261 14.4339 17.8567 14.1414C18.0873 13.8489 18.0339 13.4242 17.7414 13.1936L14.7827 10.8761C15.8964 9.73422 16.6502 8.45453 17.0298 7.54609C17.1227 7.32391 17.1227 7.07641 17.0298 6.85422C16.6108 5.85016 15.7305 4.38766 14.4142 3.16703C13.0923 1.93516 11.2727 0.900158 9.00016 0.900158C7.08203 0.900158 5.48453 1.63985 4.2386 2.61016L1.09141 0.143596ZM6.27485 4.20485C6.99203 3.54953 7.9511 3.15016 9.00016 3.15016C11.2361 3.15016 13.0502 4.96422 13.0502 7.20016C13.0502 7.90047 12.873 8.5586 12.5608 9.13235L11.4752 8.28297C11.6214 7.9511 11.7002 7.58547 11.7002 7.20016C11.7002 5.70953 10.4908 4.50016 9.00016 4.50016C8.92141 4.50016 8.84266 4.50297 8.76391 4.51141C8.91297 4.77297 9.00016 5.07672 9.00016 5.40016C9.00016 5.68703 8.93266 5.95703 8.81453 6.1961L6.27485 4.20485ZM12.5495 12.5861L10.4908 10.9661C10.0295 11.1489 9.5261 11.2502 9.00016 11.2502C6.76422 11.2502 4.95016 9.4361 4.95016 7.20016C4.95016 7.0061 4.96422 6.81766 4.98953 6.63203L2.33735 4.54235C1.6961 5.37766 1.23766 6.21016 0.970471 6.85422C0.877658 7.07641 0.877658 7.32391 0.970471 7.54609C1.38953 8.55016 2.26985 10.0127 3.5861 11.2333C4.90797 12.4652 6.72766 13.5002 9.00016 13.5002C10.3445 13.5002 11.5286 13.1373 12.5495 12.5861Z" fill="#727272" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_336_11859">
                                                <rect width="18" height="14.4" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </span>
                                :
                                <span className='absolute right-[13%] top-[24%] top-[48%] md:top-[50%] xl:top-[48%] '>
                                    <svg onClick={showPasswordFun} className='absolute' width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <path d="M9 1.5C4.5 1.5 1.5 5.25 1 7.2C1.5 9.15 4.5 12.9 9 12.9C13.5 12.9 16.5 9.15 17 7.2C16.5 5.25 13.5 1.5 9 1.5ZM9 11.25C6.75 11.25 5 9.5 5 7.25C5 5 6.75 3.25 9 3.25C11.25 3.25 13 5 13 7.25C13 9.5 11.25 11.25 9 11.25Z" fill="#727272" />
                                            <circle cx="9" cy="7.25" r="1.5" fill="#727272" />
                                        </g>
                                    </svg>
                                </span>
                            }
                            {logErr && <span className='absolute text-primary-Err text-xs top-[77px] md:text-[11px] md:top-[72px] lg:top-[74px] xl:top-[71px]'>{logErr.password}</span>}
                        </div>

                        <NavLink
                            className="md:relative md:mb-11 xl:mb-10"
                            to="/forgot"><span className='text:xs md:text-[14.22px] md:px-[17px] md:absolute  md:right-0  text-primary-violet font-lato font-semibold'>Forgot password</span>
                        </NavLink>
                        <button
                            type="submit"
                            className='text-sm py-[12px]  mb-[20px] md:text-[13px] md:py-[10px] md:mb-[17px] xl:text-[16px] xl:py-[12px] xl:mb-[20px] w-full text-primary-light bg-primary-violet font-lato font-medium rounded-lg '
                        >Sign in</button>
                    </form>

                    <NavLink to="/"
                        className="flex items-center justify-center rounded-3xl border-[1px] border-secondary-gray bg-secondary-light pt-[8px] pb-[15px] xl:pt-[11px] xl:pb-[17px] mb-[20px]"
                    >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_305_5271)">
                                <path d="M17.9913 9.16863C17.9913 8.43117 17.9301 7.89303 17.7975 7.33496H9.1792V10.6634H14.238C14.136 11.4906 13.5853 12.7363 12.3613 13.5734L12.3442 13.6848L15.0691 15.7475L15.2579 15.7659C16.9918 14.2013 17.9913 11.8992 17.9913 9.16863Z" fill="#4285F4" />
                                <path d="M9.1792 17.9384C11.6576 17.9384 13.7382 17.1411 15.2579 15.7659L12.3613 13.5734C11.5862 14.1015 10.5459 14.4703 9.1792 14.4703C6.7518 14.4703 4.69157 12.9057 3.95716 10.7432L3.84951 10.7521L1.01606 12.8947L0.979004 12.9954C2.48847 15.9252 5.58904 17.9384 9.1792 17.9384Z" fill="#34A853" />
                                <path d="M3.95726 10.7431C3.76348 10.185 3.65133 9.58704 3.65133 8.9692C3.65133 8.35129 3.76348 7.75338 3.94706 7.19531L3.94193 7.07645L1.07297 4.89941L0.979102 4.94304C0.356977 6.15886 0 7.52419 0 8.9692C0 10.4142 0.356977 11.7795 0.979102 12.9953L3.95726 10.7431Z" fill="#FBBC05" />
                                <path d="M9.1792 3.46802C10.9028 3.46802 12.0655 4.19551 12.7285 4.80346L15.3191 2.33196C13.7281 0.886946 11.6576 0 9.1792 0C5.58904 0 2.48847 2.01305 0.979004 4.94292L3.94696 7.19519C4.69157 5.03265 6.7518 3.46802 9.1792 3.46802Z" fill="#EB4335" />
                            </g>
                            <defs>
                                <clipPath id="clip0_305_5271">
                                    <rect width="18" height="18" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>

                        <span className='text-[12.64px] text-secondary-light-gray font-lato ps-[11px] '>Sign in with Google</span>

                    </NavLink>
                    <NavLink to="/"
                        className="flex items-center justify-center rounded-3xl border-[1px] border-secondary-gray bg-secondary-light pt-[8px] pb-[15px] xl:pt-[11px] xl:pb-[17px] mb-[20px]"
                    >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_305_13851)">
                                <path d="M18 9C18 4.02947 13.9705 0 9 0C4.02947 0 0 4.0294 0 9C0 13.4921 3.29119 17.2155 7.59375 17.8907V11.6016H5.30859V9H7.59375V7.01719C7.59375 4.76156 8.93742 3.51562 10.9931 3.51562C11.9779 3.51562 13.0078 3.69141 13.0078 3.69141V5.90625H11.873C10.7549 5.90625 10.4062 6.60002 10.4062 7.3118V9H12.9023L12.5033 11.6016H10.4062V17.8907C14.7088 17.2155 18 13.4922 18 9Z" fill="#1877F2" />
                                <path d="M12.5033 11.6016L12.9023 9H10.4062V7.3118C10.4062 6.59995 10.7549 5.90625 11.873 5.90625H13.0078V3.69141C13.0078 3.69141 11.9779 3.51562 10.9931 3.51562C8.93742 3.51562 7.59375 4.76156 7.59375 7.01719V9H5.30859V11.6016H7.59375V17.8907C8.05895 17.9636 8.52912 18.0001 9 18C9.47088 18.0001 9.94105 17.9636 10.4062 17.8907V11.6016H12.5033Z" fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_305_13851">
                                    <rect width="18" height="18" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>

                        <span className='text-[12.64px] text-secondary-light-gray font-lato ps-[11px] '>Sign in with Facebook</span>

                    </NavLink>


                    <p
                        className='text-[14.22px] text-primary-light-gray font-lato flex items-center justify-center'
                    >Dont’t have an account.
                        <NavLink to="/signup"
                            className="text-[14.22px] text-primary-violet font-lato px-2">
                            Sign up</NavLink></p>

                </div>

                <div className="hidden md:block sign-phara-hr-line sign-background-img bg-primary-violet relative rounded-[20px] md:pt-[50px] md:ps-[35px] lg:pt-[50px] lg:ps-[44px] xl:pt-[50px] xl:ps-[60px] md:h-[500px] md:h-[550px] xl:w-[580px] xl:h-[90vh]">
                    <p
                        className='sign-phara-vr-line md:text-[22px] lg:text-[25px] xl:text-[34px] text-primary-light'
                    >Very good works are <br />
                        waiting for you <br />
                        Sign up Now</p>
                </div>
            </div>
        </div>
    )
}

export default Login