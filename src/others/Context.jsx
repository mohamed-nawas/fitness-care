import React from "react";
import { cartReducer, checkoutReducer } from "./Reducer";

// cart context
export const CartContext = React.createContext(null);

// Safely parse cart from localStorage
let initialCartState = [];
try {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    initialCartState = JSON.parse(storedCart);
  }
} catch (error) {
  console.error("The cart could not be parsed into JSON.", error);
}

export function CartProvider(props) {
  const [cart, dispatch] = React.useReducer(cartReducer, initialCartState);

  React.useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to write cart to localStorage.", error);
    }
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {props.children}
    </CartContext.Provider>
  );
}

// shipping context
export const ShippingContext = React.createContext(null);

// Safely parse shipping address from localStorage
let initialShippingAddress = {};
try {
  const storedAddress = localStorage.getItem("shipping-address");
  if (storedAddress) {
    initialShippingAddress = JSON.parse(storedAddress);
  }
} catch (error) {
  console.error("Shipping address could not be parsed into JSON.", error);
}

export function ShippingAddressProvider(props) {
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
    } catch (error) {
      console.error("Failed to write shipping address to localStorage.", error);
    }
  }, [shippingAddress]);

  return (
    <ShippingContext.Provider value={{ shippingAddress, dispatchShipping }}>
      {props.children}
    </ShippingContext.Provider>
  );
}
