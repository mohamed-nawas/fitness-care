import React from "react";
import { cartReducer, checkoutReducer } from "./Reducer";

// ---- CART CONTEXT ---- //
export const CartContext = React.createContext(null);

// Load cart safely
let initialCartState = [];
try {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    initialCartState = JSON.parse(storedCart);
  }
} catch (err) {
  console.error("Failed to parse cart from localStorage", err);
}

export function CartProvider({ children }) {
  const [cart, dispatch] = React.useReducer(cartReducer, initialCartState);

  React.useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (err) {
      console.error("Failed to save cart to localStorage", err);
    }
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

// ---- SHIPPING CONTEXT ---- //
export const ShippingContext = React.createContext(null);

let initialShippingAddress = {};
try {
  const storedShipping = localStorage.getItem("shipping-address");
  if (storedShipping) {
    initialShippingAddress = JSON.parse(storedShipping);
  }
} catch (err) {
  console.error("Failed to parse shipping address from localStorage", err);
}

export function ShippingAddressProvider({ children }) {
  const [shippingAddress, dispatchShipping] = React.useReducer(
    checkoutReducer,
    initialShippingAddress
  );

  React.useEffect(() => {
    try {
      localStorage.setItem(
        "shipping-address",
        JSON.stringify(shippingAddress)
      );
    } catch (err) {
      console.error("Failed to save shipping address to localStorage", err);
    }
  }, [shippingAddress]);

  return (
    <ShippingContext.Provider value={{ shippingAddress, dispatchShipping }}>
      {children}
    </ShippingContext.Provider>
  );
}
