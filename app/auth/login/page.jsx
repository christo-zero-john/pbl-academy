"use client";

import User from "@/frontend/modules/entities/User";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "../../../frontend/styles/auth.css";

export default function LoginToAccount() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [rightPanelActive, setRightPanelActive] = useState(false);

  const router = useRouter();

  async function loginHandler(event) {
    event.preventDefault();
    console.log(formData);

    const loginStatus = await User.login(formData);

    console.log(loginStatus);

    if (loginStatus.success) {
      router.push("/dashboard");
    } else {
      console.log("Error while logging in: ", loginStatus.error);
      window.confirm(loginStatus.error);
    }
  }

  return (
    <>
      <div
        class={`container  ${rightPanelActive && "right-panel-active"}`}
        id="container"
      >
        <div class="form-container sign-up-container ">
          <form action="#">
            <h1>Create Account</h1>
            <span>Using your email ID</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Sign Up</button>
          </form>
        </div>
        <div class="form-container sign-in-container">
          <form action="#">
            <h1>Sign in</h1>
            <span>to your account</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="#">Forgot your password?</a>
            <button>Sign In</button>
          </form>
        </div>
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button class="ghost" onClick={() => setRightPanelActive(false)}>
                Sign In
              </button>
            </div>
            <div class="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button class="ghost" onClick={() => setRightPanelActive(true)}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * <div>
      <form onSubmit={loginHandler} className="">
        <p className="">Welcome Back</p>
        <h1>Login</h1>
        <label className="">
          <input
            autoComplete="on"
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
            autoComplete="on"
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
 */
