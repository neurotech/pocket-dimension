# pocket-dimension

A tiny place to store tiny things.

## TODO

### Get title of a webpage

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
