import { dom } from "./dom.js";
import { fetchPhones } from "./store.js";
import { manageFeedbacks } from "./manageFeedbacks.js";

dom.form.addEventListener("submit", async (e) => {
  e.preventDefault();

  clearFormError();

  const searchValue = dom.searchField.value;

  if (!searchValue.trim()) {
    dom.searchField.classList.add("invalid");
    dom.searchFieldError.textContent = "Please enter a brand name";
    return;
  }

  dom.displays.initialMessage.classList.add("d-none");
  dom.sections.displaySearch.classList.add("d-none");
  dom.sections.loader.classList.remove("d-none");

  const data = await fetchPhones(searchValue);

  manageFeedbacks(data);
});

function clearFormError() {
  dom.searchField.classList.remove("invalid");
  dom.searchFieldError.textContent = "";
}
