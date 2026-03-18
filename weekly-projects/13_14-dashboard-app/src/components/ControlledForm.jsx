import { useState } from "react";

export default function ControlledForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    city: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div>
      <h2>Smart Form</h2>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />

      <input
        name="age"
        placeholder="Age"
        value={form.age}
        onChange={handleChange}
      />

      <input
        name="city"
        placeholder="City"
        value={form.city}
        onChange={handleChange}
      />

      <h3>Preview</h3>
      <pre>{JSON.stringify(form, null, 2)}</pre>
    </div>
  );
}
