const StarField = require("./StarField");
const Button = require("./Button");

module.exports = function createLoginForm(fastn, app) {
  function renderForm() {
    var usernameInput = fastn("input", {
      class: "username-input",
      autofocus: true,
      required: true,
      placeholder: "Username",
      disabled: fastn.binding("isLoading").attach(app.state),
      value: fastn.binding("username"),
      oninput: "value:value"
    });
    var passwordInput = fastn("input", {
      class: "password-input",
      type: "password",
      required: true,
      placeholder: "Password",
      disabled: fastn.binding("isLoading").attach(app.state),
      value: fastn.binding("password"),
      oninput: "value:value"
    });

    var submitButton = Button(fastn, app, "Login", null, "login-button").on("click", event => {
      event.preventDefault();
      app.login();
    });

    var formContent = fastn(
      "form",
      {
        class: fastn
          .binding("isLoading", isLoading => {
            return ["login-form-content", isLoading && "loading"];
          })
          .attach(app.state)
      },
      usernameInput,
      passwordInput,
      submitButton
    );

    return fastn(
      "div",
      {
        class: "login-form",
        hidden: fastn.binding("token", token => {
          return token && token.length > 1;
        })
      },
      StarField(fastn, app),
      formContent
    );
  }

  return fastn("templater", {
    data: fastn.binding("login"),
    template: model => {
      var token = model.get("item.token");

      if (token) {
        return;
      }

      if (!model.get("item")) {
        return;
      }

      return renderForm().binding("item");
    }
  });
};
