import React, { useState } from "react";
import bread from "../images/bread.jpg";
import pizza from "../images/pizza.jpg";
import hamburger from "../images/Hamburger.jpg";
import cake from "../images/Cake.jpg";
import type { Products } from "../interface/interface";
import { useDispatch } from "react-redux";

const data = [
  { id: 1, title: "pizza", image: pizza, content: "Pizza", price: 20, quantity: 1 },
  { id: 2, title: "Hamburger", image: hamburger, content: "Hamburger", price: 15, quantity: 1 },
  { id: 3, title: "bread", image: bread, content: "Bread", price: 10, quantity: 1 },
  { id: 4, title: "cake", image: cake, content: "Cake", price: 25, quantity: 1 },
];

export default function ProductList() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<Products[]>(data);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantity: newQuantity > 0 ? newQuantity : 1 } : p
      )
    );
  };

  const handleAdd = (item: Products) => {
    dispatch({ type: "addtocart", payload: item });
    dispatch({ type: "notiAdd" });
  };

  return (
    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h1 className="panel-title">List Products</h1>
        </div>
        <div className="panel-body" id="list-product">
          {products.map((item: Products) => (
            <div className="media product" key={item.id}>
              <div className="media-left">
                <img className="media-object" src={item.image} alt={item.title} width={80} />
              </div>
              <div className="media-body">
                <h4 className="media-heading">{item.title}</h4>
                <p>{item.content}</p>
                <input
                  type="number"
                  value={item.quantity}
                  min={1}
                  onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                />
                <a className="price">{item.price * item.quantity} $</a>
                <button
                  onClick={() => handleAdd(item)}
                  className="btn btn-success btn-sm"
                  style={{ marginLeft: "10px" }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
