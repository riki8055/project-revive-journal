export default function StepEducation({ data, dispatch }) {
  function handleChange(e) {
    dispatch({
      type: "UPDATE_FIELD",
      section: "education",
      field: e.target.name,
      value: e.target.value,
    });
  }

  return (
    <>
      <input
        type="text"
        name="degree"
        value={data.degree}
        onChange={handleChange}
        placeholder="Degree"
      />

      <input
        type="text"
        name="university"
        value={data.university}
        onChange={handleChange}
        placeholder="University"
      />

      <input
        type="text"
        name="year"
        value={data.year}
        onChange={handleChange}
        placeholder="Year"
      />
    </>
  );
}
