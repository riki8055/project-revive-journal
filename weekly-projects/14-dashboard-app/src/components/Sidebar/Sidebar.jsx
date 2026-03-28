export default function Sidebar() {
  return (
    <div
      style={{
        width: "220px",
        background: "#111",
        color: "#fff",
        padding: "20px",
      }}
    >
      <h2>Dashboard</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li style={{ margin: "10px 0" }}>Overview</li>
        <li style={{ margin: "10px 0" }}>Users</li>
        <li style={{ margin: "10px 0" }}>Analytics</li>
      </ul>
    </div>
  );
}
