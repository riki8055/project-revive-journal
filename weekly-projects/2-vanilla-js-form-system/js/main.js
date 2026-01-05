// js/main.js

import { dom } from "./dom.js";
import { validateForm } from "./validation.js";
import { showErrors, clearErrors } from "./errors.js";

dom.form.addEventListener("submit", (event) => {
  event.preventDefault(); // we take control now

  clearErrors();

  const formValues = serializeManually();
  console.log("Serialized data: ", formValues);

  const result = validateForm(formValues);

  if (!result.isValid) {
    showErrors(result.errors);
    return;
  }

  console.log("Form is valid. Ready to submit.");
});

function serializeManually() {
  return {
    name: dom.inputs.name.value,
    email: dom.inputs.email.value,
    password: dom.inputs.password.value,
    confirmPassword: dom.inputs.confirmPassword.value,
  };
}

// // Form serialization with FormData() (Browser-Native)
// function serializeWithFormData() {
//   const formData = new FormData(dom.form);
//   const data = {};

//   for (const [key, value] of formData.entries()) {
//     data[key] = value;
//   }

//   return data;
// }
