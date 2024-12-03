import React, { useState, useEffect } from "react";
import "./ProductList.css";



const ProductList = ({ addToCart }) => {
    
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:3000/products");
                if (!response.ok) throw new Error("Failed to fetch products.");
                const data = await response.json();
                setProducts(data.products);
                setFilteredProducts(data.products); // Initialize filtered products
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        // Filter products whenever the search term changes
        const results = products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(results);
    }, [searchTerm, products]);

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        
        <div className="product-list-container">
        
 
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                />
            </div>
            <div className="product-grid">
                {filteredProducts.map((product) => (
                    <div key={product._id} className="product-card">
                        <img
                            src={product.imageUrl || "https://via.placeholder.com/150"}
                            alt={product.name}
                        />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p className="price">${product.price}</p>
                        <button onClick={() => addToCart(product)}>
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
