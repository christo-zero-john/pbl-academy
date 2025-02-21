# ToDo's

# To Fix

- [ ] When the user logs in first time after registering, user metadata does not have the data from users table, but later on it does have that data.
  - [ ] Fix the current method so that userdata is fetched from DB and returned to client(as userData object) only for first login.
  - [ ] And in the client side, user session is refreshed only when user_metadata does not have those data that is the response has a userData object.
  - [ ] Maybe we should also fetch and refresh userData after the user updates their details too.
