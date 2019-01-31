module.exports = function(fastn, app) {
  return fastn(
    "div",
    { class: "logout-button" },
    fastn("button", { class: "button" }, fastn("span", { class: "title" }, "Logout")).on(
      "click",
      event => {
        event.preventDefault();
        app.logout();
      }
    )
  );
};
