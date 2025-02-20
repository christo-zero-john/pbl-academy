"use client";
import SubmitBtn from "@/frontend/components/common/submit-btn";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const [signupSuccess, setSignupSuccess] = useState(false);

  async function signuphandler(event) {
    event.preventDefault();
    console.log("Sending request to Create Account");

    let request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    fetch("/api/auth/signup", request)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!data.success) {
          console.log(data.error);
          window.confirm(data.error);
        } else {
          setSignupSuccess(true);
        }
      });
  }

  if (signupSuccess) {
    redirect("/auth/login");
  }

  return (
    <div>
      <form onSubmit={signuphandler} className="">
        <h1 className="">Create Account</h1>
        <label className="">
          <input
            type="email"
            className=""
            name="email"
            onChange={(event) =>
              setFormData({ ...formData, email: event.target.value })
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
            required
            minLength={8}
            onChange={(event) =>
              setFormData({ ...formData, password: event.target.value })
            }
            placeholder="Enter Password"
          />
        </label>
        <SubmitBtn
          btnText="Create Account"
          loadingText="Creating Account"
        ></SubmitBtn>
        <p className="">
          Already have an account?
          <Link href="/auth/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
