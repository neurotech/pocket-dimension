const fastn = require("fastn")(require("fastn/domComponents")());
const api = require("./api");
const components = require("./components");

import "normalize.css";

window.addEventListener("load", function() {
  let state = {
    isLoading: false,
    filter: "",
    type: "all",
    dialogOpen: false,
    itemTitle: "",
    itemBody: ""
  };
  let app = {
    setType: function(value) {
      fastn.Model.set(state, "type", value);
    },
    getAll: function(clear) {
      if (clear) fastn.Model.set(state, "items", []);
      fastn.Model.set(state, "isLoading", true);
      api.get.all(function(err, data) {
        fastn.Model.set(state, "isLoading", false);
        if (err) console.error(err);
        fastn.Model.set(state, "items", data);
      });
    }
  };

  app.getAll();

  const view = fastn(
    "div",
    {
      class: fastn.binding("isLoading", isLoading => {
        return `container ${isLoading ? "loading" : ""}`;
      })
    },
    components.Toolbar(fastn),
    components.CreateItemDialog(fastn, app),
    components.Types(fastn, app),
    components.List(fastn)
  );
  view.attach(state);
  view.render();

  const mount = document.getElementById("app");
  mount.appendChild(view.element);
});
