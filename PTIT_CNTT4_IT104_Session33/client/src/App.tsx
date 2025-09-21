import React from "react";
import "./App.css";
import ProductList from "./Components/ProductList";
import ShoppingCart from "./Components/ShoppingCart";

export default function App() {
  return (
    <div className="container">
      <div className="page-header">
        <h1>Shopping Cart</h1>
      </div>
      <div className="row">
        {/* Danh sach san pham */}
        <ProductList></ProductList>
        {/* Gio hang */}
        <ShoppingCart></ShoppingCart>
      </div>
    </div>
  );
}
