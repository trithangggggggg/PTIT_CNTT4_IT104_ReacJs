import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { Products } from "../interface/interface";

export default function ShoppingCart() {
  const rersult = useSelector((data: any) => {
    return data.cart.cart;
  });

  const dispatch = useDispatch();

  const handleClickCong = (item: Products) => {
    dispatch({
      type: "increment",
      payload: item,
    });

    showNoti("Update cart successfully");
  };

  const handleClickTru = (item: Products) => {
    if (item.quantity && item.quantity > 1) {
      dispatch({
        type: "decrement",
        payload: item,
      });

      showNoti("Update cart successfully");
    }
  };

  const handleDelete = (item: Products) => {
    if (window.confirm(`Bạn có chắc muốn xóa ${item.title} khỏi giỏ hàng?`)) {
      dispatch({
        type: "removeFromCart",
        payload: item,
      });

      showNoti("Delete cart successfully");
    }
  };

  const showNoti = (msg: string) => {
    const noti = document.getElementById("mnotification");
    if (noti) {
      noti.innerText = msg;
      noti.classList.remove("hidden");
      setTimeout(() => {
        noti.classList.add("hidden");
      }, 2000);
    }
  };

  return (
    <div>
      <div>
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <div className="panel panel-danger">
            <div className="panel-heading">
              <h1 className="panel-title">Your Cart</h1>
            </div>
            <div className="panel-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody id="my-cart-body">
                  {rersult.map((item: Products, index: number) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.title}</td>
                        <td>{item.price * (item.quantity || 1)} USD</td>
                        <td>
                          <button
                            onClick={() => handleClickTru(item)}
                            className="btn btn-sm btn-warning"
                          >
                            -
                          </button>
                          <span style={{ margin: "0 10px" }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleClickCong(item)}
                            className="btn btn-sm btn-success"
                          >
                            +
                          </button>
                        </td>
                        <td>
                          <a
                            className="label label-info update-cart-item"
                            style={{ marginRight: "8px", cursor: "pointer" }}
                          >
                            Update
                          </a>
                          <a
                            className="label label-danger delete-cart-item"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDelete(item)}
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot id="my-cart-footer">
                  <tr>
                    <td colSpan={4}>
                      There are <b>{rersult.length}</b> items in your shopping
                      cart.
                    </td>
                    <td colSpan={2} className="total-price text-left">
                      {rersult.reduce((acc: number, item: Products) => {
                        return acc + item.price * (item.quantity || 1);
                      }, 0)}{" "}
                      USD
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div
            className="alert alert-success hidden"
            role="alert"
            id="mnotification"
          >
            Add to cart successfully
          </div>
        </div>
      </div>
    </div>
  );
}
