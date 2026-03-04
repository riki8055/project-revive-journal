export function checkEmailExists(email) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const takenEmails = ["test@gmail.com", "admin@gmail.com"];
      resolve(takenEmails.includes(email));
    }, 1000);
  });
}

export function saveDraftToServer(draft) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Draft saved to server:", draft);
      resolve();
    }, 2000);
  });
}
