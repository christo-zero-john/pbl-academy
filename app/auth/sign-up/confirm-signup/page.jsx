"use client";

import { User } from "@/modules/entities/User";
import { redirect } from "next/navigation";
import { useEffect } from "react";

function ConfirmSignupPage() {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const email = decodeURIComponent(searchParams.get("email"));
    const password = decodeURIComponent(searchParams.get("password"));

    async function execPromise() {
      const { data, error } = await User.login(email, password);
      if (!error) {
        console.log("Logged in successfully...");
        const loginStatus = await User.checkLogin();
        console.log(loginStatus);

        // Remove the setTimeout and just save the user once
        const { data: userData, error: saveError } = await User.saveUser();
        if (saveError) {
          console.log("Error confirming sign up: ", saveError);
          const errorMessage =
            saveError.message || "An error occurred while confirming sign up";
          console.log(saveError.message);
          window.confirm(errorMessage);
        } else {
          console.log(
            "Account Created and confirmed Successfully. Redirecting to dashboard..."
          );
          redirect("/dashboard");
        }
      } else {
        console.log("Error logging in: ", error);
      }
    }

    execPromise();
    console.log("Checking and confirming create account");
  }, []);

  return <div>Checking and confirming create account</div>;
}

export default ConfirmSignupPage;
