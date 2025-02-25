"use client";

import User from "@/frontend/modules/entities/User";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginToAccount() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  // useEffect(() => {
  //   console.log(User.user);
  // }, []);

  async function loginHandler(event) {
    event.preventDefault();
    console.log(formData);

    const loginStatus = await User.login(formData);

    console.log(loginStatus);

    if (loginStatus.success) {
      redirect("/dashboard");
    } else {
      console.log("Error while loggin in: ", loginStatus.error);
      window.confirm(loginStatus.error.message);
    }
  }

  return (
    <div>
      <form onSubmit={loginHandler} className="">
        <p className="">Welcome Back</p>
        <h1>Login</h1>
        <label className="">
          <input
            autocomplete="on"
            type="email"
            className=""
            name="email"
            onChange={(event) =>
              setFormData({
                ...formData,
                email: event.target.value,
              })
            }
            required
            placeholder="Enter Email"
          />
        </label>
        <label className="">
          <input
            autocomplete="on"
            type="text"
            className=""
            name="password"
            onChange={(event) =>
              setFormData({
                ...formData,
                password: event.target.value,
              })
            }
            required
            minLength={8}
            placeholder="Enter Password"
          />
        </label>
        <button className="" type="submit">
          Login
        </button>
        <p className="">
          Dont have an account?
          <Link href="/auth/signup">Create Account</Link>
        </p>
      </form>
    </div>
  );
}
