import {configureStore}from "@reduxjs/toolkit"
import authToken from '../slices/userToken'
import user from '../slices/user'
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/es/storage';


const persistConfig = {
    key :"auth",
    storage
}
const persistConfigUser = {
    key :"user",
    storage
}

const perReducer = persistReducer(persistConfig, authToken)
const perUser = persistReducer(persistConfigUser, user)

export const store = configureStore({
    reducer:{
        auth: perReducer,
        user: perUser,
    },
    devTools:true
})

export const persistor =  persistStore(store)

