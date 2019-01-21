# pocket-dimension

A tiny place to store tiny things.

## TODO

### Favicon

### Mobile

### DRY up getting token, auth etc in `get-page-info\index.js` and `items\index.js`

### Create a separate space for "temp" actions like editing a post, creating a post to avoid data binding leading to the itemlist being updated

---

### Auth

#### Table Structure

| *id | password | token       |
| --- | -------- | ----------- |
| `1` | `secret` | `aabbbc123` |

#### Creating a Hashed Password

1. Use `bcrypt` to hash the password
2. Store hashed password in users table

#### Checking a Password

1. Use `bcrypt` to compare the supplied plaintext password with hashed password that has been retrieved from a users table
2. If valid password, create the session token:

#### Creating Session Token

1. Create new TOKEN as UUID
2. UPSERT record into AUTH-DB made up of supplied USERNAME and new "DECRYPTED"-TOKEN
3. Use `cryptr.encrypt` to encrypt the TOKEN
4. Return encrypted TOKEN as SESSION-TOKEN

#### Checking Session Token

1. Check that a SESSION-TOKEN is supplied by user, error if not
2. Attempt to `cryptr.decrypt` SESSION-TOKEN, return error
3. Lookup AUTH table for any records matching DECRYPTED-TOKEN
4. If record, return record/"IS VALID"
5. If !record, return error

#### Abstract

- User navigates to / - serve app
- Login form visibility is bound to token presence
- On boot, / checks for sessionStorage token
- If token, POST token to /auth endpoint
  - If valid, set model.token to token
  - If invalid, remove model.token
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