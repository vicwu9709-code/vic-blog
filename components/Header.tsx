export default function Header() {
  return (
    <header style={{ marginBottom: "30px" }}>
      <h1>Vic Blog</h1>
      <nav style={{ marginTop: "10px" }}>
        <a href="/" style={{ marginRight: "10px" }}>首页</a>
        <a href="/posts" style={{ marginRight: "10px" }}>日志</a>
        <a href="/about">关于</a>
      </nav>
    </header>
  );
}