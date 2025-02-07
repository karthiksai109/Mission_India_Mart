
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes,useLocation } from "react-router-dom";
import { UserProvider } from './context/UserContext';
import Home from './Home/Home';
import Final from './Final/final';
import Register from "./register/register";
import Login from './Login/login';
import UserDetails from './UserDetails/UserDetails';
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart"; 
import BudgetTool from "./components/BudgetTool";
import './App.css';

function App() {

  const [cart, setCart] = useState([]);


  const addToCart = (product) => {
    
      setCart((prevCart) => {
          const existingProduct = prevCart.find((item) => item._id === product._id);
          if (existingProduct) {
              return prevCart.map((item) =>
                  item._id === product._id
                      ? { ...item, quantity: item.quantity + 1 }
                      : item
              );
          } else {
              return [...prevCart, { ...product, quantity: 1 }];
          }
      });
  };

  const deleteFromCart = (productId, quantity) => {
      setCart((prevCart) => {
          return prevCart
              .map((item) =>
                  item._id === productId
                      ? { ...item, quantity: item.quantity - quantity }
                      : item
              )
              .filter((item) => item.quantity > 0);
      });
  };

  return (
    
      <UserProvider>
        <Router> 

        <Content cart={cart} addToCart={addToCart} deleteFromCart={deleteFromCart} />
         </Router>
         </UserProvider>
  )}
function Content({ cart, addToCart, deleteFromCart }) {
  const location = useLocation(); // Now it's inside <Router>

  return (
    <div>
      {/* Conditionally render Navbar only if not on Home, Login, or Register */}
      {!(location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register') && (
        <Navbar cartCount={cart.reduce((total, item) => total + item.quantity, 0)} />
      )}
          <Routes> 
              <Route path='/' element={<Home/>}/>
              <Route path="/UserDetails" element={<UserDetails/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/final" element={<Final/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/Home" element={<Home/>}/>
              <Route path="/Navbar" element={<Navbar/>}/>
          
              <Route path="/shop" element={<ProductList addToCart={addToCart} />} />
              <Route path="/cart" element={<Cart cartItems={cart} deleteFromCart={deleteFromCart} />}
              />
          </Routes>
        
    </div>
  );
}

export default App;