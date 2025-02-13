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

        setTimeout(async () => {
          const { data, error } = await User.saveUser();
          if (error) {
            console.log("Error confirming sign up: ", error);

            const errorMessage =
              error.message || "An error occurred while confirming sign up";
            console.log(error.message);
            window.confirm(errorMessage);
          } else {
            console.log(
              "Account Created and confirmed Successfully. Redirecting to dashboard..."
            );
            redirect("/dashboard");
          }
        }, 5000);
      }
    }

    execPromise();
    console.log("Checking and confirming create account");
  }, []);

  return <div>Checking and confirming create account</div>;
}

export default ConfirmSignupPage;
