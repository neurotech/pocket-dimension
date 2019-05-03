const TypeSwitcher = require("./TypeSwitcher");
const Button = require("./Button");
const laidout = require("laidout");

module.exports = function createPostDialog(fastn, app) {
  function renderModal() {
    var typeSwitcher = TypeSwitcher(fastn, app);

    var titleInput = fastn("input", {
      class: "create-post-title",
      placeholder: "Post Title",
      required: true,
      value: fastn.binding("title"),
      oninput: "value:value",
      disabled: fastn.binding("isLoading").attach(app.state)
    })
      .on("insert", function() {
        laidout(this.element, () => this.element.focus());
      })
      .on("keypress", (event, scope) => {
        if (event.ctrlKey && event.keyCode === 10) {
          event.preventDefault();
          app.savePost(scope.get("."));
        }
      });

    var bodyInput = fastn("textarea", {
      class: "create-post-body",
      rows: 16,
      placeholder: "Post Body",
      required: true,
      value: fastn.binding("body"),
      oninput: "value:value",
      disabled: fastn.binding("isLoading").attach(app.state)
    }).on("keypress", (event, scope) => {
      if (event.ctrlKey && event.keyCode === 10) {
        event.preventDefault();
        app.savePost(scope.get("."));
      }
    });

    var createButton = Button(
      fastn,
      app,
      fastn.binding("id", id => (id ? "Update" : "Create")),
      null,
      ["create-post-createbutton"]
    ).on("click", function(event, scope) {
      app.savePost(scope.get("."));
    });

    var cancelButton = Button(fastn, app, "Cancel", null, ["create-post-cancelbutton"]).on(
      "click",
      app.hideEditPost
    );

    var buttons = fastn(
      "div",
      { class: "create-post-button-container" },
      createButton,
      cancelButton
    );

    return fastn(
      "div",
      { class: "create-post-dialog" },
      fastn(
        "div",
        { class: "create-post-dialog-content" },
        typeSwitcher,
        titleInput,
        bodyInput,
        buttons
      )
    ).on("click", function(event) {
      if (event.target === this.element) {
        app.hideEditPost();
      }
    });
  }

  return fastn("templater", {
    data: fastn.binding("post"),
    template: model => {
      var post = model.get("item");

      if (!post) {
        return;
      }

      return renderModal().binding("item");
    }
  });
};
