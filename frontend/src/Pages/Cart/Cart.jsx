import React, { useContext } from "react";
import { CartContext } from "../../CartContext";
import Footer from "../../components/Footer/Footer.jsx";
import "./Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Item image</th>
                <th>Product name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.product.id}>
                  <td data-label="Item image">
                    <img src={item.product.image} alt={item.product.name} />
                  </td>
                  <td data-label="Product name">{item.product.name}</td>
                  <td data-label="Price">₦{item.product.price}</td>
                  <td data-label="Quantity">
                    <div className="quantity-control">
                      <button onClick={() => updateQuantity(item.product.id, "decrease")}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, "increase")}>+</button>
                    </div>
                  </td>
                  <td data-label="Total">
                    ₦{(item.product.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td data-label="">
                    <button onClick={() => removeFromCart(item.product.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart-totals">
            <h3>Cart Totals</h3>
            <div className="cart-row">
              <span>Subtotal</span>
              <span className="amount">
                ₦{cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)
                .toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            {/*<div className="cart-row">
              <span>Delivery Fee</span>
              <span className="amount">₦2.00</span>
            </div>*/}
            <div className="cart-row total">
              <span>Total</span>
              <span className="amount">
                ₦{cartItems
                  .reduce((total, item) => total + item.product.price * item.quantity, 0)
                  .toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};

export default Cart;
