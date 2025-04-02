import User from "@/frontend/modules/entities/User";
import Link from "next/link";

export default function NavBar({ active }) {
  async function logoutHandler() {
    const response = await User.logout();
    if (response.success) {
      window.confirm("Logged Out successfully");
      window.location.href = "/auth#login";
    } else {
      window.confirm(response.error);
    }
  }

  return (
    <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top">
      <Link
        href="/"
        className="navbar-brand d-flex align-items-center px-4 px-lg-5"
      >
        <h2 className="m-0 text-primary">Mentorcademy</h2>
      </Link>
      <button
        type="button"
        className="navbar-toggler me-4"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto p-4 p-lg-0">
          <Link
            href="/"
            className={`nav-item nav-link ${active == "home" && "active"}`}
          >
            Home
          </Link>
          {/* <Link
            href="/about"
            className={`nav-item nav-link ${active == "about" && "active"}`}
          >
            About
          </Link> */}
          <Link
            href="/courses"
            className={`nav-item nav-link ${active == "courses" && "active"}`}
          >
            Courses
          </Link>
          {/* <Link
            href="/support"
            className={`nav-item nav-link ${active == "support" && "active"}`}
          >
            Support
          </Link> */}
          {User.user ? (
            <>
              <Link
                href="/dashboard"
                className={`nav-item nav-link ${active == "auth" && "active"}`}
              >
                Goto Dashboard
              </Link>
              <p
                onClick={logoutHandler}
                className={`nav-item nav-link ${active == "auth" && "active"}`}
              >
                Logout
              </p>
            </>
          ) : (
            <Link
              href="/auth"
              className={`nav-item nav-link ${active == "auth" && "active"}`}
            >
              Join Now
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
