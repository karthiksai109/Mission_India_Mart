// import React from "react";
// import "./Cart.css";

// const Cart = ({ cartItems, deleteFromCart }) => {
//     const totalAmount = cartItems.reduce(
//         (total, item) => total + item.price * item.quantity,
//         0
//     );

//     return (
//         <div className="cart-container">
//             <h2>Your Cart</h2>
//             {cartItems.length === 0 ? (
//                 <p>Your cart is empty.</p>
//             ) : (
//                 <div>
//                     <ul>
//                         {cartItems.map((item) => (
//                             <li key={item._id} className="cart-item">
//                                 <div className="item-details">
//                                     {item.name} - Quantity: {item.quantity} - $
//                                     {item.price * item.quantity}
//                                 </div>
//                                 <button
//                                     className="delete-btn"
//                                     onClick={() => deleteFromCart(item._id)}
//                                 >
//                                     Remove
//                                 </button>
//                             </li>
//                         ))}
//                     </ul>
//                     <h3>Total: ${totalAmount.toFixed(2)}</h3>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Cart;

import React from "react";
import "./Cart.css";



import { useNavigate } from 'react-router-dom'

const Cart = ({ cartItems, deleteFromCart }) => {
    const navigate = useNavigate();
    const totalAmount = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const handlePayment = () => {
        // Payment logic here (e.g., redirect to a payment page)
        alert("Redirecting to payment gateway...");
        navigate('/')
    };

    return (
        <div className="cart-container">
       
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item._id} className="cart-item">
                                <div className="item-details">
                                    <img
                                        src={item.imageUrl || "https://via.placeholder.com/50"}
                                        alt={item.name}
                                        className="item-image"
                                    />
                                    <div className="item-info">
                                        {item.name} - Quantity: {item.quantity}
                                    </div>
                                </div>
                                <div className="cart-actions">
                                    <button
                                        className="decrease-btn"
                                        onClick={() => deleteFromCart(item._id, 1)}
                                    >
                                        -
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => deleteFromCart(item._id, item.quantity)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-summary">
                        Total: ${totalAmount.toFixed(2)}
                    </div>
                    <button className="make-payment" onClick={handlePayment}>
                        Make Payment
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;
