import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "iPhone 11",
    price: 12000,
    description: "Siêu rẻ siêu chất lượng",
  },
  {
    id: 2,
    name: "iPhone 12",
    price: 15000,
    description: "Siêu rẻ siêu chất lượng",
  },
  {
    id: 3,
    name: "iPhone 13",
    price: 18000,
    description: "Siêu rẻ siêu chất lượng",
  },
  {
    id: 4,
    name: "iPhone 14",
    price: 20000,
    description: "Siêu rẻ siêu chất lượng",
  },
  {
    id: 5,
    name: "iPhone 15",
    price: 25000,
    description: "Siêu rẻ siêu chất lượng",
  },
];

export default function ProductList() {
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const searchValue = searchParams.get("search") || "";
    setKeyword(searchValue);
  }, [searchParams]);

  const handleSearch = () => {
    if (keyword.trim()) {
      setSearchParams({ search: keyword.trim() });
    } else {
      setSearchParams({});
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>
      <h2 className="font-semibold">Danh sách sản phẩm</h2>

      <div className="p-4">
        <input
          type="text"
          placeholder="Nhập từ khóa..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border mr-2"
        />
        <button className="border bg-blue-600 text-white w-[60px] rounded" onClick={handleSearch}>Search</button>
      </div>

      <ul>
        {filteredProducts.map((p) => (
          <li key={p.id} className="mb-4 border w-[350px] h-[60px] text-center">
            <b>{p.name}</b> - {p.price.toLocaleString()} VND
            <br />
            <i>{p.description}</i>
          </li>
        ))}
      </ul>
    </div>
  );
}
