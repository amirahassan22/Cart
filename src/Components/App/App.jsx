import { ToastContainer } from "react-toastify";
import Cart from "../Cart/Cart";
import Navbar from "../Navbar/Navbar";
import "./App.css";
import Modal from "../Modal/Modal";
import { getCartItems } from "../Features/Cart/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Circles } from "react-loader-spinner";
import { useEffect } from "react";

function App() {
  const { isLoading } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartItems('passed Parameter'));
    // console.log("kjh");
  }, []);

  if (isLoading) {
    return (
      <div className="fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center">
        <Circles
          height="80"
          width="80"
          color="#2563EB"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Cart />
      <ToastContainer position="top-center" />
      <Modal />
    </>
  );
}

export default App;
