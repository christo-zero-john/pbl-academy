/**
 * We must check whether a user is logged in or not to avoid logging in of multiple times.
 * If a user is logged in, then there is no need for them to login again.
 * The system should redirect them to their dashboard.
 * This is a component only local for authentication check login
 */

"use client";

import { User } from "@/frontend/modules/entities/User";
import { redirect } from "next/navigation";
import { useEffect } from "react";

function CheckLogin({ children }) {
  useEffect(() => {
    async function execPromise() {
      let loginStatus = await User.checkLogin();
      if (loginStatus.status == 1) {
        redirect("/dashboard");
      }
    }
    execPromise();
  }, []);
  return <div>{children}</div>;
}

export default CheckLogin;
