// js/validation.js

export function validateForm(values) {
  const errors = {};

  // Name validation
  if (!values.name || values.name.trim().length < 3) {
    errors.name = "Name must be at least 3 characters long";
  }

  // Email validation
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!isValidEmail(values.email)) {
    errors.email = "Email format is invalid";
  }

  // Password validation
  if (!values.password || values.password.length < 6) {
    errors.password = "Password must be at least 6 characters long";
  }

  // Confirm password
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };

  // -- helpers --

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
