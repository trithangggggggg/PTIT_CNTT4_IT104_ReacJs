import React from "react";
import { Link, useParams } from "react-router-dom";

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
};

export default function ProductDetail() {
  const products: Product[] = [
    {
      id: 1,
      name: "iphone 10",
      price: 12000,
      description: "expensive",
    },
    {
      id: 2,
      name: "iphone 12",
      price: 12000,
      description: "cheap",
    },
    {
      id: 3,
      name: "iphone 11",
      price: 12000,
      description: "expensive",
    },
    {
      id: 4,
      name: "iphone 13",
      price: 12000,
      description: "expensive",
    },
    {
      id: 5,
      name: "iphone 14",
      price: 12000,
      description: "cheap",
    },
  ];

  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div>
        <h1>San pham khong ton tai</h1>
        <Link to="/productlist">Quay lai danh sach</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Trang chi tiet san pham</h1>
      <h2>{product?.name}</h2>
      <p>Gia: {product.price}</p>
      <p>Mo ta: {product.description}</p>
      
      <Link to={"/productlist"}>Quay lai</Link>
    </div>
  );
}
