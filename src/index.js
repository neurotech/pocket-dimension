const markdown = require("fastn-markdown-component");
const fastn = require("fastn")(require("fastn/domComponents")({ markdown }), true);
const crel = require("crel");
const { DateTime } = require("luxon");
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
    archiveMode: false,
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
        app.getAllItems();
      });
    },
    logout: function() {
      app.clearCredentials();
      app.clearToken();
      fastn.Model.remove(state, "items");
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
    setArchiveMode: function(toggle) {
      if (!toggle) {
        fastn.Model.set(state, "archiveMode", false);
        this.getAllItems();
      }
      if (toggle) {
        fastn.Model.set(state, "archiveMode", true);
        this.getAllItems(true);
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
        var now = DateTime.local();
        var today = now.toFormat("EEEE dd MMMM yyyy");
        var newTitle = `Work diary for ${today}`;
        var newBody = `**To Do:**\n\n - a\n\n---\n\n**Done:**\n\n - b`;
        app.setPostTitle(newTitle);
        app.setPostBody(newBody);
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
            app.setPostTitle(data);
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
    setPostBody: function(body) {
      fastn.Model.set(state, "post.body", body);
    },
    editPost: function(post) {
      fastn.Model.set(state, "post", post);
    },
    clearAllItems: function() {
      fastn.Model.set(state, "items", []);
    },
    getAllItems: function(archived) {
      if (typeof archived !== "boolean") {
        archived = fastn.Model.get(state, "archiveMode");
      }
      var endpoint = archived ? api.get.archived : api.get.all;
      loading(endpoint)(fastn.Model.get(state, "login.token"), function(error, data) {
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
    },
    deletePost: function(id, timestamp) {
      loading(api.delete.item)(fastn.Model.get(state, "login.token"), id, timestamp, function(
        error,
        res
      ) {
        if (error) {
          return app.setError(error);
        }
        app.getAllItems();
      });
    },
    focusPost: function(title) {
      fastn.Model.set(state, "filter", title);
    },
    clearFocusPost: function() {
      fastn.Model.set(state, "filter", null);
    },
    archivePost: function(post) {
      if (post.isArchived) {
        post.isArchived = false;
      } else {
        post.isArchived = true;
      }
      this.savePost(post);
    },
    savePost: function(post) {
      var action = post.id ? "update" : "create";

      loading(api[action])(fastn.Model.get(state, "login.token"), post, function(error) {
        if (error) {
          return app.setError(error);
        }

        app.hideEditPost();
        app.getAllItems(fastn.Model.get(state, "archiveMode"));
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
    app.getAllItems();
  }

  app.getTheme();

  const view = components(fastn, app);
  view.attach(state);
  view.render();

  const mount = document.getElementById("app");
  mount.appendChild(view.element);

  if (typeof history.pushState === "function") {
    history.pushState("!", null, null);
    window.onpopstate = function() {
      history.pushState("?", null, null);
      if (fastn.Model.get(state, "post")) {
        app.hideEditPost();
      }
    };
  }

  document.addEventListener("paste", event => {
    let clipboardContents = (event.clipboardData || window.clipboardData).getData("text");
    if (!state.post) {
      if (typeof clipboardContents === "string" && clipboardContents.length > 0) {
        try {
          var url = new URL(clipboardContents);
          var post = {
            type: "link",
            body: url.href,
            generateTitle: true
          };
          app.savePost(post);
        } catch (ex) {
          this.console.error(
            "Could not automatically create a link post. An invalid URL was pasted."
          );
        }
      }
    }
  });
});
