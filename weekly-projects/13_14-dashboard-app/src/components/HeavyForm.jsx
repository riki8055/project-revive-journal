import { useState } from "react";

export default function HeavyForm() {
  const [form, setForm] = useState(
    Array.from({ length: 50 }, (_, i) => `field-${i}`).reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {}),
  );

  console.log("🔥 FULL FORM RE-RENDER");

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div>
      <h2>Heavy Form (50 Inputs)</h2>

      {Object.keys(form).map((key) => (
        <input
          key={key}
          name={key}
          value={form[key]}
          onChange={handleChange}
          placeholder={key}
        />
      ))}
    </div>
  );
}
