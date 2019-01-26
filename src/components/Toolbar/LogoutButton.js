module.exports = function(fastn, app) {
  return fastn(
    "div",
    { class: "logout-button" },
    fastn(
      "button",
      {
        class: "button",
        hidden: fastn
          .binding("login.token", token => token === null || token === "")
          .attach(app.state)
      },
      fastn("span", { class: "title" }, "Logout")
    ).on("click", event => {
      event.preventDefault();
      app.logout();
    })
  );
};
