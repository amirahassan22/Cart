import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Coupon from "../../../cartItem";
import axios from "axios";
import {  toast } from 'react-toastify';

const url = "https://www.course-api.com/react-useReducer-cart-project";
export const getCartItems = createAsyncThunk('cart/getItems', async(name,thunkAPI)=>{
    try {
        const response = await axios(url);
        // console.log(response.data);
        // console.log(name);
        // console.log(thunkAPI);        
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue("Something went wrong ,try again !");
    }
})

const initialState = {
    cartItems: [],
    amount:4,
    total:0,
    enteredCupon:"",
    coupons : Coupon,
    savings:0,
    isLoading:false,
    msg:"",
}

 const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        clearBag: state=>{
           state.cartItems=[] ;
           state.amount = 0;
        },
        removeItem: (state,action)=>{
            const itemId = action.payload;
            const deletedItem = [...state.cartItems.filter(item => item.id === itemId
            )];
            state.cartItems = state.cartItems.filter(item => item.id !== itemId
            );
            state.amount -= 1;
            state.total -= deletedItem[0].price; 
            
        },
        toggleAmount : (state,{payload})=>{
            console.log(payload);
            const itemsId = payload.id;
            const item = state.cartItems.find(item => item.id === itemsId);
            if(payload.isClicked) item.amount += 1;
            else item.amount -= 1
            state.amount = state.cartItems.reduce((acc,val) => acc + val.amount ,0.0)
            state.total += parseFloat(item.price);

        },
       totalPrice : (state)=>{
        const total = state.cartItems.reduce((accumulator,currentVal) => accumulator + parseFloat(currentVal.price)*currentVal.amount ,0);
        state.total = total;
       },
       getCoupon:(state,{payload})=>{
        state.enteredCupon = payload;
        
       },
       calcPriceAfterSale :(state)=>{
        const matchedCupon = state.coupons.find(item => item.name === state.enteredCupon)
        if (matchedCupon) {
           console.log(matchedCupon.percentage);
           state.savings =Math.ceil( ( matchedCupon.percentage/100) * state.total) ;
           
        }else{
            toast.error("Not Valid Coupon");
        }
       },
    },
    extraReducers: (builder)=>{
        builder.addCase(getCartItems.pending,(state)=>{
            state.isLoading = true;
        }).addCase(getCartItems.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.cartItems = action.payload
        }).addCase(getCartItems.rejected,(state,action)=>{
            console.log(action.payload);
            state.isLoading = false;
        });
    },
})


export const {clearBag ,removeItem,toggleIsClicked,toggleAmount,totalPrice,getCoupon,calcPriceAfterSale} = cartSlice.actions;
export default cartSlice.reducer;
