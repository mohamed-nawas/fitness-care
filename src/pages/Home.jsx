import React from "react";
import useFetch from "../services/useFetch";
import Spinner from "../components/Spinner";
import PageNotFound from "./PageNotFound";
import { Link } from "react-router-dom";

export default function Home() {
  const [category, setCategory] = React.useState("");

  const { data: products, error, loading } = useFetch("products");

  const filteredProducts = category
    ? products.filter((p) => p.category === category)
    : products;

  if (error) throw error;
  if (loading) return <Spinner />;
  if (products.length === 0) return <PageNotFound />;

  const array = products.map((p) => {
    return p.category;
  });

  const prodCat = [...new Set(array)];

  return (
    <>
      <section id="filters">
        <label htmlFor="size">Filter by Category:</label>{" "}
        <select
          id="size"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          <option value="">Select category</option>
          {prodCat.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </section>
      {category && <h2>{filteredProducts.length} items found</h2>}
      <section id="products">
        {filteredProducts.map((p) => (
          <div key={p.id} className="product">
            <Link to={`/${p.category}/${p.id}`}>
              {/* <img src={`/images/${p.image}`} alt={p.name} /> */}
              {/* <img src={`${process.env.PUBLIC_URL}/images/${p.image}`} alt={p.name} /> */}
              <img src={`/fitness-care/images/${p.image}`} alt={p.name} />
              <h3>{p.name}</h3>
              <p>${p.price}</p>
            </Link>
          </div>
        ))}
      </section>
    </>
  );
}
