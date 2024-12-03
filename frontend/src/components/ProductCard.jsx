import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, addToCart }) => {
    return (
        <div className="product-card">
            <img
                src={product.imageUrl || "https://via.placeholder.com/150"}
                alt={product.name}
            />
            <h3>{product.name}</h3>
            <p>{product.category}</p>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
    );
};

export default ProductCard;
