import {combineReducers, configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice' 
import jobSlice from './jobSlice' 
import companySlice from './companySlice'
import appliacntSlice from './applicantsSlice'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web



const persistConfig = {
  key: 'root',
  storage,
}
 
const rootReducer = combineReducers({
       auth : authSlice,
        job : jobSlice,
        company: companySlice,
        applicant:appliacntSlice
})


const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
    reducer:persistedReducer
    
})

 
export default store