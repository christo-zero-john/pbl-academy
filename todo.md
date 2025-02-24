# ToDo's

# To Fix

- [ ] When the user logs in first time after registering, user metadata does not have the data from users table, but later on it does have that data.

  - [ ] Fix the current method so that userdata is fetched from DB and returned to client(as userData object) only for first login.
  - [ ] And in the client side, user session is refreshed only when user_metadata does not have those data that is the response has a userData object.
  - [ ] Maybe we should also fetch and refresh userData after the user updates their details too.

- [ ] In the check login, when it is checking login display a message "Checking user info", and display not logged in only if the user is not logges in. It requires connection to the internet to check for session. So getSession may return null if there is no network connection.

-[ ] In the create course backend route, change the insert to be only allowed to authenticated users. Currently anyone could insert into public.courses
