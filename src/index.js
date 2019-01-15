const markdown = require("fastn-markdown-component");
const svg = require("fastn-svg-component");
const fastn = require("fastn")(require("fastn/domComponents")({ svg, markdown }));
const api = require("./api");
const components = require("./components");

import "normalize.css";

window.addEventListener("load", function() {
  let state = {
    isLoading: false,
    filter: "",
    type: "all",
    dialogOpen: false,
    action: "create",
    post: {
      title: "",
      body: "",
      type: ""
    }
  };
  let app = {
    setType: function(value) {
      fastn.Model.set(state, "type", value);
    },
    setAction: function(value) {
      fastn.Model.set(state, "action", value);
    },
    setPost: function(value) {
      app.setAction("update");
      fastn.Model.set(state, "post", value);
      app.showCreatePost();
    },
    getAll: function() {
      fastn.Model.set(state, "isLoading", true);
      api.get.all(function(err, data) {
        fastn.Model.set(state, "isLoading", false);
        if (err) console.error(err);
        fastn.Model.set(state, "items", data);
      });
    },
    showCreatePost: function() {
      fastn.Model.set(state, "dialogOpen", true);
      document.querySelector(".create-post-title").focus();
    },
    hideCreatePost: function() {
      fastn.Model.set(state, "dialogOpen", false);
      document.querySelector(".search-box-input").focus();
    },
    createPost: function(event, scope) {
      fastn.Model.set(state, "isLoading", true);
      app.hideCreatePost();
      event.preventDefault();
      api.post(scope.get("post"), function(err) {
        fastn.Model.set(state, "isLoading", false);
        if (err) return console.error(err);
        fastn.Model.set(state, "dialogOpen", false);
        fastn.Model.set(state, "post", {});
        app.getAll();
      });
    },
    updatePost: function(event, scope) {
      fastn.Model.set(state, "isLoading", true);
      app.hideCreatePost();
      event.preventDefault();
      api.update(scope.get("post"), function(err) {
        fastn.Model.set(state, "isLoading", false);
        if (err) return console.error(err);
        fastn.Model.set(state, "dialogOpen", false);
        fastn.Model.set(state, "post", {});
        app.getAll();
      });
    },
    deletePost: function(id, timestamp) {
      fastn.Model.set(state, "isLoading", true);
      api.delete.item(id, timestamp, function(err, res) {
        fastn.Model.set(state, "isLoading", false);
        if (err) return console.error(err);
        app.getAll();
      });
    }
  };

  document.onkeydown = function(event) {
    event = event || window.event;
    var isEscape = false;

    if ("key" in event) {
      isEscape = event.key == "Escape" || event.key == "Esc";
    } else {
      isEscape = event.keyCode == 27;
    }

    if (isEscape && fastn.Model.get(state, "dialogOpen")) {
      app.hideCreatePost();
    }
  };

  app.getAll();

  const view = components(fastn, app);
  view.attach(state);
  view.render();

  const mount = document.getElementById("app");
  mount.appendChild(view.element);
});
