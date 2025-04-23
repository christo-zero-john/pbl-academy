"use client";

import User from "@/frontend/modules/entities/User";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "../../frontend/styles/auth.css";
import FormContainer from "@/frontend/components/routes/auth/form-container";
import NavBar from "@/frontend/components/common/nav-bar";

export default function AuthenticationPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [rightPanelActive, setRightPanelActive] = useState(false);

  const router = useRouter();

  async function loginHandler(event) {
    event.preventDefault();
    console.log(formData);

    const loginStatus = await User.login(formData);

    // console.log(loginStatus);

    if (loginStatus.success) {
      window.location.href = "/courses";
    } else {
      console.log("Error while logging in: ", loginStatus.error);
      window.confirm(loginStatus.error);
    }
  }

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
        // console.log(data);
        if (!data.success) {
          console.log(data.error);
          window.confirm(data.error);
        } else {
          window.confirm("Successfully created account. Login to continue");
        }
      });
  }

  return (
    <>
      <div
        className={`container ${rightPanelActive && "right-panel-active"}`}
        id="container"
      >
        <FormContainer
          varient="create_account"
          formData={formData}
          setFormData={setFormData}
          handler={signuphandler}
        />
        <FormContainer
          varient="login"
          formData={formData}
          setFormData={setFormData}
          handler={loginHandler}
        />

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                onClick={() => setRightPanelActive(false)}
              >
                Log In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="ghost"
                onClick={() => setRightPanelActive(true)}
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
