module.exports = function createPostDialog(fastn, app) {
  return fastn("div", { display: fastn.binding("dialogOpen"), class: "post-dialog" },
    fastn("div", { class: "dialog-content" },
      "Post Dialog"
    )
  );
};
