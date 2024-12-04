import React from 'react'
import TotalPrice from '../TotalPrice/TotalPrice'
import CartItem from '../CartItem/CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { clearBag } from '../Features/Cart/CartSlice';
import { openModal } from '../Features/Modal/ModalSlice';

export default function Cart() {
 const {amount,msg} = useSelector(state=>state.cart);
 const dispatch = useDispatch();
 
  if(amount<1){
    return(
      <section className='w-full py-32 flex justify-center items-center'>
        <div>
          <h2 className='text-4xl font-bold tracking-wider mb-4'>Your Bag</h2>
          <h4 className='text-2xl font-normal tracking-widest text-red-400'>is currently empty :(</h4>
        </div>
      </section>
    )
  }
  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
    <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>
  
      <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
        <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
          <CartItem/>
          <button type="button" className='bg-red-700 mt-8 text-white w-80 hover:border-2 hover:border-red-700 hover:bg-transparent hover:text-red-700 transition-all duration-300' onClick={()=>{ 
            dispatch(openModal())
            //  dispatch(clearBag())
             }}>Clear Bag</button>
        </div>
        
        <TotalPrice/>
      </div>
      
    </div>
  </section>
  )
}
