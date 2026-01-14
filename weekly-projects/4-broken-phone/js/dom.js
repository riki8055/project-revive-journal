export const dom = {
  form: document.querySelector("form"),
  searchField: document.getElementById("search-field"),
  searchFieldError: document.querySelector("#search-field + .error"),
  searchBtn: document.getElementById("btn-search"),
  sections: {
    loader: document.getElementById("loader"),
    displaySearch: document.getElementById("display-search-results"),
    loadMore: document.getElementById("load-more"),
  },
  displays: {
    initialMessage: document.getElementById("initial-message"),
    phonesContainer: document.getElementById("phones-container"),
    searchErrors: document.getElementById("search-errors"),
  },
  searchErrors: document.getElementById("search-errors"), // Section
  btnLoadMore: document.getElementById("btn-load-more"),
  searchAlert: {
    alertType: document.querySelector(".alert"),
    alertTitle: document.querySelector(".alert-heading"),
    alertMessage: document.querySelector(".alert-text"),
    alertHelperText: document.querySelector(".alert-helper-text"),
  },
};
