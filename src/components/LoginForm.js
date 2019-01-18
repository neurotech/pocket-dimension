module.exports = function createLoginForm(fastn, app) {
  function renderForm() {
    var usernameInput = fastn("input", {
      class: "username-input",
      required: true,
      placeholder: "Username",
      value: fastn.binding("username"),
      oninput: "value:value"
    });
    var passwordInput = fastn("input", {
      class: "password-input",
      type: "password",
      required: true,
      placeholder: "Password",
      value: fastn.binding("password"),
      oninput: "value:value"
    });
    var submitButton = fastn("button", {}, "Login").on("click", event => {
      event.preventDefault();
      app.login();
    });
    return fastn(
      "form",
      {
        class: "login-form",
        hidden: fastn.binding("token", token => {
          return token && token.length > 1;
        })
      },
      usernameInput,
      passwordInput,
      submitButton
    );
  }

  return fastn("templater", {
    data: fastn.binding("login"),
    template: model => {
      var token = model.get("item.token");

      if (token) {
        return;
      }

      return renderForm().binding("item");
    }
  });
};
