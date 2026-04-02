import Signup from "./Signup"


const SuperAdminSignup = () => {
    const control = {
        type: "Super Admin",
        role : 1 ,
        path:"/superlogin"
    }
    return(
        <>
            <div>
                <Signup control={control}/>
            </div>
        </>
    )
}

export default SuperAdminSignup