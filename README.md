# pocket-dimension

A tiny place to store tiny things.

## TODO

### Create Post Dialog

### Get title of a webpage (when creating/updating a link-type post)

```js
const url = "https://httpbin.org/";

cpjax(url, function(error, data) {
  if (error) console.error(error);
  let title = "";
  let doc = document.implementation.createHTMLDocument("titleContainer");
  doc.documentElement.innerHTML = data;

  if (doc.title !== "") {
    title = doc.title;
  } else {
    title = url;
  }
  console.log(title);
});
```
