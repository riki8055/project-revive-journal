// js/main.js

import { dom } from "./dom.js";
import { validateForm } from "./validation.js";

dom.form.addEventListener("submit", (event) => {
  event.preventDefault(); // we take control now

  const formValues = getFormValues();

  const result = validateForm(formValues);

  console.log("Validation result: ", result);

  if (!result.isValid) {
    // Step 4 will render errors
    return;
  }

  console.log("Form is valid. Ready to submit.");
});

function getFormValues() {
  return {
    name: dom.inputs.name.value,
    email: dom.inputs.email.value,
    password: dom.inputs.password.value,
    confirmPassword: dom.inputs.confirmPassword.value,
  };
}
