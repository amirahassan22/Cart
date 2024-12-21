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
    priceAfterSale:0,
    itemOnSale:"",
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
            state.amount -= deletedItem[0].amount;
            // let x = deletedItem[0].price * deletedItem[0].amount;
            state.total -= deletedItem[0].price * deletedItem[0].amount; 
            
        },
        toggleAmount : (state,{payload})=>{
            console.log(payload);
            const itemsId = payload.id;
            const item = state.cartItems.find(item => item.id === itemsId);
            console.log(item.price);
            
            if(payload.isClicked) {
                item.amount += 1;
                state.amount = state.cartItems.reduce((acc,val) => acc + val.amount ,0.0)
                state.total += parseFloat(item.price);
            }
            else {
                item.amount -= 1
                state.amount = state.cartItems.reduce((acc,val) => acc + val.amount ,0.0)
                state.total -= parseFloat(item.price);
            }
           

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
        console.log(matchedCupon);
        
        if (matchedCupon) {
            // console.log(matchedCupon);
            // if (matchedCupon.targetProductId) {
            //     console.log("lkdn");
                
            // }else{
            //     console.log("fadya");
                
            // }
            // try {
            //     if (matchedCupon.targetProductId) {
            //             console.log("lkdn");
                        
            //     }
            // } catch (error) {
            //     console.log("fds");
                
            // }
            console.log(matchedCupon.targetProductId);
            if (matchedCupon.targetProductId) {
                const prod = state.cartItems.filter(item => item.id === matchedCupon.targetProductId)
                console.log(prod[0].price);
                console.log(matchedCupon.percentage);
                state.itemOnSale = prod[0].id;
                console.log(state.itemOnSale);
                state.priceAfterSale = prod[0].price - ((matchedCupon.percentage/100) * prod[0].price);
                console.log(state.priceAfterSale);
            }else{
               
            }
            
            console.log("gfds");
            
        }else{
            console.log("sah");
            
        }
        if (matchedCupon) {
           console.log(matchedCupon.percentage);
           if (matchedCupon.targetProductId ){
           const prod =  state.cartItems.filter(item => item.id === matchedCupon[0].targetProductId );
           console.log(prod);
           
           }
           
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
