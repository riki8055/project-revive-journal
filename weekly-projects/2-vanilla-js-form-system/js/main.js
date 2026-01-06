// js/main.js

import { dom } from "./dom.js";
import { validateForm } from "./validation.js";
import { showErrors, clearErrors } from "./errors.js";

dom.form.addEventListener("submit", async (event) => {
  event.preventDefault(); // we take control now

  clearErrors();

  const formValues = serializeManually();
  const result = validateForm(formValues);

  if (!result.isValid) {
    showErrors(result.errors);
    return;
  }

  dom.submitButton.disabled = true;

  try {
    const response = await submitForm(formValues);
    if (!response.ok) {
      throw new Error(`Oops! Something went wrong (${response.status})`);
    }

    console.log(response);
  } catch (error) {
    console.error(error);
  } finally {
    dom.submitButton.disabled = false;
  }
});

async function submitForm(data) {
  return fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
}

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

// Handle Server Errors (helper Fn)
// async function handleServerError(response) {
//   if (response.status === 422) {
//     const data = await response.json();
//     showErrors(data.errors);
//     return;
//   }

//   if (response.status === 401) {
//     alert("Unauthorized. Please log in.");
//     return;
//   }

//   alert("Something went wrong. Try again later.");
// }
