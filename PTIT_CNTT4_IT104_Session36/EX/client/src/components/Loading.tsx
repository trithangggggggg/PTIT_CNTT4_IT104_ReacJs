import React, { useEffect, useState } from "react";
import "./Loading.css";

const Loading: React.FC = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2000); // dừng sau 2s
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null; // sau 2s thì ẩn hẳn component

  return (
    <div className="loading-container">
      <div className="spinner" />
      <p>Đang tải dữ liệu...</p>
    </div>
  );
};

export default Loading;
