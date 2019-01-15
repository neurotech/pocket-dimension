const Button = require("./Button");

module.exports = function createPostDialog(fastn, app) {
  var titleInput = fastn("input", {
    class: "create-post-title",
    placeholder: "Post Title",
    required: true,
    value: fastn.binding("title"),
    onchange: "value:value"
  });

  var bodyInput = fastn("textarea", {
    class: "create-post-body",
    placeholder: "Post Body",
    required: true,
    value: fastn.binding("body"),
    onchange: "value:value"
  }).on("keypress", (event, scope) => {
    if (event.ctrlKey && event.keyCode === 10) {
      event.preventDefault();
      app.savePost(scope);
    }
  });

  var arrow = fastn("span", { class: "icon" }, "☵");

  var createButton = Button(fastn, app, "Create", arrow, ["create-post-createbutton"]).on("click", function(
    event,
    scope
  ) {
    app.savePost(scope);
  });

  var cancelButton = Button(fastn, app, "Cancel", arrow, ["create-post-cancelbutton"]).on("click", app.hideCreatePost);

  var buttons = fastn("div", { class: "create-post-button-container" }, createButton, cancelButton);

  return fastn('templater', {
    data: fastn.binding('targetPost'),
    template: (model) => {
      var post = model.get('item');
      if(!post){
        return;
      }
      return fastn(
        "div",
        { class: "create-post-dialog" },
        fastn("div", { class: "create-post-dialog-content" }, titleInput, bodyInput, buttons)
      ).attach();
    }
  });
};
