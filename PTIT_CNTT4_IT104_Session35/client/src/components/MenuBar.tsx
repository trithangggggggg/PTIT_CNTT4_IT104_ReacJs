import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../store/slices/menuSlice";
import {
  DashboardOutlined,
  UserOutlined,
  DollarOutlined,
  BarChartOutlined,
  FileTextOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";

export default function MenuBar() {
  const isOpen = useSelector((data: any) => data.menu.isOpen);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleMenu());
  };

  const menuItems = [
    { key: 1, icon: <DashboardOutlined />, label: "Bảng điều khiển" },
    { key: 2, icon: <UserOutlined />, label: "Tài khoản" },
    { key: 3, icon: <DollarOutlined />, label: "Tài sản" },
    { key: 4, icon: <BarChartOutlined />, label: "Thống kê" },
    { key: 5, icon: <FileTextOutlined />, label: "Tài liệu" },
  ];

  return (
    <div
      style={{
        width: isOpen ? "200px" : "60px",
        backgroundColor: "#001529",
        color: "#fff",
        minHeight: "40vh",
        transition: "width 0.3s",
        display: "flex",
        flexDirection: "column",
        paddingTop: "20px",
      }}
    >
      {menuItems.map((item) => (
        <div
          key={item.key}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          {item.icon}
          {isOpen && <span>{item.label}</span>}
        </div>
      ))}

      <div
        onClick={handleToggle}
        style={{
          padding: "10px 20px",
          cursor: "pointer",
          borderTop: "1px solid #444",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {isOpen ? <LeftOutlined /> : <RightOutlined />}
        {isOpen && <span>Thu gọn</span>}
      </div>
    </div> 
  );
}
