/**
 * When a user tries to login, we will first verifies the login credentials and creates session for user (by supabase)
 * After that we will check whether there is an entry with this users user id in the public.users table of supabase
 * If there is no entry, we will create an entry.
 * If there is an entry we do nothing.
 * If everything works well, the user is logged in to the system.
 * If there s an error, it is console, logged
 */

"use client";

import { User } from "@/frontend/modules/entities/User";
import { redirect } from "next/navigation";
import Link from "next/link";

function LoginToAccount() {
  async function loginHandler(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    console.log("Logging User In with email and password");

    if (!email || !password) {
      window.confirm("Email or password is missing");
      return;
    }
    const { data, error } = await User.login(email, password);
    console.log(data, error);

    if (error) {
      console.log("Error during login:", error.message);
      const errorMessage = error.message || "An error occurred during sign up";
      window.confirm(errorMessage);
    } else {
      console.log("User logged in successfully: ", data);
      const savedUserStats = await User.checkSavedUser(data.user.id);
      console.log(savedUserStats);
      if (savedUserStats.status == 1) {
        window.confirm("Logged in successfully. Saving userdata to session");
        const saveUserToSessionStatus = await User.saveUserToSession();
        if (saveUserToSessionStatus.status == 0) {
          console.log(
            "Error saving usedata to session: ",
            saveUserToSessionStatus.error
          );
          window.confirm(
            "Error saving usedata to session: ",
            saveUserToSessionStatus.error.message
          );
        } else {
          console.log(
            "Successfully saved userdata to session: ",
            saveUserToSessionStatus.data
          );
          window.confirm(
            "Successfully saved userdata to session. Redirecting to dashboard..."
          );
          redirect("/dashboard");
        }
      } else if (savedUserStats.status == 0) {
        window.confirm("Some error during login. Check console for details");
        console.log("Error during login:", savedUserStats.error);
      }
    }
  }

  return (
    <div>
      <form onSubmit={loginHandler} className="">
        <p className="">Welcome Back</p>
        <h1>Login</h1>
        <label className="">
          <input
            type="text"
            className=""
            name="email"
            placeholder="Enter Email"
          />
        </label>
        <label className="">
          <input
            type="text"
            className=""
            name="password"
            placeholder="Enter Password"
          />
        </label>
        <button className="" type="submit">
          Login
        </button>
        <p className="">
          Dont have an account?
          <Link href="/auth/sign-up">Create Account</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginToAccount;
