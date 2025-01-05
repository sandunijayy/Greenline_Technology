import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { Link,useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import '../styles/bookingCss/css/style.css';
import '../styles/siteCss/css/style.css'

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState(""); // State for coupon code
  const [discountedPrice, setDiscountedPrice] = useState(null); // State for discounted price
  
  // total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price * item.quantity; // Update the calculation based on the quantity
      });
      return total.toLocaleString("en-LK", {
        style: "currency",
        currency: "LKR",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const applyCoupon = () => {
    try {
      // Make an API call to validate and apply the coupon code
      // Update the discounted price state accordingly
      // For demonstration purposes, let's assume the API returns the discounted price directly
      const discountedPriceFromAPI = 100; // Example discounted price
      setDiscountedPrice(discountedPriceFromAPI);
    } catch (error) {
      console.log(error);
    }
  };
  // delete item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Fetch the Braintree client token when the component mounts
    if (auth?.token) {
      getToken();
    }
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  // handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  const updateQuantity = (pid, newQuantity) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      
      if (index !== -1) {
        myCart[index].quantity = newQuantity;
        setCart(myCart);
        localStorage.setItem("cart", JSON.stringify(myCart));
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-14">
            <h4 className="text-center">
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : " Your Cart Is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7">
            {cart?.map((p) => (
              <table className="table">
              <tbody>
                  
                      <tr key={p._id}>
                          <td
                              className="cart-product-remove"
                              style={{ width: '5%' }}
                              onClick={() => removeCartItem(p._id)}
                          >
                              x
                          </td>
                          <td
                              className="cart-product-image"
                              style={{ width: '30%' }}
                          >
                              <img
                                  src={`/api/v1/product/product-photo/${p._id}`}
                                  alt={p.name}
                                  width="50"
                                  height="50"
                              />
                          </td>
                          <td
                              className="cart-product-info"
                              style={{ width: '75%' }}
                          >
                              <h4>{p.name}</h4>
                              <p>{p.description.substring(0, 30)}</p>
                          </td>
                          <td
                              className="cart-product-price"
                              style={{ width: '10%' }}
                          >
                              {p.price}
                          </td>
                          <td
                              className="cart-product-quantity"
                              style={{ width: '20%' }}
                          >
                              <input
                                  type="number"
                                  value={p.quantity}
                                  min="1"
                                  onChange={(e) => updateQuantity(p._id, parseInt(e.target.value))}
                                  className="form-control"
                              />
                          </td>
                          <td
                              className="cart-product-subtotal"
                              style={{ width: '25%' }}
                          >
                              {(p.price * p.quantity).toFixed(2)}
                          </td>
                      </tr>
                 
              </tbody>
          </table>
            ))}
                  <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter Coupon Code"
            />
            <button onClick={applyCoupon}>Apply Coupon</button>
            <Link to= '/cards/CardHome' class="theme-btn-1 btn btn-effect-1">
                    add card
          </Link>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total : {totalPrice()} </h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>

                  

                  
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Plase Login to checkout
                  </button>
                )}
              </div>

              
            )}
            <div className="mt-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />

                  <button
                    className="btn theme-btn-1 btn-effect-1 text-uppercase"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>

                  
                </>
              )}
            </div>
            

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
