import { useState } from 'react'
import '../style/Login.css'
import { NavLink } from 'react-router-dom'

function Login() {

    const initial = {
        email: "",
        password: "",
    }
    const [logUser, setLogUser] = useState(initial)
    const [logErr, setLogErr] = useState(initial)

    const inputHandleFun = e => {
        const { name, value } = e.target;
        setLogUser({ ...userSign, [name]: value })
        setLogErr({ ...userSignErr, [name]: "" })
    }

    const handleSubmitFun = e => {
        e.preventDefault();
    }
    return (

        <div className='px-[20px] py-[30px] md:px-[30px] md:py-[50px] lg:px-[80px] lg:py-[124px] bg-secondary-light shadow-lg' >
            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-2  lg:gap-4 items-center bg-primary-light px-[15px] py-[30px]  md:px-[20px] md:py-[20px] rounded-[30px]'>
                <div className='lg:pe-2 w-full md:w-[270px] lg:w-[344px] lg:mx-auto items-center '>
                    <h1 className='text-2xl  md:text-[28.83px] font-lato font-bold'>Login</h1>
                    <p className='text-xs md:text-[12.64px] font-normal font-lato text-primary-light-gray mb-[20px]'>How do i get started lorem ipsum dolor at?</p>
                    <form action=""
                        onSubmit={handleSubmitFun}
                        className=' md:flex flex-col '
                    >
                        <label htmlFor="email"
                            className='text-[14.22px] mb-[12px] text-secondary-light-gray font-lato '
                        >Email</label>
                        <input
                            className='w-full text-[14.22px] px-[15px] py-[13px] mb-[20px] rounded-lg border-[1px] border-secondary-gray bg-secondary-light text-secondary-light-gray font-lato'
                            id='email'
                            type="text"
                            placeholder='Enter your email'
                            name='email'
                            value={logUser.email}
                            onChange={inputHandleFun} />
                        {logErr && <span>{logErr.email}</span>}

                        <label htmlFor="password"
                            className='text-[14.22px] mb-[12px] text-secondary-light-gray font-lato'
                        >Password</label>
                        <input
                            className=' w-full text-[14.22px] px-[15px] py-[13px] mb-[14px] rounded-lg border-[1px] border-secondary-gray bg-secondary-light text-secondary-light-gray font-lato'
                            id='password'
                            type="password"
                            placeholder='................'
                            name='password'
                            value={logUser.password}
                            onChange={inputHandleFun} />
                            {logErr && <span>{logErr.password}</span>}

                        <NavLink
                            className="relative mb-14"
                            to="/"><span className='text:xs md:text-[14.22px] md:px-[17px] py-[6px] md:absolute  md:right-0  text-primary-violet font-lato font-semibold'>Forgot password</span>
                        </NavLink>
                        <button
                            type="submit"
                            className='text-sm md:text-[16px] px-[17px] py-[12px] mt-[20px] md:mt-0 mb-[20px] w-full text-primary-light bg-primary-violet font-lato font-medium rounded-lg '
                        >Sign in</button>
                    </form>

                    <NavLink to="/"
                        className="flex items-center justify-center rounded-3xl border-[1px] border-secondary-gray bg-secondary-light pt-[11px] pb-[17px] mb-[20px]"
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
                        className="flex items-center justify-center rounded-3xl border-[1px] border-secondary-gray bg-secondary-light pt-[11px] pb-[17px] mb-[20px]"
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
                        <NavLink to="/"
                            className="text-[14.22px] text-primary-violet font-lato px-2">
                            Sign up</NavLink></p>

                </div>

                <div className="hidden md:block log-phara-hr-line log-background-img bg-primary-violet relative rounded-[20px] md:pt-[50px] md:ps-[35px] lg:ps-[45px] xl:pt-[100px] xl:ps-[65px] md:h-[550px] lg:h-[600px] xl:h-[750px]">
                    <p
                        className='log-phara-vr-line md:text-[25px] xl:text-[40px] text-primary-light'
                    >Very good works are <br />
                        waiting for you <br />
                        Sign up Now</p>
                </div>
            </div>
        </div>
    )
}

export default Login