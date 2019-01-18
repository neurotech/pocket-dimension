module.exports = function(fastn, app) {
  return fastn(
    "button",
    {
      hidden: fastn
        .binding("login.token", token => token === null || token === "")
        .attach(app.state)
    },
    "Logout"
  ).on("click", event => {
    event.preventDefault();
    app.logout();
  });
};
