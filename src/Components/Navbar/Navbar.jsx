import React from 'react'
import { useSelector } from 'react-redux'
import CartIcon from '../Icons/Icons'
// import { getTotalAmount } from '../Features/Cart/CartSlice'

export default function Navbar() {
  const {amount} = useSelector(state=> state.cart)
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getTotalAmount())
  //   console.log("tamam");
    
  // }, [dispatch , cartItems.amount ])
  
  return (
    

<nav className="bg-blue-600 border-gray-200 dark:bg-gray-900 w-full">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
        {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" /> */}
        <span className="text-white self-center text-2xl font-semibold whitespace-nowrap">Redux</span>
    </a>
    <div className="relative md:block md:w-auto" id="navbar-default">
        <a className="text-white hover:text-green-400">
        <CartIcon/>
        </a>
        <div className='absolute -top-3 -right-2 w-6 h-6 rounded-full bg-blue-200 flex justify-center items-center text-white font-medium'>{amount}</div>
    </div>
  </div>
</nav>

  )
}
