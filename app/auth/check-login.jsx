"use client";

import { User } from "@/modules/entities/User";
import { redirect } from "next/navigation";
import { useEffect } from "react";

function CheckLogin({ children }) {
  useEffect(() => {
    async function execPromise() {
      let loginStatus = await User.checkLogin();
      console.log("login status", loginStatus);
      if (loginStatus.status == 1) {
        redirect("/dashboard");
      }
    }
    execPromise();
  }, []);
  return <div>{children}</div>;
}

export default CheckLogin;
