"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import User from "@/frontend/modules/entities/User";
import Link from "next/link";

function CheckLogin({ children }) {
  const [isLoggedIn, setIsloggedIn] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // console.log(User.user);
    if (User.user) {
      setIsloggedIn(true);
    }
  }, []);

  if (isLoggedIn) {
    router.push("/dashboard");
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
