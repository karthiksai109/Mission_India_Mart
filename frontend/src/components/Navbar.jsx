import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ cartCount }) => {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <h1 onClick={() => navigate("/")}>IndiaMart</h1>
            <button onClick={() => navigate("/cart")}>
                Cart: {cartCount}
            </button>
        </nav>
    );
};

export default Navbar;