
import React, { useState,useEffect } from 'react';
import './Home.css';
import BudgetTool from "../components/BudgetTool"
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate();
  const [token, setToken] = useState("JWT_TOKEN_FROM_AUTH");
  useEffect(() => {
    // Check if the user is logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        setUserName(user.name);
    }
}, []);
const [userName, setUserName] = useState('');
    const [budget, setBudget] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [cart, setCart] = useState([]);

    const products = [
        { id: 1, name: 'Traditional Clothes', image: 'https://via.placeholder.com/300x200?text=TraditionalClothes' },
        { id: 2, name: 'Indian Foods', image: 'https://via.placeholder.com/300x200?text=spices' },
        { id: 3, name: 'Kitchenware', image: 'https://via.placeholder.com/300x200?text=Kitchenware' },
        { id: 4, name: 'Indian Meat', image: 'https://via.placeholder.com/300x200?text=IndianMeat' },
    ];

    const handleBudgetFilter = () => {
        const filtered = products.filter((product) => product.price <= budget);
        setFilteredProducts(filtered);
    };

    const addToCart = (product) => {
        setCart([...cart, product]);
        console.log(`${product.name} added to cart`);
    };
    const handleLogout = () => {
      localStorage.removeItem('user');
      setUserName('');
      navigate('/login');
  };

    return (

        <div className="home-container">
            {/* Navigation Bar */}
            <div className="nav-links">
                    <button onClick={() => navigate('/')} className="nav-item">Home</button>
                    <button onClick={() => navigate('/login')} className="nav-item">Login</button>
                    <button onClick={() => navigate('/register')} className="nav-item">Register</button>
                </div>
            <nav className="nav-bar">
            <div className="logo">IndiaMart</div>
           
                
                
            <div className="user-actions">
                
                    <a href="#" className="nav-item">Home</a>
                    <a href="#budget-planning" className="nav-item">Budget Tool</a>
                    <a href="#products" className="nav-item">Products</a>
                    <a href="#about" className="nav-item">About Us</a>
                    <a href="#contact" className="nav-item">Contact</a>
                    
                   
                </div>
            
                <div className="nav-links">
                {!userName ? (
                    <button onClick={() => navigate('/login')} className="nav-item">Login</button>
                ) : (
                    <span className="nav-item">Welcome, {userName}</span>
                )}
            </div>
            <div className="user-actions">
                {!userName ? (
                    <button onClick={() => navigate('/login')} className="auth-button">Login</button>
                ) : (
                    <button onClick={handleLogout} className="auth-button">Logout</button>
                )}
                    <button className="cart-button">Cart ({cart.length})</button>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="hero-section">
                <h1>Welcome to IndiaMart</h1>
                <p>Your one-stop shop for Indian food, clothing, and more!</p>
                <button onClick={() => navigate('/shop')} className="shop-now-btn">Shop Now</button>
                
            </header>

            {/* Budget Planning Tool */}
            <section id="budget-planning" className="budget-planning-section">
                
                <BudgetTool token={token} />
              
             
               
            </section>

            {/* Products Section */}
            <section id="products" className="product-section">
                <h2 className="product-section-header">Our Products</h2>
                <div className="product-grid">
                    {products.map((product) => (
                        <div key={product.id} className="product-card">
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                           
                            <button onClick={() => navigate('/shop')} className="shop-now-btn">Discover More</button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <p>© 2024 IndiaMart. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
