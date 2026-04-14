"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

function getClientId() {
  const key = "vic_blog_client_id";
  let clientId = localStorage.getItem(key);

  if (!clientId) {
    clientId = crypto.randomUUID();
    localStorage.setItem(key, clientId);
  }

  return clientId;
}

export default function LikeSection({ postSlug }: { postSlug: string }) {
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  async function fetchLikes() {
    const clientId = getClientId();

    const { count, error: countError } = await supabase
      .from("likes")
      .select("*", { count: "exact", head: true })
      .eq("post_slug", postSlug);

    if (countError) {
      console.error("获取点赞数失败:", countError.message);
      return;
    }

    setLikeCount(count ?? 0);

    const { data, error } = await supabase
      .from("likes")
      .select("id")
      .eq("post_slug", postSlug)
      .eq("client_id", clientId)
      .maybeSingle();

    if (error) {
      console.error("获取点赞状态失败:", error.message);
      return;
    }

    setLiked(!!data);
  }

  useEffect(() => {
    fetchLikes();
  }, [postSlug]);

  async function handleLike() {
    if (liked || loading) return;

    setLoading(true);

    const clientId = getClientId();

    const { error } = await supabase.from("likes").insert([
      {
        post_slug: postSlug,
        client_id: clientId,
      },
    ]);

    setLoading(false);

    if (error) {
      console.error("点赞失败:", error.message);
      alert("点赞失败");
      return;
    }

    setLiked(true);
    fetchLikes();
  }

  return (
    <section
      style={{
        borderTop: "1px solid #ddd",
        paddingTop: "24px",
        marginTop: "24px",
        marginBottom: "40px",
      }}
    >
      <h2 style={{ marginBottom: "12px" }}>点赞</h2>
      <button
        onClick={handleLike}
        disabled={liked || loading}
        style={{
          padding: "10px 18px",
          borderRadius: "8px",
          border: "1px solid #ccc",
         background: liked ? "#ff8c00" : "#ffa500",
          cursor: liked ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {liked ? `✅ 已点赞（${likeCount}）` : `👍 点赞（${likeCount}）`}
      </button>
    </section>
  );
}