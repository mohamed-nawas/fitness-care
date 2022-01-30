import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ErrorBoundary from "./others/ErrorBoundary";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./others/Context";

ReactDOM.render(
  <ErrorBoundary>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </ErrorBoundary>,
  document.getElementById("root")
);
