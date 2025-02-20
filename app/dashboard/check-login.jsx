"use client";

import { useEffect, useState } from "react";
import Supabase from "../api/modules/entities/Supabase";
import { redirect } from "next/navigation";
import Link from "next/link";

function CheckLogin({ children }) {
  const [isLoggedIn, setIsloggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const { data, error } = await Supabase.auth.getSession();
      consoel.log("Checking session: ", data, error);
      if (data?.session?.user) {
        setIsloggedIn(true);
      }
    })();
  }, []);

  if (!isLoggedIn) {
    return (
      <>
        <p className="">
          You are not logged in.{" "}
          <Link href="/auth/login">Login to continue</Link>
        </p>
      </>
    );
  }

  return <>{children}</>;
}

export default CheckLogin;
