import React from "react";
import useFetch from "../services/useFetch";
import Spinner from "../components/Spinner";
import PageNotFound from "./PageNotFound";
import { useParams, Link } from "react-router-dom";

export default function Products() {
  const [size, setSize] = React.useState("");
  const { category } = useParams();

  const {
    data: products,
    error,
    loading,
  } = useFetch("products?category=" + category);

  const filteredProducts = size
    ? products.filter((p) => p.skus.find((s) => s.size === parseInt(size)))
    : products;

  if (error) throw error;
  if (loading) return <Spinner />;
  if (products.length === 0) return <PageNotFound />;

  return (
    <>
      <section id="filters">
        <label htmlFor="size">Filter by Size:</label>{" "}
        <select
          id="size"
          value={size}
          onChange={(e) => {
            // debugger;
            setSize(e.target.value);
          }}
        >
          <option value="">All sizes</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
      </section>
      {size && <h2>{filteredProducts.length} items found</h2>}
      <section id="products">
        {filteredProducts.map((p) => (
          <div key={p.id} className="product">
            <Link to={`/${category}/${p.id}`}>
              {/* <img src={`/images/${p.image}`} alt={p.name} /> */}
              <img src={`${process.env.PUBLIC_URL}/images/${p.image}`} alt={p.name} />
              <h3>{p.name}</h3>
              <p>${p.price}</p>
            </Link>
          </div>
        ))}
      </section>
    </>
  );
}
