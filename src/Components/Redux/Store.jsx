import { configureStore } from "@reduxjs/toolkit";
import '../Features/Cart/CartSlice.js'
import cartReducer from '../Features/Cart/CartSlice.js'
import modalReducer from '../Features/Modal/ModalSlice.js'

export const store = configureStore({
    reducer:{
        cart:cartReducer,
        modal: modalReducer,
    }
    
})