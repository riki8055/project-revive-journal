import { useRef } from "react";
import { checkEmailExists } from "./fakeAPI";

export default function StepPersonal({ data, dispatch, errors }) {
  const requestIdRef = useRef(0);

  async function handleChange(e) {
    dispatch({
      type: "UPDATE_FIELD",
      section: "personal",
      field: e.target.name,
      value: e.target.value,
    });

    if (e.target.name === "email") {
      const requestId = ++requestIdRef.current;
      const exists = await checkEmailExists(e.target.value);

      if (requestId !== requestIdRef.current) {
        return;
      }

      if (exists) {
        dispatch({
          type: "SET_ERRORS",
          errors: { email: "Email already exists" },
        });
      }
    }
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
      {errors.firstName && <p>{errors.firstName}</p>}

      <input
        type="text"
        name="lastName"
        value={data.lastName}
        onChange={handleChange}
        placeholder="Last Name"
      />
      {errors.lastName && <p>{errors.lastName}</p>}

      <input
        type="email"
        name="email"
        value={data.email}
        onChange={handleChange}
        placeholder="Email"
      />
      {errors.email && <p>{errors.email}</p>}
    </>
  );
}
