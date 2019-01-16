# pocket-dimension

A tiny place to store tiny things.

## TODO

### Auth

 - User navigates to / - serve app
 - Login form visibility is bound to token presence
 - On boot, / checks for sessionStorage token
 - If token, POST token to /auth endpoint
   - If valid, set model.token to token
   - if invalid, remove model.token
 - User enters password into form and POSTs password to /auth endpoint
 - /auth endpoint hashes password into token, validate token
   - If valid, respond with 200 and token, set model.token to token and store token in sessionStorage
   - If invalid, respond with 401

```
# CLIENT
login(user, pass) -> POST /login -> OK ? store session token : show login error
logout() -> clear session token
getUser() -> GET /user -> OK ? store : logout()
loginForm:Bound to session token

# SERVER
/login(user, pass) -> hash password, compare -> OK ? token : 400
/user(token) -> check token exists against user -> OK ? user : 401
```

### Create a separate space for "temp" actions like editing a post, creating a post to avoid data binding leading to the itemlist being updated

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
