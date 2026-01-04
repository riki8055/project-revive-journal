// js/dom.js

export const dom = {
  form: document.querySelector("form"),
  inputs: {
    name: document.querySelector("#name"),
    email: document.querySelector("#email"),
    password: document.querySelector("#password"),
    confirmPassword: document.querySelector("#confirmPassword"),
  },
  submitButton: document.querySelector("button[type='submit'"),
  errorContainer: null, // reserved for later
};

if (!dom.form) {
  throw new Error("Form element not found");
}
