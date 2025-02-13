"use client";
import { User } from "@/modules/entities/User";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

function LoginToAccount() {
  // This useEffect is given seperately for login and signup because if given as a layout file, it will cause infinite reload in login page

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    let loginStatus = await User.checkLogin(0, "");
    console.log(loginStatus);
    if (loginStatus.status == 1) {
      window.location.href = "/dashboard";
    }
  }
  
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
      window.confirm("Error during login: " + error.message);
      console.log("Error during login:", error.message);
    } else {
      console.log("User logged in successfully");
      window.location.href = "/dashboard";
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
