const markdown = require("fastn-markdown-component");
const fastn = require("fastn")(require("fastn/domComponents")({ markdown }), true);
const crel = require("crel");
const spacetime = require("spacetime");
const api = require("./api");
const components = require("./components");

import "normalize.css";

window.addEventListener("load", function() {
  let defaultTheme = "light";
  let tokenKey = "token";
  let state = {
    login: {
      token: "",
      username: "",
      password: ""
    },
    isLoading: false,
    error: false,
    filter: "",
    type: "all",
    dialogOpen: false,
    action: "create"
  };
  function loading(fn) {
    app.setLoading(true);
    return function() {
      var args = Array.from(arguments);
      var callback = args.pop();
      fn.apply(
        null,
        args.concat(function() {
          app.setLoading(false);
          callback.apply(null, arguments);
        })
      );
    };
  }
  let app = {
    state,
    login: function() {
      loading(api.login)(fastn.Model.get(state, "login"), function(error, token) {
        if (error) {
          return app.setError(error);
        }
        app.clearCredentials();
        app.setToken(token);
        app.getAll();
      });
    },
    logout: function() {
      fastn.Model.remove(state, "items");
      app.clearCredentials();
      app.clearToken();
    },
    clearCredentials: function() {
      fastn.Model.set(state, "login.username", "");
      fastn.Model.set(state, "login.password", "");
    },
    clearToken: function() {
      fastn.Model.set(state, "login.token", "");
      sessionStorage.removeItem(tokenKey);
    },
    setToken: function(token) {
      fastn.Model.set(state, "login.token", token);
      if (token) {
        sessionStorage.setItem(tokenKey, token);
      }
    },
    setTheme: function(toggle) {
      if (!toggle) {
        fastn.Model.set(state, "theme", "light");
        localStorage.setItem("pocket-dimension:theme", "light");
      }
      if (toggle) {
        fastn.Model.set(state, "theme", "dark");
        localStorage.setItem("pocket-dimension:theme", "dark");
      }
    },
    getTheme: function() {
      var theme = localStorage.getItem("pocket-dimension:theme");
      if (theme) {
        fastn.Model.set(state, "theme", theme);
      } else {
        fastn.Model.set(state, "theme", defaultTheme);
      }
    },
    setError: function(error) {
      fastn.Model.set(state, "error", true);
      if (error.message) {
        fastn.Model.set(state, "errorMessage", JSON.parse(error.message).data);
      }
      app.toastError();
    },
    clearError: function() {
      fastn.Model.set(state, "error", false);
    },
    toastError: function() {
      var error = fastn.Model.get(state, "errorMessage");
      var toastTime = 4000;
      crel(
        document.querySelector(".container"),
        crel("div", { class: "toast slide-in" }, error || "Unspecified error.")
      );
      setTimeout(() => {
        document.querySelector(".toast").classList.remove("slide-in");
      }, toastTime * 0.5);
      setTimeout(() => {
        document.querySelector(".toast").classList.add("slide-out");
      }, toastTime);
      setTimeout(() => {
        document.querySelector(".toast").remove();
      }, toastTime * 1.3);
    },
    setLoading: function(isLoading) {
      fastn.Model.set(state, "isLoading", isLoading);
    },
    setType: function(value) {
      fastn.Model.set(state, "type", value);
    },
    setPostType: function(value) {
      fastn.Model.set(state, "post.type", value);
    },
    generatePostTitle: function() {
      if (fastn.Model.get(state, "post.type") === "diary") {
        var now = spacetime.now();
        var today = now.format("{date-ordinal} {month} {year}");
        var newTitle = `Work diary for ${today}`;
        app.setPostTitle(newTitle);
      }

      if (
        fastn.Model.get(state, "post.type") === "link" &&
        fastn.Model.get(state, "post.body") !== undefined
      ) {
        loading(api.pageInfo)(
          fastn.Model.get(state, "login.token"),
          fastn.Model.get(state, "post.body"),
          function(error, data) {
            if (error) {
              return app.setError(error);
            }
            app.setPostTitle(data.title);
          }
        );
      }
    },
    setPostTitle: function(title) {
      fastn.Model.set(state, "post.title", title);
    },
    clearPostTitle: function() {
      fastn.Model.remove(state, "post.title");
    },
    editPost: function(post) {
      fastn.Model.set(state, "post", post);
    },
    getAll: function() {
      loading(api.get.all)(fastn.Model.get(state, "login.token"), function(error, data) {
        if (error) {
          return app.setError(error);
        }
        fastn.Model.set(state, "items", data);
      });
    },
    showCreatePost: function() {
      if (fastn.Model.get(state, "login.token")) {
        fastn.Model.set(state, "post", {});
        app.setPostType("note");
      }
    },
    hideEditPost: function() {
      fastn.Model.remove(state, "post");
      document.querySelector(".search-box-input").focus();
    },
    deletePost: function(id, timestamp) {
      loading(api.delete.item)(fastn.Model.get(state, "login.token"), id, timestamp, function(
        error,
        res
      ) {
        if (error) {
          return app.setError(error);
        }
        app.getAll();
      });
    },
    savePost: function(post) {
      var action = post.id ? "update" : "create";

      loading(api[action])(fastn.Model.get(state, "login.token"), post, function(error) {
        if (error) {
          return app.setError(error);
        }

        app.hideEditPost();
        app.getAll();
      });
    },
    getTokenFromStorageAndSet: function() {
      var token = sessionStorage.getItem(tokenKey);
      app.setToken(token);
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

    if (isEscape && fastn.Model.get(state, "post")) {
      app.hideEditPost();
    }
  };

  app.getTokenFromStorageAndSet();
  if (fastn.Model.get(state, "login.token")) {
    app.getAll();
  }

  app.getTheme();

  const view = components(fastn, app);
  view.attach(state);
  view.render();

  const mount = document.getElementById("app");
  mount.appendChild(view.element);
});
