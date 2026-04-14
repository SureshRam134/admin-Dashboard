import { useSelector } from "react-redux";


const Dashboard = () => {

    const token = useSelector((state) => state)
    console.log(token, 798799790);
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