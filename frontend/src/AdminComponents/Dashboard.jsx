import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../slices/user";


const Dashboard = () => {

    const user  = useSelector((state) => state.user)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setUser([[{name:"suresh"},{name:"suresh"}]]))
        console.log(user, "user");
        

    },[])

    return(
        <>
            <div>
                
                <div>
                    dashboard
                </div>
            </div>
        </>
    )
}


export default Dashboard;