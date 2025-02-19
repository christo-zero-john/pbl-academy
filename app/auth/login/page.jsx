"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginToAccount() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  function loginHandler(event) {
    event.preventDefault();
    const email = formData.email;
    const password = formData.password;
    console.log(formData);

    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    fetch("/api/auth/login", request)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }
  return (
    <div>
      <form onSubmit={loginHandler} className="">
        <p className="">Welcome Back</p>
        <h1>Login</h1>
        <label className="">
          <input
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
