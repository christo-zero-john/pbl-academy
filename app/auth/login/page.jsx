"use client";

import { User } from "@/modules/entities/User";
import { redirect } from "next/navigation";
import Link from "next/link";

function LoginToAccount() {
  async function loginHandler(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    console.log("Logging User In with:", email, password);

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
      await User.checkSavedUser(data.user.id);
      // redirect("/dashboard");
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
