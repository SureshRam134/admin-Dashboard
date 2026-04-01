import { useState } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import axiosURL from "../api/AxiosURL"

const ResetPassword = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const email = location?.state

    const initial = {
        newpassword: "",
        confirmPassword: ""
    }
    const [resetPassword, setResetPassword] = useState(initial)
    const [resetPasswordErr, setResetPasswordErr] = useState(initial)

    const inputHandleFun = e => {
        const { name, value } = e.target;
        setResetPassword({ ...resetPassword, [name]: value })
        setResetPasswordErr({ ...setResetPasswordErr, [name]: "" })
    }

    const handleSubmitFun = async e => {
        e.preventDefault();
        const { newpassword, confirmPassword } = resetPassword;
        const newErrObj = {}
        if (!newpassword) newErrObj.otp = "Please Enter New Password"
        if (!confirmPassword) newErrObj.otp = "Please Enter Confirm Password"
        if (newpassword !== confirmPassword) newErrObj.otp = "Password Not Match"

        if (Object.keys(newErrObj).length > 0) {
            setResetPasswordErr(newErrObj)
            return;
        }

        try {
            const data = {
                email: email,
                password: newpassword.trim(),
            }
            const resetPassword_res = await axiosURL.post('/user/resetpassword', data)
            alert(resetPassword_res.data.message)
            setResetPassword(initial)
            setResetPasswordErr(initial)
            navigate("/")

        } catch (error) {
            if (error.response.status === 400) return alert(error.response.data.message)
            else console.log("server error: ", error);
        }
    }

    return (

        <div className='px-[20px] py-[95px] md:px-[30px] md:py-[50px] lg:px-[80px] lg:py-[124px] bg-secondary-light ' >
            <div className=' bg-primary-light md:w-[500px] md:h-[400px] lg:w-[600px] lg:h-[400px] xl:w-[730px] xl:h-[515px] rounded-[30px] mx-auto flex items-center shadow-md shadow-gray-500/20 '>
                <div className='px-[20px] py-[50px] md:px-0 md:py-0 rounded-[30px] w-full md:w-[270px] lg:w-[330px] mx-auto items-center bg-primary-light'>
                    <h1 className='text-2xl  md:text-[25.63px] font-lato font-bold flex justify-center'>Reset Password?</h1>
                    <p className='text-xs md:text-[14.22px] font-normal font-lato text-primary-light-gray mb-[20px] flex justify-center'>No worries, we’ll send you reset instruction.</p>
                    <form action=""
                        onSubmit={handleSubmitFun}
                        className=' md:flex flex-col '
                    >

                        <input
                            className='w-full text-[14.22px] px-[15px] py-[13px] mb-[20px] md:mb-[20px] rounded-lg border-[1px] border-secondary-gray bg-secondary-light text-secondary-light-gray font-lato outline-none focus:ring-1 focus:ring-blue-500'
                            id='newpassword'
                            type="text"
                            placeholder='New Password'
                            name='newpassword'
                            value={resetPassword.newpassword}
                            onChange={inputHandleFun} 
                        />


                        <div className='relative flex flex-col'>
                            <input
                                className='w-full text-[14.22px] px-[15px] py-[13px] mb-[20px] md:mb-[20px] rounded-lg border-[1px] border-secondary-gray bg-secondary-light text-secondary-light-gray font-lato outline-none focus:ring-1 focus:ring-blue-500'
                                id='confirmpassword'
                                type="text"
                                placeholder='Confirm Password'
                                name='confirmPassword'
                                value={resetPassword.confirmPassword}
                                onChange={inputHandleFun} />
                            {resetPasswordErr && <span className='absolute text-primary-Err text-xs top-[48px]'>{resetPasswordErr.otp}</span>}
                        </div>

                        <button
                            type="submit"
                            className='text-sm md:text-[16px] px-[17px] py-[12px] mb-[20px] w-full text-primary-light bg-primary-violet font-lato font-medium rounded-lg '
                        >Reset Password</button>
                    </form>

                    <NavLink to="/"
                        className="text-[14.22px] text-primary-violet font-lato px-2 flex items-center justify-center">
                        Back to Login</NavLink>

                </div>
            </div>
        </div>
    )
}

export default ResetPassword;