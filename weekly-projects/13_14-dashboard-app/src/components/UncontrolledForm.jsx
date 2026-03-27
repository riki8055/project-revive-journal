import { useRef } from "react";

export default function UncontrolledForm() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  function handleSubmit() {
    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    console.log(formData);
  }

  return (
    <div>
      <h2>Uncontrolled Form</h2>

      <input ref={nameRef} placeholder="Name" defaultValue="Ritik" />
      <input ref={emailRef} placeholder="Email" />
      <input ref={passwordRef} placeholder="Password" />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
