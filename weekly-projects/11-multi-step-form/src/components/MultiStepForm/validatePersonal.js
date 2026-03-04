export function validatePersonal(data) {
  const errors = {};

  if (!data.firstName.trim()) {
    errors.firstName = "First name is required";
  }

  if (!data.lastName.trim()) {
    errors.lastName = "Last name is required";
  }

  if (!data.email.includes("@")) {
    errors.email = "Invalid email";
  }

  return errors;
}
