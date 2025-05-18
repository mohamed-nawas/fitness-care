import React from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../others/Context";
import useFetchAll from "../services/useFetchAll";
import Spinner from "../components/Spinner";

export default function Cart() {
  const { cart, dispatch } = React.useContext(CartContext);
  const navigate = useNavigate();
  const urls = cart.map((i) => `products/${i.id}`);
  const { data: products, loading, error } = useFetchAll(urls);

  function renderItem(itemInCart) {
    const { id, sku, quantity } = itemInCart;
    const { price, name, image, skus } = products.find(
      (p) => p.id === parseInt(id)
    );

    const { size } = skus.find((s) => s.sku === sku);

    return (
      <li key={sku} className="cart-item">
        {/* <img src={`/images/${image}`} alt={name} /> */}
        <img src={`${process.env.PUBLIC_URL}/images/${image}`} alt={name} />
        <div>
          <h3>{name}</h3>
          <p>${price * quantity}</p>
          <p>Size: {size}</p>
          <p>
            <select
              aria-label={`Select quantity for ${name} size ${size}`}
              onChange={(e) =>
                dispatch({
                  type: "update-cart-quantity",
                  sku,
                  quantity: parseInt(e.target.value),
                })
              }
              value={quantity}
            >
              <option value="0">Remove</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </p>
        </div>
      </li>
    );
  }

  const numInCart = React.useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  if (loading) return <Spinner />;
  if (error) throw error;

  return (
    <>
      <section id="cart">
        {cart.length === 0 ? (
          <h1>Cart is empty</h1>
        ) : numInCart === 1 ? (
          `${numInCart} item found`
        ) : (
          `${numInCart} items found`
        )}
        <ul>{cart.map(renderItem)}</ul>
      </section>
      {cart.length ? (
        <p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/checkout")}
          >
            Checkout
          </button>
        </p>
      ) : null}
    </>
  );
}
