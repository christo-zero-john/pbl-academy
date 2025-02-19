"use client";

import { useEffect, useState } from "react";
import Supabase from "../api/modules/entities/Supabase";
import { redirect } from "next/navigation";

function CheckLogin({ children }) {
  const [isLoggedIn, setIsloggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const { data, error } = await Supabase.auth.getSession();
      if (data?.session?.user) {
        setIsloggedIn(true);
      }
    })();
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
