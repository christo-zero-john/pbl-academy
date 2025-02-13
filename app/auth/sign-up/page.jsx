"use client";
import { User } from "@/modules/entities/User";
import Link from "next/link";
import { useEffect } from "react";

function SignUp() {
  // This useEffect is given seperately for login and signup because if given as a layout file, it will cause infinite reload in login page
  useEffect(() => {
    async function exec() {
      await User.checkLogin(1, "/dashboard");
    }

    exec();
  }, []);

  async function signUphandler(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      window.confirm("Email or password is missing");
      return;
    }
    const { data, error } = await User.signUp(email, password);

    if (error) {
      window.confirm("Error during sign up:", error.message);
    } else {
      window.confirm(
        "Confirm your email address to complete the sign-up process"
      );
    }
  }

  return (
    <div>
      <form onSubmit={signUphandler} className="">
        <h1 className="">Create Account</h1>
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
          Create Account
        </button>
        <p className="">
          Already have an account?
          <Link href="/auth/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
