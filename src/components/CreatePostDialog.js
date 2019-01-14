const Button = require("./Button");

module.exports = function createPostDialog(fastn, app) {
  var titleInput = fastn("input", {
    class: "create-post-title",
    placeholder: "Post Title",
    required: true,
    value: fastn.binding("post.title"),
    onchange: "value:value"
  });

  var bodyInput = fastn("textarea", {
    class: "create-post-body",
    placeholder: "Post Body",
    required: true,
    value: fastn.binding("post.body"),
    onchange: "value:value"
  }).on("keypress", (event, scope) => {
    if (event.ctrlKey && event.keyCode === 10) {
      var action = scope.get("action");
      if (action === "create") {
        app.createPost(event, scope);
      }
      if (action === "update") {
        app.updatePost(event, scope);
      }
    }
  });

  var arrow = fastn("span", { class: "icon" }, "☵");

  var createButton = Button(fastn, app, "Create", arrow, ["create-post-createbutton"]).on("click", function(
    event,
    scope
  ) {
    var action = scope.get("action");
    if (action === "create") {
      app.createPost(event, scope, app);
    }
    if (action === "update") {
      app.updatePost(event, scope, app);
    }
  });

  var cancelButton = Button(fastn, app, "Cancel", arrow, ["create-post-cancelbutton"]).on("click", app.hideCreatePost);

  var buttons = fastn("div", { class: "create-post-button-container" }, createButton, cancelButton);

  return fastn(
    "div",
    { display: fastn.binding("dialogOpen"), class: "create-post-dialog" },
    fastn("div", { class: "create-post-dialog-content" }, titleInput, bodyInput, buttons)
  );
};
