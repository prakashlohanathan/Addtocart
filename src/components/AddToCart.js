import React, { useState } from 'react';
import './AddToCart.css'; // Importing the CSS file

const allBrands = [
    { id: "1", brandName: "Puma" },
    { id: "2", brandName: "Nike" },
    { id: "3", brandName: "Reebok" },
    { id: "4", brandName: "Campus" },
    { id: "5", brandName: "Adidas" }
];

const AddToCart = () => {
    const [cart, setCart] = useState([]);

    // Function to add an item to the cart
    const onAddToCartClick = (id) => {
        const existingItem = cart.find((item) => item.id === id);
        if (existingItem) {
            setCart(
                cart.map((item) =>
                    item.id === id ? { ...item, count: item.count + 1 } : item
                )
            );
        } else {
            const selectedItem = allBrands.find((item) => item.id === id);
            setCart([...cart, { ...selectedItem, count: 1 }]);
        }
    };

    // Function to remove or decrement an item from the cart
    const onRemoveClick = (id) => {
        const existingItem = cart.find((item) => item.id === id);
        if (existingItem && existingItem.count > 1) {
            setCart(
                cart.map((item) =>
                    item.id === id ? { ...item, count: item.count - 1 } : item
                )
            );
        } else {
            setCart(cart.filter((item) => item.id !== id));
        }
    };

    // Calculate total quantity
    const getTotalQuantity = () => {
        return cart.reduce((total, item) => total + item.count, 0);
    };

    return (
        <div className="add-to-cart-container">
            <div className="brands-list">
                <h2>Available Brands</h2>
                {allBrands.map((brand) => (
                    <div key={brand.id} className="brand-item">
                        <span className="brand-name">{brand.brandName}</span>
                        <button
                            className="add-button"
                            onClick={() => onAddToCartClick(brand.id)}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
            <div className="cart-list">
                <h2>Your Cart</h2>
                {cart.length > 0 ? (
                    <>
                        {cart.map((brand) => (
                            <div key={brand.id} className="cart-item">
                                <span className="brand-name">
                                    {brand.brandName} - {brand.count}
                                </span>
                                <button
                                    className="minus-button"
                                    onClick={() => onRemoveClick(brand.id)}
                                >
                                    -
                                </button>
                                <button
                                    className="add-button"
                                    onClick={() => onAddToCartClick(brand.id)}
                                >
                                    +
                                </button>
                            </div>
                        ))}
                        <p className="total-quantity">
                            <b>Total Quantity:</b> {getTotalQuantity()}
                        </p>
                    </>
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>
        </div>
    );
};

export default AddToCart;