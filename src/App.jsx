import React from "react";
import "./styles/App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Products from "./pages/Products";
import { Routes, Route } from "react-router-dom";
import Detail from "./pages/Detail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { ShippingAddressProvider } from "./others/Context";
import Home from "./pages/Home";

export default function App() {
  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <h1>Welcome to Fitness Care</h1>
                  <Home />
                </>
              }
            />
            <Route path="/:category" element={<Products />} />
            <Route path="/:category/:id" element={<Detail />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/checkout"
              element={
                <ShippingAddressProvider>
                  <Checkout />
                </ShippingAddressProvider>
              }
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
