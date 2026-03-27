import { useRef } from "react";

export default function FeedbackForm() {
  console.log("FeedbackForm re-rendered");

  const nameRef = useRef();
  const messageRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      name: nameRef.current.value,
      message: messageRef.current.value,
    };

    console.log("Feedback:", data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Feedback (Uncontrolled)</h2>

      <input ref={nameRef} placeholder="Your Name" />

      <textarea ref={messageRef} placeholder="Your Feedback" />

      <button type="submit">Submit</button>
    </form>
  );
}
