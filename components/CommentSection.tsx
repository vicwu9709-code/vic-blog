"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Comment = {
  id: number;
  nickname: string;
  content: string;
  created_at: string;
};

export default function CommentSection({ postSlug }: { postSlug: string }) {
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchComments() {
    const { data, error } = await supabase
      .from("comments")
      .select("id, nickname, content, created_at")
      .eq("post_slug", postSlug)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("获取评论失败:", error.message);
      return;
    }

    setComments(data || []);
  }

  useEffect(() => {
    fetchComments();
  }, [postSlug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!nickname.trim() || !content.trim()) {
      alert("请填写昵称和评论内容");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("comments").insert([
      {
        post_slug: postSlug,
        nickname: nickname.trim(),
        content: content.trim(),
      },
    ]);

    setLoading(false);

    if (error) {
      console.error("评论提交失败:", error.message);
      alert("评论提交失败");
      return;
    }

    setNickname("");
    setContent("");
    fetchComments();
  }

  return (
    <section
      style={{
        borderTop: "1px solid #ddd",
        paddingTop: "24px",
        marginTop: "24px",
      }}
    >
      <h2 style={{ marginBottom: "12px" }}>评论</h2>

      <div style={{ display: "grid", gap: "16px", marginBottom: "24px" }}>
        {comments.length === 0 ? (
          <p>还没有评论，来留下第一条吧。</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              style={{
                padding: "16px",
                border: "1px solid #ddd",
                borderRadius: "12px",
              }}
            >
              <p style={{ marginBottom: "8px", fontWeight: "bold" }}>
                {comment.nickname}
              </p>
              <p style={{ marginBottom: "8px" }}>{comment.content}</p>
              <p style={{ fontSize: "12px", color: "#666" }}>
                {new Date(comment.created_at).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "12px" }}>
        <input
          type="text"
          placeholder="你的昵称"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "12px",
            border: "1px solid #ccc",
          }}
        />

        <textarea
          placeholder="写下你的评论..."
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "12px",
            border: "1px solid #ccc",
            resize: "vertical",
            fontFamily: "sans-serif",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "fit-content",
            padding: "10px 18px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            background: "black",
            color: "white",
            cursor: "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "提交中..." : "发布评论"}
        </button>
      </form>
    </section>
  );
}