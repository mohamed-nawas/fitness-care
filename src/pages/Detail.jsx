import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../others/Context";
import PageNotFound from "./PageNotFound";
import useFetch from "../services/useFetch";
import Spinner from "../components//Spinner";

export default function Detail() {
  const { dispatch } = React.useContext(CartContext);
  const [sku, setSku] = React.useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, error, loading } = useFetch("products/" + id);

  if (loading) return <Spinner />;
  if (!product) return <PageNotFound />;
  if (error) throw error;

  return (
    <div id="detail">
      <div className="detail-column">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p id="price">${product.price}</p>
        <select id="size" value={sku} onChange={(e) => setSku(e.target.value)}>
          <option value="">Size</option>
          {product.skus.map((s) => (
            <option key={s.sku} value={s.sku}>
              {s.size}
            </option>
          ))}
        </select>
        <p>
          <button
            className="btn btn-primary"
            onClick={() => {
              dispatch({ type: "add-to-cart", id, sku });
              navigate("/cart");
            }}
            disabled={!sku}
          >
            Add to Cart
          </button>
        </p>
      </div>
      <div className="detail-column">
        <img src={`/images/${product.image}`} alt={product.category} />
      </div>
    </div>
  );
}
