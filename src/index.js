const svg = require("fastn-svg-component");
const fastn = require("fastn")(require("fastn/domComponents")({ svg }));
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
    getAll: function() {
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
    components.List(fastn, app)
  );
  view.attach(state);
  view.render();

  const mount = document.getElementById("app");
  mount.appendChild(view.element);
});
