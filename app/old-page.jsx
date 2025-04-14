<>
  <h1 className="text-center text-primary fs-3">All Paths in the App</h1>
  <h2 className="text-center text-success fs-4">Authentication</h2>
  {User.user ? (
    <p
      className="d-block m-1 btn btn-primary w-fit"
      onClick={() => {
        User.logout();
        window.location.reload();
      }}
    >
      Logout
    </p>
  ) : (
    <Link href="/auth/login" className="d-block m-1 btn btn-primary w-fit">
      Login
    </Link>
  )}
  <br />
  <Link className="d-block m-1" href="/auth/signup">
    Signup
  </Link>{" "}
  <br />
  <Link className="d-block m-1 btn btn-primary w-fit" href="/dashboard">
    User Dashboard
  </Link>
  <br />
  <hr className="border border-3" />
  <h2 className="text-center text-success fs-4">Courses</h2>
  <Link className="d-block m-1 btn btn-primary w-fit" href="/courses">
    All Courses
  </Link>
  <br />
  <Link className="d-block m-1" href="/courses/course-id">
    Display Course By ID
  </Link>
  <br />
  <Link className="d-block m-1" href="/courses/404">
    Course Not Found
  </Link>
  <br />
  <Link className="d-block m-1" href="/courses/mentor/">
    Mentor Dashboard
  </Link>
  <br />
  <Link className="d-block m-1" href="/courses/mentor/all-courses">
    All Courses of a Mentor
  </Link>
  <br />
  <Link className="d-block m-1" href="/courses/mentor/create-course">
    Create New Course
  </Link>
  <br />
</>;
