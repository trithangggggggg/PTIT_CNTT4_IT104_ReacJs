import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const posts = [
  {
    id: 1,
    title: "Học React tại Rikkei",
    content:
      "Khóa học React",
  },
  {
    id: 2,
    title: "Học Python tại Rikkei",
    content:
      "Python rat kho ",
  },
  {
    id: 3,
    title: "Học Frontend tại Rikkei",
    content:
      "Frontendn rat hay ",
  },
  {
    id: 4,
    title: "Học C# tại Rikkei",
    content:
      "C# ko hay lam ",
  },
  {
    id: 5,
    title: "Học Java tại Rikkei",
    content:
      "Java rat hay ",
  },
];

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = posts.find((p) => p.id === Number(id));

  if (!post) {
    return <h2>Bài viết không tồn tại</h2>;
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <button onClick={() => navigate(-1)} style={{ marginTop: 20 }}>
        Quay lại danh sách
      </button>
    </div>
  );
}
