import React from "react";
import { Link } from "react-router-dom";

const posts = [
  { id: 1, title: "Học React", excerpt: "Học Rikkei " },
  { id: 2, title: "Học Python", excerpt: "Học Rikkei " },
  { id: 3, title: "Học Frontend", excerpt: "Học Rikkei " },
  { id: 4, title: "Học C#", excerpt: "Học Rikkei " },
  { id: 5, title: "Học Java", excerpt: "Học Rikkei " },
];

export default function Posts() {
  return (
    <div>
      <h2>Danh sách bài viết</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id} style={{ marginBottom: 10 }}>
            <Link to={`/blog/posts/${post.id}`}>
              <b>{post.title}</b>
            </Link>
            <p>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
