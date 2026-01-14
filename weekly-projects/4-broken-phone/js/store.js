export const fetchPhones = async (searchValue) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const error = new Error();
      error.type = "danger";
      error.title = "Something's not right...";
      error.message =
        "We are trying our best to resolve the issue at earliest.";
      error.helperText = "If issue persists, kindly contact the developer";

      throw error;
    }

    const data = await response.json();

    if (!data.status) {
      const error = new Error();
      error.type = "warning";
      error.title = "We Couldn’t Find That Phone";
      error.message =
        "We couldn’t find any phones that match your search right now, but adjusting keywords or trying again may help.";
      error.helperText =
        "Please check the spelling or search online to confirm the correct phone name, then try again.";

      throw error;
    }

    return {
      isValid: true,
      data,
    };
  } catch (error) {
    return {
      isValid: false,
      error,
    };
  }
};

// module.exports = fetchPhones;
