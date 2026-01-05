import {dom} from "./dom.js"

export function showErrors(errors) {
    let firstInvalidInput = null;

    Object.keys(errors).forEach((field) => {
        dom.errors[field].textContent = errors[field]
        dom.inputs[field].classList.add("invalid")

        if(!firstInvalidInput) {
            firstInvalidInput = dom.inputs[field]
        }
    })

    if(firstInvalidInput) {
        firstInvalidInput.focus()
    }
}

export function clearErrors() {
    Object.keys(dom.errors).forEach((field) => {
        dom.errors[field].textContent = ""
        dom.inputs[field].classList.remove("invalid")
    })
}