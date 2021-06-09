import { configureStore, combineReducers } from '@reduxjs/toolkit'
import contactReducer from './contactSlice'
import {loggerMiddleware} from "../loggerMiddleware/loggerMiddleware";


const rootReducer = combineReducers({
       toolkit: contactReducer
})

export default configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware)
})
