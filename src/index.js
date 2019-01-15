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
  function loading(fn){
    app.setLoading(true);
    return function(){
      app.setLoading(false);
      fn.apply(null, arguments);
    }
  }
  let app = {
    state,
    setLoading: function(isLoading){
      fastn.Model.set(state, "isLoading", isLoading);
    },
    setType: function(value) {
      fastn.Model.set(state, "type", value);
    },
    editPost: function(post) {
      fastn.Model.set(state, "post", post);
      app.showCreatePost("update");
    },
    getAll: function() {
      loading(api.get.all)(function(error, data) {
        if (error) return console.error(error);
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
    deletePost: function(id, timestamp) {
      loading(api.delete.item)(id, timestamp, function(error, res) {
        if (error) return console.error(error);
        app.getAll();
      });
    },
    savePost: function(scope){
      var post = scope.get("post");
      var action = post.id ? "update" : "create";

      app.hideCreatePost();

      loading(api[action])(scope.get("post"), function(error) {

        if (error) {
          return console.error(error);
        }

        fastn.Model.set(state, "dialogOpen", false);

        fastn.Model.set(state, "post", {});

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
