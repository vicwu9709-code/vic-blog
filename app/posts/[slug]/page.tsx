import Link from "next/link";
import CommentSection from "@/components/CommentSection";
import LikeSection from "@/components/LikeSection";
import { posts } from "@/lib/posts";

type PageProps = {
  params: Promise<{ slug: string }>;
};
export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    return (
      <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
        <Link href="/" style={{ display: "inline-block", marginBottom: "20px" }}>
          ← 返回首页
        </Link>
        <h1>文章不存在</h1>
        <p>当前 slug: {slug}</p>
        <p>可用 slug: {posts.map((p) => p.slug).join(" / ")}</p>
      </main>
    );
  }

  return (
    <main
      style={{
        padding: "40px",
        fontFamily: "sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
        lineHeight: "1.8",
      }}
    >
      <Link
        href="/"
        style={{
          display: "inline-block",
          marginBottom: "24px",
          textDecoration: "none",
        }}
      >
        ← 返回首页
      </Link>

      <h1 style={{ marginBottom: "12px" }}>{post.title}</h1>
      <p style={{ color: "#666", marginBottom: "24px" }}>{post.date}</p>

      <div style={{ marginBottom: "40px" }}>
        <p>{post.content}</p>
      </div>

      <LikeSection postSlug={post.slug} />
      <CommentSection postSlug={post.slug} />
    </main>
  );
}