import {configureStore}from "@reduxjs/toolkit"
import authToken from '../slices/userToken'
import {persistReducer, persistStore} from 'redux-persist'




const storage = {
    getItem: (key) => Promise.resolve(localStorage.getItem(key)),
    setItem: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
    removeItem: (key) => Promise.resolve(localStorage.removeItem(key))
}

const persistConfig = {
    key :"auth",
    storage
}

const perReducer = persistReducer(persistConfig, authToken)

export const store = configureStore({
    reducer:{
        auth: perReducer,
    },
})

export const persistor =  persistStore(store)

