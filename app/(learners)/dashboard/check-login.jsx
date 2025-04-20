"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import User from "@/frontend/modules/entities/User";

function CheckLogin({ children }) {
  const [isLoggedIn, setIsloggedIn] = useState(false);

  useEffect(() => {
    // console.log(User.user);
    (async () => {
      const user = await User.getUser();
      if (user) {
        setIsloggedIn(true);
      }
    })();
  }, []);

  if (!isLoggedIn) {
    return (
      <>
        <p className="">
          You are not logged in.{" "}
          <Link href="/auth">Login to continue</Link>. If you already
          logged in, wait for a few seconds and check your network connection
          speed...
        </p>
      </>
    );
  }

  return <>{children}</>;
}

export default CheckLogin;
