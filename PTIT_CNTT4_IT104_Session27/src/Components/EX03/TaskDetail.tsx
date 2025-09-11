import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const tasks = [
  { id: 1, title: "Python", description: "Học Python" },
  { id: 2, title: "React", description: "Học React" },
  { id: 3, title: "TypeScript", description: "Học Typescript" },
];

export default function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const task = tasks.find((t) => t.id === Number(id));

  if (!task) {
    return <h2>Không tìm thấy công việc!</h2>;
  }

  return (
    <div>
      <h2>Chi tiết công việc</h2>
      <h3>{task.title}</h3>
      <p>{task.description}</p>

      <button onClick={() => navigate(-1)}>Quay lại</button>
    </div>
  );
}
