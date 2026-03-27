import { useRef } from "react";

export default function UncontrolledForm() {
  const nameRef = useRef();

  function handleSubmit() {
    console.log(nameRef.current.value);
  }

  return (
    <div>
      <input ref={nameRef} placeholder="Enter name" />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
