import React from "react";
import { CartContext, ShippingContext } from "../others/Context";
import { checkoutReducer } from "../others/Reducer";
import { saveShippingAddress } from "../services/shippingService";
import useFetchAll from "../services/useFetchAll";
import Spinner from "../components/Spinner";

const STATUS = {
  IDLE: "IDLE",
  SUBMITTING: "SUBMITTING",
  SUBMITTED: "SUBMITTED",
  COMPLETED: "COMPLETED",
  PAYED: "PAYED",
};

// Declaring outside component to avoid recreation on each render
// const emptyAddress = {
//   city: "",
//   country: "",
// };

export default function Checkout() {
  let totalPrice = 0;
  const { cart, dispatch } = React.useContext(CartContext);
  const urls = cart.map((i) => `products/${i.id}`);
  const { data: products, loading, error } = useFetchAll(urls);
  const { shippingAddress, dispatchShipping } =
    React.useContext(ShippingContext);

  // const [address, setAddress] = React.useState(emptyAddress);
  // const [address, dispatchAddress] = React.useReducer(
  //   checkoutReducer,
  //   emptyAddress
  // );
  const [status, setStatus] = React.useState(STATUS.IDLE);
  const [saveError, setSaveError] = React.useState(null);
  // const [touched, setTouched] = React.useState({});
  const [touched, dispatchTouched] = React.useReducer(checkoutReducer, {});

  const errors = getErrors(shippingAddress);
  const isValid = Object.keys(errors).length === 0;

  function getErrors(address) {
    const result = {};
    if (!address.city) result.city = "city is required";
    if (!address.country) result.country = "country is required";
    return result;
  }

  function handleChange(e) {
    e.persist();
    // setAddress((currAddress) => {
    //   return { ...currAddress, [e.target.id]: e.target.value };
    // });
    dispatchShipping({ type: "handle-address-change", e });
  }

  function handleBlur(event) {
    event.persist();
    // setTouched((curr) => {
    //   return { ...curr, [event.target.id]: true };
    // });
    dispatchTouched({ type: "handle-touched-change", event });
  }

  function handleCheckout(e) {
    e.preventDefault();
    dispatch({ type: "empty-cart" });
    setStatus(STATUS.PAYED);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(STATUS.SUBMITTING);
    if (isValid) {
      try {
        localStorage.setItem(
          "shipping-address",
          JSON.stringify(shippingAddress)
        );
        await saveShippingAddress(shippingAddress);
        setStatus(STATUS.COMPLETED);
      } catch (e) {
        setSaveError(e);
      }
    } else {
      setStatus(STATUS.SUBMITTED);
    }
  }

  function renderItem(itemInCart) {
    const { id, sku, quantity } = itemInCart;
    const { price, name, image, skus } = products.find(
      (p) => p.id === parseInt(id)
    );
    const { size } = skus.find((s) => s.sku === sku);

    totalPrice = totalPrice + price * quantity;

    return (
      <li key={sku} className="cart-item">
        <img src={`/images/${image}`} alt={name} />
        <div>
          <h3>{name}</h3>
          <p>${price * quantity}</p>
          <p>Size: {size}</p>
          <p>Quantity: {quantity}</p>
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
  if (saveError) throw saveError;
  if (status === STATUS.PAYED) return <h1>Thanks for shopping</h1>;

  return (
    <>
      {shippingAddress.city && shippingAddress.country ? (
        <main id="checkout-main">
          <div className="cart">
            <h1>Cart</h1>
            <section id="cart">
              {numInCart === 1
                ? `${numInCart} item found`
                : `${numInCart} items found`}
              <ul>{cart.map(renderItem)}</ul>
            </section>
            <p style={{ color: "green", fontWeight: "bold" }}>{`$ ${Math.ceil(
              totalPrice
            )}`}</p>
            <form onSubmit={handleCheckout}>
              <div>
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Checkout"
                  disabled={status === STATUS.SUBMITTING}
                />
              </div>
            </form>
          </div>

          <div className="shipping-info">
            <div style={{ marginBottom: 20 }}>
              <h1>Shipping Info</h1>
            </div>
            {!isValid && status === STATUS.SUBMITTED && (
              <div role="alert">
                <p>Please fix the following errors</p>
                <ul>
                  {Object.keys(errors).map((errKey) => {
                    return <li key={errKey}>{errors[errKey]}</li>;
                  })}
                </ul>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="city">City</label>
                <br />
                <input
                  id="city"
                  type="text"
                  value={shippingAddress.city}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <p role="alert">
                  {(touched.city || status === STATUS.SUBMITTED) && errors.city}
                </p>
              </div>

              <div>
                <label htmlFor="country">Country</label>
                <br />
                <select
                  id="country"
                  value={shippingAddress.country}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  <option value="">Select Country</option>
                  <option value="China">China</option>
                  <option value="India">India</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="USA">USA</option>
                </select>
                <p role="alert">
                  {(touched.country || status === STATUS.SUBMITTED) &&
                    errors.country}
                </p>
              </div>

              <div>
                {status === STATUS.COMPLETED && (
                  <p style={{ color: "blue" }}>Shipping address saved</p>
                )}
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Save Shipping Info"
                  disabled={status === STATUS.SUBMITTING}
                />
              </div>
            </form>
          </div>
        </main>
      ) : (
        <main id="checkout-main">
          <div className="shipping-info">
            <h1>Shipping Info</h1>
            {!isValid && status === STATUS.SUBMITTED && (
              <div role="alert">
                <p>Please fix the following errors</p>
                <ul>
                  {Object.keys(errors).map((errKey) => {
                    return <li key={errKey}>{errors[errKey]}</li>;
                  })}
                </ul>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="city">City</label>
                <br />
                <input
                  id="city"
                  type="text"
                  value={shippingAddress.city}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <p role="alert">
                  {(touched.city || status === STATUS.SUBMITTED) && errors.city}
                </p>
              </div>

              <div>
                <label htmlFor="country">Country</label>
                <br />
                <select
                  id="country"
                  value={shippingAddress.country}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  <option value="">Select Country</option>
                  <option value="China">China</option>
                  <option value="India">India</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="USA">USA</option>
                </select>
                <p role="alert">
                  {(touched.country || status === STATUS.SUBMITTED) &&
                    errors.country}
                </p>
              </div>

              <div>
                {status === STATUS.COMPLETED && (
                  <p style={{ color: "blue" }}>Shipping address saved</p>
                )}
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Save Shipping Info"
                  disabled={status === STATUS.SUBMITTING}
                />
              </div>
            </form>
          </div>
        </main>
      )}
    </>
  );
}
