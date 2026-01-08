export async function mockSubmitForm(data) {
  // Simulate network latency
  await delay(800);

  //   fake server-side validation
  if (data.email === "taken@example.com") {
    return mockResponse(422, {
      errors: {
        email: "Email already exists",
      },
    });
  }

  if (data.email === "unauthorized@example.com") {
    return mockResponse(401, {
      message: "Unauthorized",
    });
  }

  if (data.email === "crash@example.com") {
    return mockResponse(500, {
      message: "Internal Server Error",
    });
  }

  // success
  return mockResponse(200, {
    message: "User registered successfully"
  })
}

// helpers

function mockResponse(status, body) {
  return {
    ok: status >= 200 && status <= 300,
    status,
    json: async () => body,
  };
}

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
