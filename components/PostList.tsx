import Link from "next/link";
import { posts } from "@/lib/posts";

export default function PostList() {
  return (
    <section>
      <h2 style={{ marginBottom: "20px" }}>最新日志</h2>

      <div style={{ display: "grid", gap: "20px" }}>
        {posts.map((post) => (
          <article
            key={post.id}
            style={{
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "12px",
            }}
          >
            <p style={{ color: "#666", marginBottom: "8px" }}>{post.date}</p>

            <h3 style={{ marginBottom: "10px" }}>
              <Link
                href={`/posts/${post.slug}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                {post.title}
              </Link>
            </h3>

            <p>{post.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}