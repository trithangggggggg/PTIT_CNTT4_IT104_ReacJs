import React from "react";
import { Link } from "react-router-dom";

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
};

export default function ProductList() {
  const products: Product[] = [
    { id: 1, name: "iPhone 10", price: 12000, description: "expensive" },
    { id: 2, name: "iPhone 12", price: 13000, description: "cheap" },
    { id: 3, name: "iPhone 11", price: 14000, description: "expensive" },
    { id: 4, name: "iPhone 13", price: 15000, description: "expensive" },
    { id: 5, name: "iPhone 14", price: 16000, description: "cheap" },
  ];

  return (
    <div>
      <h1 className="text-center font-bold">Danh sách sản phẩm</h1>
      <ul>
        {products.map((p) => (
          <li
            className="border w-[250px] text-center mb-3"
            key={p.id}
          >
            <h3>{p.name}</h3>
            <p>Giá: {p.price} đ</p>
            <p>{p.description}</p>
            <Link to={`/productlist/${p.id}`}>Xem chi tiết</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
