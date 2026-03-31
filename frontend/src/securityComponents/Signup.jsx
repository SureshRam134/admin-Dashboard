import { useState } from 'react'
import '../style/Signup.css'
import { NavLink } from 'react-router-dom'
import axiosURL from '../api/AxiosURL'

function Signup() {

    const initial = {
        name: "",
        email: "",
        password: "",
        roleId: "",
        active: "",
    }
    const [signUser, setSignUser] = useState({ initial })
    const [signUserErr, setSignUserErr] = useState({ initial })
    const [hiddenPass, setHiddenPass] = useState(false)
    const inputHandleFun = e => {
        const { name, value } = e.target;
        setSignUser({ ...signUser, [name]: value })
        setSignUserErr({ ...signUserErr, [name]: "" })
    }
    const handleSubmitFun = async e => {
        e.preventDefault();
        const { name, email, password } = signUser;
        const newErrObj = {}
        if (!name) newErrObj.name = "Please Enter Name"
        if (!email) newErrObj.email = "Please Enter Email"
        if (!password) newErrObj.password = "Please Enter Password"

        if (Object.keys(newErrObj).length > 0) {
            setSignUserErr(newErrObj)
            return;
        }
        try {
            const data = {
                name: signUser.name.trim(),
                email: signUser.email.trim().toLowerCase(),
                password: signUser.password.trim(),
                roleId: 2,
            }
            const res = await axiosURL.post("/user/register", data)
            alert(res.data.message)
            setSignUser(initial)
            setSignUserErr(initial)

        } catch (error) {
            if (error.response.status === 400) alert(error.response.data.message)
            else if(error.response.status === 409){alert(error.response.data.message)}
            else console.log("Server error:", error);

        }
    }

    const showPasswordFun = () => {
        setHiddenPass(!hiddenPass)
    }

    return (
        <div className='px-[20px] py-[50px] md:px-[30px] md:py-[50px] lg:px-[80px] lg:py-[124px] bg-secondary-light shadow-lg' >
            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-2  lg:gap-4 items-center bg-primary-light px-[15px] py-[60px]  md:px-[20px] md:py-[20px] rounded-[30px] shadow-md shadow-gray-500/20 '>
                <div className='lg:pe-2 w-full md:w-[260px] lg:w-[344px] mx-auto items-center '>
                    <h1 className='text-2xl  md:text-[28.83px] font-lato font-bold'>Sign up</h1>
                    <p className='text-xs md:text-[12.64px] font-normal font-lato text-primary-light-gray mb-[20px]'>Start your 30-day free trial.</p>

                    <form action=""
                        onSubmit={handleSubmitFun}
                        className='flex flex-col'
                    >

                        <div className='relative flex flex-col'>
                            <input
                                className='w-full text-[14.22px] px-[15px] py-[13px] mb-[20px] rounded-lg border-[1px] border-secondary-gray bg-secondary-light text-secondary-light-gray font-lato outline-none focus:ring-1 focus:ring-blue-500'
                                id='email'
                                type="text"
                                placeholder='Full Name'
                                name='name'
                                value={signUser.name}
                                onChange={inputHandleFun} />
                            {signUserErr && <span className='absolute text-primary-Err text-xs top-[48px]'>{signUserErr.name}</span>}
                        </div>
                        <div className='relative flex flex-col'>
                            <input
                                className='w-full text-[14.22px] px-[15px] py-[13px] mb-[20px] rounded-lg border-[1px] border-secondary-gray bg-secondary-light text-secondary-light-gray font-lato outline-none focus:ring-1 focus:ring-blue-500'
                                id='email'
                                type="text"
                                placeholder='Email Address'
                                name='email'
                                value={signUser.email}
                                onChange={inputHandleFun} />
                            {signUserErr && <span className='absolute text-primary-Err text-xs top-[48px]'>{signUserErr.email}</span>}
                        </div>
                        <div className='relative flex flex-col'>
                            <input
                                className='relative w-full text-[14.22px] px-[15px] py-[13px] mb-[20px] rounded-lg border-[1px] border-secondary-gray bg-secondary-light text-secondary-light-gray font-lato outline-none focus:ring-1 focus:ring-blue-500'
                                id='password'
                                type={!hiddenPass ? "password" : "text"}
                                placeholder='Password'
                                name='password'
                                value={signUser.password}
                                onChange={inputHandleFun}
                            />
                            {!hiddenPass ?
                                <span className='absolute right-[11%] top-[24%] '>
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
                                <span className='absolute right-[11%] top-[24%] '>
                                    <svg onClick={showPasswordFun} className='absolute' width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <path d="M9 1.5C4.5 1.5 1.5 5.25 1 7.2C1.5 9.15 4.5 12.9 9 12.9C13.5 12.9 16.5 9.15 17 7.2C16.5 5.25 13.5 1.5 9 1.5ZM9 11.25C6.75 11.25 5 9.5 5 7.25C5 5 6.75 3.25 9 3.25C11.25 3.25 13 5 13 7.25C13 9.5 11.25 11.25 9 11.25Z" fill="#727272" />
                                            <circle cx="9" cy="7.25" r="1.5" fill="#727272" />
                                        </g>
                                    </svg>
                                </span>
                            }
                            {signUserErr && <span className='absolute text-primary-Err text-xs top-[48px]'>{signUserErr.password}</span>}
                        </div>

                        <p
                            className='hidden md:block text-[14.22px] text-primary-light-gray font-lato mb-[20px]'
                        >You are agreeing to the
                            <NavLink to="/"
                                className="text-[14.22px] text-primary-violet font-lato px-2">
                                Terms of Services
                            </NavLink>
                            and
                            <NavLink to="/"
                                className="text-[14.22px] text-primary-violet font-lato px-2">
                                Privacy Policy
                            </NavLink>
                        </p>
                        <p
                            className='block md:hidden text-xs md:text-[14.22px] text-primary-light-gray font-lato mb-[20px]'
                        >You are agreeing to the
                            <NavLink to="/"
                                className="text-xs md:text-[14.22px] text-primary-violet font-lato px-2">
                                Terms of Services
                            </NavLink>
                            and
                            <NavLink to="/"
                                className="text-xs md:text-[14.22px] text-primary-violet font-lato px-2">
                                Privacy Policy
                            </NavLink>
                        </p>

                        <button
                            type='submit'
                            className='text-sm md:text-[16px] px-[17px] py-[12px] mb-[20px] w-full text-primary-light bg-primary-violet font-lato font-medium rounded-lg '
                        >Get started</button>
                    </form>

                    <p
                        className='text-[14.22px] text-primary-light-gray font-lato '
                    >Already a member?
                        <NavLink to="/"
                            className="text-[14.22px] text-primary-violet font-lato px-2">
                            Sign in</NavLink></p>

                </div>
                <div className="hidden md:block sign-phara-hr-line sign-background-img bg-primary-violet relative rounded-[20px] md:pt-[50px] md:ps-[35px] lg:ps-[45px] xl:pt-[100px] xl:ps-[65px] md:h-[500px] xl:h-[750px]">
                    <p
                        className='sign-phara-vr-line md:text-[25px] xl:text-[40px] text-primary-light'
                    >Very good works are <br />
                        waiting for you <br />
                        Sign up Now</p>
                </div>
            </div>
        </div>
    )
}

export default Signup