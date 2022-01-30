import React from "react";
import { cartReducer, checkoutReducer } from "./Reducer";

// cart context
export const CartContext = React.createContext(null);

let initialCartState;
try {
  initialCartState =
    JSON.parse(
      localStorage.getItem("cart") ?? console.error("localstorage key invalid")
    ) ?? [];
} catch {
  console.error("The cart could not be parsed into JSON.");
  initialCartState = [];
}

export function CartProvider(props) {
  const [cart, dispatch] = React.useReducer(cartReducer, initialCartState);
  React.useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const contextValue = {
    cart,
    dispatch,
  };
  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
}

// shipping context
export const ShippingContext = React.createContext(null);

let initialShippingAddress;
try {
  initialShippingAddress =
    JSON.parse(
      localStorage.getItem("shipping-address") ??
        console.error("localstorage key invalid")
    ) ?? {};
} catch {
  console.error("Shipping address could not be written into JSON");
  initialShippingAddress = {};
}

export function ShippingAddressProvider(props) {
  const [shippingAddress, dispatchShipping] = React.useReducer(
    checkoutReducer,
    initialShippingAddress
  );
  return (
    <ShippingContext.Provider value={{ shippingAddress, dispatchShipping }}>
      {props.children}
    </ShippingContext.Provider>
  );
}
