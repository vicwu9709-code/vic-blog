import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PostList from "@/components/PostList";

export default function Home() {
  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <Header />
      <Hero />
      <PostList />
    </main>
  );
}