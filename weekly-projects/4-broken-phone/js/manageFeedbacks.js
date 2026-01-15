import { dom } from "./dom.js";

export function manageFeedbacks(data) {
  dom.sections.loader.classList.add("d-none");
  dom.sections.displaySearch.classList.remove("d-none");

  if (!data.isValid) {
    dom.searchErrors.classList.remove("d-none");
    dom.searchErrors.classList.add("d-flex");
    dom.displays.phonesContainer.classList.add("d-none");
    dom.sections.loadMore.classList.add("d-none");

    if (data.error.type === "warning") {
      if (dom.searchAlert.alertType.classList.contains("alert-danger")) {
        dom.searchAlert.alertType.classList.remove("alert-danger");
      }
      dom.searchAlert.alertType.classList.add("alert-warning");
      dom.searchAlert.alertTitle.textContent = data.error.title;
      dom.searchAlert.alertMessage.textContent = data.error.message;
      dom.searchAlert.alertHelperText.textContent = data.error.helperText;
    } else if (data.error.type === "danger") {
      if (dom.searchAlert.alertType.classList.contains("alert-warning")) {
        dom.searchAlert.alertType.classList.remove("alert-warning");
      }

      dom.searchAlert.alertType.classList.add("alert-danger");
      dom.searchAlert.alertTitle.textContent = data.error.title;
      dom.searchAlert.alertMessage.textContent = data.error.message;
      dom.searchAlert.alertHelperText.textContent = data.error.helperText;
    } else {
      dom.searchAlert.alertType.classList.remove("alert-warning");
      dom.searchAlert.alertType.classList.remove("alert-danger");
    }
  } else {
    dom.searchErrors.classList.add("d-none");
    dom.searchErrors.classList.remove("d-flex");
    dom.displays.phonesContainer.classList.remove("d-none");
    dom.sections.loadMore.classList.remove("d-none");

    displayPhones(data);
  }
}
