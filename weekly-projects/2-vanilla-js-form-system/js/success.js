import { dom } from "./dom.js";
import { clearErrors } from "./errors.js";

export function showSuccess(message) {
    clearErrors();

    dom.successMessage.textContent = message;
    dom.successMessage.hidden = false

    dom.form.reset();
    dom.submitButton.disabled = true;

    // allow resubmission after a short delay
    setTimeout(() => {
        dom.successMessage.hidden = true;
        dom.submitButton.disabled = false;
    }, 3000);
}