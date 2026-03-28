import { useState } from "react";

export default function DataTable({ columns, data }) {
  const [sortConfig, setSortConfig] = useState(null);

  function handleSort(key) {
    setSortConfig((prev) => {
      if (prev && prev.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  }

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0;

    const { key, direction } = sortConfig;

    if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
    if (a[key] > b[key]) return direction === "asc" ? 1 : -1;

    return 0;
  });

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              onClick={() => handleSort(col.key)}
              style={{
                cursor: "pointer",
                borderBottom: "1px solid #ccc",
                padding: "10px",
                textAlign: "left",
              }}
            >
              {col.label}
              {sortConfig?.key === col.key
                ? sortConfig.direction === "asc"
                  ? " 🔼"
                  : " 🔽"
                : ""}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {sortedData.map((row, index) => (
          <tr key={index}>
            {columns.map((col) => (
              <td
                key={col.key}
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #eee",
                }}
              >
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
