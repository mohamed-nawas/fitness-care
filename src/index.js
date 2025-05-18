import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ErrorBoundary from "./others/ErrorBoundary";
import { HashRouter } from "react-router-dom";
import { CartProvider } from "./others/Context";

ReactDOM.render(
  <ErrorBoundary>
    {/* <BrowserRouter> */}
    <HashRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </HashRouter>
    {/* </BrowserRouter> */}
  </ErrorBoundary>,
  document.getElementById("root")
);
