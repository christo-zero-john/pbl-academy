"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import User from "@/frontend/modules/entities/User";

function CheckLogin({ children }) {
  const [isLoggedIn, setIsloggedIn] = useState(false);

  useEffect(() => {
    // console.log(User.user);
    if (User.user) {
      setIsloggedIn(true);
    }
  }, []);

  if (isLoggedIn) {
    redirect("/dashboard");
    return (
      <>
        <p className="">
          You are already logged in.{" "}
          <Link href="/dashboard">Go to Dashboard</Link>
        </p>
      </>
    );
  }

  return <>{children}</>;
}

export default CheckLogin;
