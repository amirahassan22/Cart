import { FiMinus, FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, toggleAmount } from "../Features/Cart/CartSlice";


export default function CartItem() {
 
  const {cartItems} = useSelector(state=> state.cart);
  const dispatch = useDispatch();

  return (
    <div className="space-y-6">
      {cartItems.map((item) => {
        const {id,title,price,img,amount} = item
        return (
          <div
            key={id}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
          >
            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
              <a href="#" className="shrink-0 md:order-1">
                <img
                  className="h-20 w-20"
                  src={img}
                  alt="imac image"
                />
              </a>

              <label for="counter-input" className="sr-only">
                Choose quantity:
              </label>
              <div className="flex items-center justify-between md:order-3 md:justify-end">
                <div className="flex items-center">
                  <button
                    type="button"
                    id="decrement-button"
                    data-input-counter-decrement="counter-input"
                    className="inline-flex h-5 text-sm  shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                    onClick={()=>{
                      if(amount <= 1 ) {
                        dispatch(removeItem(id));
                        return;
                      }
                      dispatch(toggleAmount({id,isClicked:false}))
                    }} 
                 >
                    <FiMinus />
                  </button>
                  <input
                    type="text"
                    id="counter-input"
                    data-input-counter
                    className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                    placeholder=""
                    value={amount}
                    required
                  />
                  <button
                    type="button"
                    id="increment-button"
                    data-input-counter-increment="counter-input"
                    className="inline-flex h-5 text-sm shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                    onClick={()=>{
                     
                      dispatch(toggleAmount({id,isClicked:true}))
                  }}                  
                  >
                    <FiPlus />
                  </button>
                </div>
                <div className="text-end md:order-4 md:w-32">
                  <p className="text-base font-bold text-gray-900 dark:text-white">
                    ${price}
                  </p>
                </div>
              </div>

              <div className="w-full min-w-0  flex-1 space-y-4 md:order-2 md:max-w-md">
                <a
                  href="#"
                  className=" text-base font-medium text-gray-900 hover:underline dark:text-white"
                >
                  {title}
                </a>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
                  >
                    <svg
                      className="me-1.5 h-5 w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                      />
                    </svg>
                    Add to Favorites
                  </button>

                  <button
                    type="button"
                    className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                    onClick={()=> dispatch(removeItem(id))}
                  >
                    <svg
                      className="me-1.5 h-5 w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18 17.94 6M18 18 6.06 6"
                      />
                    </svg>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}