import { useEffect, useState } from "react";

type Product = {
  id: number;
  product_name: string;
  image: string;
  quantity: number;
  created_at: string;
  price: number;
};

export default function GetAllProduct() {
  const [array, setArray] = useState<Product[]>([]);

  async function getAllProduct() {
    try {
      const response = await fetch("http://localhost:8080/product");
      if (!response.ok) {
        throw new Error("Khong the ket noi API");
      }
      const result: Product[] = await response.json();
      setArray(result);
    } catch (error) {
      console.error("Loi:", error);
    }
  }

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <div>
      <h1>Danh sach san pham</h1>
      {array.map((item) => (
        <div key={item.id}>
          <p>Ten: {item.product_name}</p>
          <p>Gia: {item.price} VND</p>
          <p>So luong: {item.quantity}</p>
          <p>Ngay them: {item.created_at}</p>
          <img src={item.image} alt={item.product_name} width={120}/>
          <hr />
        </div>
      ))}
    </div>
  );
}
