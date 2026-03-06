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

export function fakeSubmitAPI(formData) {
  return new Promise((resolve, reject) => {
    const delay = 1500 + Math.random() * 1500; // 1.5–3 seconds

    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate

      if (success) {
        resolve({
          status: "success",
          message: "Application submitted",
          data: formData,
        });
      } else {
        reject({
          status: "error",
          message: "Server error. Please try again.",
        });
      }
    }, delay);
  });
}
