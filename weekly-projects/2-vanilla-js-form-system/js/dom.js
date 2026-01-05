// js/dom.js

export const dom = {
  form: document.querySelector("form"),
  inputs: {
    name: document.querySelector("#name"),
    email: document.querySelector("#email"),
    password: document.querySelector("#password"),
    confirmPassword: document.querySelector("#confirmPassword"),
  },
  errors: {
    name: document.querySelector("#name + .error"),
    email: document.querySelector("#email + .error"),
    password: document.querySelector("#password + .error"),
    confirmPassword: document.querySelector("#confirmPassword + .error"),
  },
  submitButton: document.querySelector("button[type='submit'"),
  errorContainer: null, // reserved for later
};

if (!dom.form) {
  throw new Error("Form element not found");
}
