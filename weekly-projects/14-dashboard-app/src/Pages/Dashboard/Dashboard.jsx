import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";

export default function Dashboard() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Header />
        <h1>Dashboard Content</h1>
      </div>
    </div>
  );
}
