import { dom } from "./dom.js";
import { fetchPhones } from "./store.js";

dom.form.addEventListener("submit", async (e) => {
  e.preventDefault();

  clearFormError();

  const searchValue = dom.searchField.value;

  if (!searchValue.trim()) {
    dom.searchField.classList.add("invalid");
    dom.searchFieldError.textContent = "Please enter a brand name";
    return;
  }

  const data = await fetchPhones(searchValue);

  console.log(data.isValid);
});

function clearFormError() {
  dom.searchField.classList.remove("invalid");
  dom.searchFieldError.textContent = "";
}
