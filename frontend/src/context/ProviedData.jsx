import { createContext } from "react";


export const ContextData = createContext();

const initial = {
    roleId : '',
    email : '',
    token : '',
}

const ProviedData = ({children}) => {
    const getToken = localStorage.getItem("tokenProfile")
    const currentUser = getToken ? JSON?.parse(getToken ): initial
    

    return (
        <ContextData.Provider value={{currentUser}}>
            {children}
        </ContextData.Provider>
    )
}

export default ProviedData;