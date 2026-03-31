import { useState } from "react"
import { NavLink } from "react-router-dom"
import axiosURL from "../api/AxiosURL"


const ForgetPassword = () => {

    const initial = {
        email: "",
    }
    const [forget, setForget] = useState(initial)
    const [forgetErr, setForgetErr] = useState(initial)

    const inputHandleFun = e => {
        const { name, value } = e.target;
        setForget({ ...forget, [name]: value })
        setForgetErr({ ...setForgetErr, [name]: "" })
    }

    const handleSubmitFun =async e => {
        e.preventDefault();
        const { email } = forget;
        const newErrObj = {}
        if (!email) newErrObj.email = "Please Enter Email"

        if (Object.keys(newErrObj).length > 0) {
            setForgetErr(newErrObj)
            return;
        }
        try {
            const data = {
                email : forget.email.trim().toLowerCase()
            }
            const Forget_res = await axiosURL.post('/user/forget', data)
            
        } catch (error) {
            
        }

    }
    return (

        <div className='px-[20px] py-[95px] md:px-[30px] md:py-[50px] lg:px-[80px] lg:py-[124px] bg-secondary-light ' >
            <div className=' bg-primary-light md:w-[500px] md:h-[400px] lg:w-[600px] lg:h-[400px] xl:w-[730px] xl:h-[515px] rounded-[30px] mx-auto flex items-center shadow-md shadow-gray-500/20 '>
                <div className='px-[20px] py-[50px] md:px-0 md:py-0 rounded-[30px] w-full md:w-[270px] lg:w-[330px] mx-auto items-center bg-primary-light'>
                    <h1 className='text-2xl  md:text-[25.63px] font-lato font-bold flex justify-center'>Forgot password?</h1>
                    <p className='text-xs md:text-[14.22px] font-normal font-lato text-primary-light-gray mb-[20px] flex justify-center'>No worries, we’ll send you reset instruction.</p>
                    <form action=""
                        onSubmit={handleSubmitFun}
                        className=' md:flex flex-col '
                    >
                        <div className='relative flex flex-col'>
                            <label htmlFor="email"
                                className='text-[14.22px] mb-[12px] text-secondary-light-gray font-lato '
                            >Email</label>
                            <input
                                className='w-full text-[14.22px] px-[15px] py-[13px] mb-[20px] md:mb-[20px] rounded-lg border-[1px] border-secondary-gray bg-secondary-light text-secondary-light-gray font-lato outline-none focus:ring-1 focus:ring-blue-500'
                                id='email'
                                type="text"
                                placeholder='Enter your email'
                                name='email'
                                value={forget.email}
                                onChange={inputHandleFun} />
                            {forgetErr && <span className='absolute text-primary-Err text-xs top-[83px]'>{forgetErr.email}</span>}
                        </div>

                        <button
                            type="submit"
                            className='text-sm md:text-[16px] px-[17px] py-[12px] mb-[20px] w-full text-primary-light bg-primary-violet font-lato font-medium rounded-lg '
                        >Reset Password</button>
                    </form>

                    <NavLink to="/"
                        className="text-[14.22px] text-primary-violet font-lato px-2 flex items-center justify-center">
                        Back to login</NavLink>

                </div>
            </div>
        </div>
    )
}


export default ForgetPassword;