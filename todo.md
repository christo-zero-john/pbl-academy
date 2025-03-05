# ToDo's

# To Fix

- [ ] When the user logs in first time after registering, user metadata does not have the data from users table, but later on it does have that data.

  - [ ] Fix the current method so that userdata is fetched from DB and returned to client(as userData object) only for first login.
  - [ ] And in the client side, user session is refreshed only when user_metadata does not have those data that is the response has a userData object.
  - [ ] Maybe we should also fetch and refresh userData after the user updates their details too.

- [ ] When the user loggs in for the first time after creating an account, there is no user session, as a result, no userData is retrieved from the database. When the user signout and loggs in again, it gets fixed and userData is returned. Fix this error for the first login time.

- [x] In the check login, when it is checking login display a message "Checking user info", and display not logged in only if the user is not logged in. It requires connection to the internet to check for session. So getSession may return null if there is no network connection.
      -- Fixed it by displaying user not logged in or no internet conection in checkLogin page, then when getSession is true, set User.user as the returned user, so that the user is available for further operations

-[ ] In the create course backend route, change the insert to be only allowed to authenticated users. Currently anyone could insert into public.courses

- [ ] In the `/app/courses/mentor/edit-course/[id]/tasks/page.jsx`, the addTaskForm component is rendered for each day in the page. Fix it in such a way that
  - [ ] only 1 add task form component is present in the entire page.
  - [ ] And the day index should be passed
