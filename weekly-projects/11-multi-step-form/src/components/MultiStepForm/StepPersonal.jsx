export default function StepPersonal({ data, dispatch, errors }) {
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
      <div>
        <input
          type="text"
          name="firstName"
          value={data.firstName}
          onChange={handleChange}
          placeholder="First Name"
        />
        {errors.firstName && <p>{errors.firstName}</p>}
      </div>

      <div>
        <input
          type="text"
          name="lastName"
          value={data.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />
        {errors.lastName && <p>{errors.lastName}</p>}
      </div>

      <div>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {errors.email && <p>{errors.email}</p>}
      </div>
    </>
  );
}
