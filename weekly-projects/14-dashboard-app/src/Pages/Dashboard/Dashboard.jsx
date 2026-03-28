import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import DataTable from "@/components/Table";

const columns = [
  { key: "user", label: "User" },
  { key: "revenue", label: "Revenue" },
  { key: "orders", label: "Orders" },
  { key: "status", label: "Status" },
];

const data = [
  { user: "Ritik", revenue: 5000, orders: 12, status: "Active" },
  { user: "Aman", revenue: 3000, orders: 8, status: "Inactive" },
  { user: "Neha", revenue: 7000, orders: 15, status: "Active" },
];

export default function Dashboard() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Header />
        <h2>Users</h2>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
