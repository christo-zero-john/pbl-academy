/**
 * A user can create account using mail id or password
 * When a user account is created, they should confirm their mail id to get access to their user account
 */

"use client";
import SubmitBtn from "@/frontend/components/common/submit-btn";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function SignUp() {
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });

  // async function signUphandler(event) {
  //   event.preventDefault();
  //   const formData = new FormData(event.target);
  //   const email = formData.get("email");
  //   const password = formData.get("password");

  //   if (!email || !password) {
  //     window.confirm("Email or password is missing");
  //     return;
  //   }

  //   const { data, error } = await User.signUp(email, password);

  //   if (error) {
  //     console.log("Error during sign up: ", error.message);

  //     const errorMessage = error.message || "An error occurred during sign up";
  //     console.log(error.message);
  //     window.confirm(errorMessage);
  //   } else {
  //     window.confirm("Account Created Successfully. Login to continue");
  //     const params = new URLSearchParams({
  //       email: encodeURIComponent(email),
  //       password: encodeURIComponent(password),
  //     });
  //     router.push(`/auth/login?${params}`);
  //   }
  // }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };

      fetch("/api/user/signup", request)
        .then(async (response) => {
          if (!response.ok) {
            const errorText = await response.text();
            console.error("Error response:", errorText);
            throw new Error("Failed to create account");
          }
          return response.json();
        })
        .then((result) => {
          console.log(result);
          // Handle successful signup (e.g., redirect or show a success message)
        })
        .catch((error) => {
          console.error("Error during signup:", error);
          // Handle error (e.g., show an error message to the user)
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="">
        <h1 className="">Create Account</h1>
        <label className="">
          <input
            type="email"
            required
            className=""
            name="email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Enter Email"
          />
        </label>
        <label className="">
          <input
            type="text"
            required
            className=""
            name="password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            placeholder="Enter Password"
          />
        </label>
        <SubmitBtn
          btnText="Create Account"
          submitingText="Creating Account..."
        />
        <p className="">
          Already have an account?
          <Link href="/auth/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
