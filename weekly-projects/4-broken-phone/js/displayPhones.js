import { dom } from "./dom.js";

export function displayPhones(data) {
  const displayMsg = document.createElement("h5");
  displayMsg.classList.add("alert", "alert-success", "mb-4");
  displayMsg.setAttribute("role", "alert");
  displayMsg.innerHTML = `Showing results for <b>${dom.searchField.value}</b>`;
  dom.sections.displaySearch.prepend(displayMsg);

  data.data.data.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("card");
    phoneDiv.innerHTML = `
    <img
        src="${phone.image}"
        class="card-img-top"
        alt="${phone.phone_name}"
    />
    <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
        <p class="card-text">
        Some quick example text to build on the card title and make up
        the bulk of the card’s content.
        </p>
        <a href="#" class="btn btn-primary">View Details</a>
    </div>
  `;
    dom.displays.phonesContainer.appendChild(phoneDiv);
  });
}
