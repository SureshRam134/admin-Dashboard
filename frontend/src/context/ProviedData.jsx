import { createContext } from "react";


export const ContextData = createContext();


const ProviedData = ({children}) => {
    const getToken = localStorage.getItem("tokenProfile")
    const currentUser = getToken ? JSON.parse(getToken): ''
    

    return (
        <ContextData.Provider value={{currentUser}}>
            {children}
        </ContextData.Provider>
    )
}

export default ProviedData;