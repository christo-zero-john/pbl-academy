"use client";

import { User } from "@/modules/entities/User";
import { useEffect } from "react";

function CheckLogin({ children }) {
  useEffect(() => {
    async function execPromise() {
      let loginStatus = await User.checkLogin();
      console.log("login status", loginStatus);
    }
    execPromise();
  }, []);
  return <div>{children}</div>;
}

export default CheckLogin;
