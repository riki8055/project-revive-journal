export default function StepPersonal({ data, dispatch }) {
  function handleChange(e) {
    dispatch({
      type: "UPDATE_FIELD",
      section: "personal",
      field: e.target.name,
      value: e.target.value,
    });
  }

  return (
    <>
      <input
        type="text"
        name="firstName"
        value={data.firstName}
        onChange={handleChange}
        placeholder="First Name"
      />

      <input
        type="text"
        name="lastName"
        value={data.lastName}
        onChange={handleChange}
        placeholder="Last Name"
      />

      <input
        type="email"
        name="email"
        value={data.email}
        onChange={handleChange}
        placeholder="Email"
      />
    </>
  );
}
