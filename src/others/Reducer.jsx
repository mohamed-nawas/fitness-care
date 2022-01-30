export const cartReducer = (cartState, action) => {
  switch (action.type) {
    default:
      throw new Error("Unhandled action type " + action.type);
    case "empty-cart":
      return [];
    case "add-to-cart": {
      const { id, sku } = action;
      const itemInCart = cartState.find((i) => i.sku === sku);
      if (itemInCart) {
        return cartState.map((i) =>
          i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...cartState, { id, sku, quantity: 1 }];
      }
    }
    case "update-cart-quantity":
      const { sku, quantity } = action;
      return quantity === 0
        ? cartState.filter((i) => i.sku !== sku)
        : cartState.map((i) => (i.sku === sku ? { ...i, quantity } : i));
  }
};

export const checkoutReducer = (checkoutState, action) => {
  switch (action.type) {
    default:
      throw new Error("Unhandled action type " + action.type);
    case "handle-address-change":
      const { e } = action;
      return { ...checkoutState, [e.target.id]: e.target.value };
    case "handle-touched-change":
      const { event } = action;
      return { ...checkoutState, [event.target.id]: true };
  }
};
