// import { useState } from "react"
// import { NavLink, useLocation, useNavigate } from "react-router-dom"
// import axiosURL from "../api/AxiosURL"

// const VerifyuserReset = () => {
//     const navigate = useNavigate()
//     const location = useLocation()
//     const email = location?.state
    
//     const initial = {
//         email:"" || email,
//         otp: "",
//         newPassword: ""
//     }
//     const [userReset, setUserReset] = useState(initial)
//     const [userResetErr, setUserResetErr] = useState(initial)

//     const inputHandleFun = e => {
//         const { name, value } = e.target;
//         setUserReset({ ...userReset, [name]: value })
//         setUserResetErr({ ...setUserResetErr, [name]: "" })
//     }

//     const handleSubmitFun = async e => {
//         e.preventDefault();
//         const { email , otp, newPassword } = userReset;
//         const newErrObj = {}
//         if (!otp) newErrObj.otp = "Please Enter OTP"
//         else if(otp.length < 6 || otp.length > 6) newErrObj.otp = "Otp length 6 number only"
//         if (email === null) newErrObj.email = "Please Enter Email"
//         if (!newPassword) newErrObj.newPassword = "Plesae Enter Password"
//         if (Object.keys(newErrObj).length > 0) {
//             setUserResetErr(newErrObj)
//             return;
//         }
//         try {
//             const data = {
//                 email: email.trim().toLowerCase(),
//                 otp: otp.trim().toLowerCase(),
//                 password:newPassword.trim()
//             }
//             const userReset_res = await axiosURL.post('/user/resetpassword', data)
//             alert(userReset_res.data.message)
//             setUserReset(initial)
//             setUserResetErr(initial)
//             navigate('/')


//         } catch (error) {
//             if (error.response.status === 400)  alert(error.response.data.message)
//             else if (error.response.status === 404)  alert(error.response.data.message)
//             else console.log("server error: ", error);
//         }

//     }

//     const restOptFunction = async () => {
//         try {
//             const data = {
//                 email:email.trim().toLowerCase()
//             }
//             const Forgot_mail_res = await axiosURL.post('/user/forgot', data)
//             alert(Forgot_mail_res.data.message)
//         } catch (error) {
//             if (error.response.status === 400)  alert(error.response.data.message)
//             if (error.response.status === 404)  alert(error.response.data.message)
//             else console.log("server error: ", error);
//         }
//     }

//     return (

//         <div className='px-[20px] py-[95px] md:px-[30px] md:py-[50px] lg:px-[80px] lg:py-[124px] bg-secondary-light ' >
//             <div className=' bg-primary-light md:w-[500px] md:h-[400px] lg:w-[600px] lg:h-[400px] xl:w-[730px] xl:h-[515px] rounded-[30px] mx-auto flex items-center shadow-md shadow-gray-500/20 '>
//                 <div className='px-[20px] py-[50px] md:px-0 md:py-0 rounded-[30px] w-full md:w-[270px] lg:w-[330px] mx-auto items-center bg-primary-light'>
//                     <h1 className='text-2xl  md:text-[25.63px] font-lato font-bold flex justify-center'>Verify Your OTP?</h1>
//                     <p className='text-xs md:text-[14.22px] font-normal font-lato text-primary-light-gray mb-[20px] flex justify-center'>No worries, we’ll send you reset instruction.</p>
//                     <form action=""
//                         onSubmit={handleSubmitFun}
//                         className=' md:flex flex-col '
//                     >

//                         <input
//                             className='w-full text-[14.22px] px-[15px] py-[13px] mb-[20px] md:mb-[20px] rounded-lg border-[1px] border-secondary-gray bg-secondary-light text-secondary-light-gray font-lato outline-none focus:ring-1 focus:ring-blue-500'
//                             id='email'
//                             type="text"
//                             placeholder='Enter your email'
//                             name='email'
//                             value={userReset?.email}
//                             onChange={inputHandleFun}
//                         />


//                         <div className='relative flex flex-col'>
//                             <input
//                                 className='w-full text-[14.22px] px-[15px] py-[13px] mb-[20px] md:mb-[20px] rounded-lg border-[1px] border-secondary-gray bg-secondary-light text-secondary-light-gray font-lato outline-none focus:ring-1 focus:ring-blue-500'
//                                 id='otp'
//                                 type="number"
//                                 placeholder='Enter your Otp'
//                                 name='otp'
//                                 value={userReset.otp}
//                                 onChange={inputHandleFun} />
//                             {userResetErr && <span className='absolute text-primary-Err text-xs top-[48px]'>{userResetErr.otp}</span>}
//                         </div>

//                         <div className='relative flex flex-col'>
//                             <input
//                                 className='w-full text-[14.22px] px-[15px] py-[13px] mb-[20px] md:mb-[20px] rounded-lg border-[1px] border-secondary-gray bg-secondary-light text-secondary-light-gray font-lato outline-none focus:ring-1 focus:ring-blue-500'
//                                 id='newpassword'
//                                 type="password"
//                                 placeholder='New Password'
//                                 name='newPassword'
//                                 value={userReset.newPassword}
//                                 onChange={inputHandleFun} />
//                             {userResetErr && <span className='absolute text-primary-Err text-xs top-[48px]'>{userResetErr.newPassword}</span>}
//                         </div>

//                         <button
//                             type="submit"
//                             className='text-sm md:text-[16px] px-[17px] py-[12px] mb-[20px] w-full text-primary-light bg-primary-violet font-lato font-medium rounded-lg '
//                         >Reset Password</button>
//                     </form>
//                     <button
//                         onClick={restOptFunction}
//                         type="button"
//                         className='text-sm md:text-[16px] px-[17px] py-[12px] mb-[20px] w-full text-primary-light bg-primary-violet font-lato font-medium rounded-lg '
//                     >Reset OTP</button>

//                     <NavLink to="/"
//                         className="text-[14.22px] text-primary-violet font-lato px-2 flex items-center justify-center">
//                         Back to Forgot</NavLink>

//                 </div>
//             </div>
//         </div>
//     )
// }

// export default VerifyuserReset;