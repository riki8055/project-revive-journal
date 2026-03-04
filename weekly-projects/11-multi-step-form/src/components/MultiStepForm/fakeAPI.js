export function checkEmailExists(email) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const takenEmails = ["test@gmail.com", "admin@gmail.com"];
      resolve(takenEmails.includes(email));
    }, 1000);
  });
}
