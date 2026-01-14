import { dom } from "./dom.js";

dom.form.addEventListener("submit", (e) => {
  e.preventDefault();

  clearFormError();

  const searchValue = dom.searchField.value;

  if (!searchValue.trim()) {
    dom.searchField.classList.add("invalid");
    dom.searchFieldError.textContent = "Please enter a brand name";
    return;
  }

  console.log(searchValue);
});

function clearFormError() {
  dom.searchField.classList.remove("invalid");
  dom.searchFieldError.textContent = "";
}
