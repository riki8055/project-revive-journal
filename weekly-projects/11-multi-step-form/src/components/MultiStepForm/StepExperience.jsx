export default function StepExperience({ data, dispatch }) {
  function handleChange(e) {
    dispatch({
      type: "UPDATE_FIELD",
      section: "experience",
      field: e.target.name,
      value: e.target.value,
    });
  }

  return (
    <>
      <input
        type="text"
        name="company"
        value={data.company}
        onChange={handleChange}
        placeholder="Company"
      />

      <input
        type="text"
        name="role"
        value={data.role}
        onChange={handleChange}
        placeholder="Role"
      />

      <input
        type="text"
        name="years"
        value={data.years}
        onChange={handleChange}
        placeholder="Experience"
      />
    </>
  );
}
