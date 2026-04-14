import {configureStore}from "@reduxjs/toolkit"
import authToken from '../slices/userToken'
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


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

export const persist =  persistStore(store)

